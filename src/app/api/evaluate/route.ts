import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.fixedWindow(2, "1 m"),
});

const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
});

const SYSTEM_PROMPT = `You are a warm, encouraging tutor reviewing a student's answers about how computers work.
Address each of their three answers in order. Write exactly three plain paragraphs, one paragraph per question.
Separate the paragraphs with one blank line. Do not use bullet points, headings, numbering, bold text, or Markdown.
If the student has skipped questions, just acknowledge that they didn't answer it and provide a short explanation of the concept as if teaching it for the first time.
Use the expected idea as a guide, not as wording the student must repeat. Reward answers that show the same mental model in the student's own words.
For each answer: if they got it right, affirm it briefly. If they got it wrong or missed something important, explain the concept clearly in plain language — don't just nudge, actually teach it.
Calibrate your length to how much correction is needed. Three perfect answers might get three short sentences. Three wrong answers might need a short paragraph each.
Never say "incorrect" or "wrong". Write like a thoughtful person talking to a curious non-technical friend.`;

const QUESTION_RUBRIC = [
  {
    id: "transistor",
    question:
      "Explain what a transistor does. Pretend you're telling a friend who's never heard the word.",
    expected:
      "A transistor is a tiny electronic switch. It can let electricity through or block it, giving computers a physical way to make yes/no, on/off, 1/0 choices. Huge numbers of these switches can be arranged to store information and follow instructions.",
  },
  {
    id: "abstraction",
    question:
      "What does abstraction mean? Give me an example from your own life. Not the light switch.",
    expected:
      "Abstraction means hiding messy lower-level details behind a simpler idea, label, or interface, so you can use something without thinking about every part underneath. A good answer should include a real-life example and explain what details are being hidden.",
  },
  {
    id: "binary",
    question: "You've got one bit. You add a second. What changes, and why?",
    expected:
      "One bit can represent two states. Two bits can represent four combinations: 00, 01, 10, and 11. The key idea is that each added bit doubles the number of possible combinations because every old possibility can now happen with the new bit off or on.",
  },
] as const;

const MAX_ANSWER_CHARS = 500;
const RATE_LIMIT_MESSAGE =
  "You're sending answers a little too quickly. Please wait a minute and try again.";
const FEEDBACK_ERROR_MESSAGE =
  "I couldn't get your response just now. Please try again.";

export async function POST(req: Request) {
  try {
    const ip = req.headers.get("x-forwarded-for") ?? "anonymous";
    const { success } = await ratelimit.limit(ip);
    if (!success) {
      return new Response(RATE_LIMIT_MESSAGE, { status: 429 });
    }

    const { answers } = await req.json();

    const sanitized: Record<string, string> = {};
    for (const [k, v] of Object.entries(answers as Record<string, string>)) {
      sanitized[k] = String(v).slice(0, MAX_ANSWER_CHARS);
    }

    const userMessage = QUESTION_RUBRIC.map(({ id, question, expected }) => {
      const answer = sanitized[id]?.trim() || "[skipped]";
      return `Question: ${question}\nExpected idea: ${expected}\nStudent answer: ${answer}`;
    }).join("\n\n");

    const { text } = await generateText({
      model: openrouter("google/gemini-2.0-flash-001"),
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: userMessage }],
      maxOutputTokens: 600,
    });

    return new Response(text, { headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Failed to evaluate quiz answers", error);
    return new Response(FEEDBACK_ERROR_MESSAGE, { status: 500 });
  }
}
