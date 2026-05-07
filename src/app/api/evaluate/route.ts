import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { QUIZ_RUBRICS } from "@/lib/quiz-rubrics";

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
Calibrate your length to how much correction is needed. Three perfect answers might get three short sentences. Three wrong answers might need a short paragraph each. If the answer for a question is clearly gibberish, make a jokeful comment about it and then explain the concept.
Never say "incorrect" or "wrong". Write like a thoughtful person talking to a curious non-technical friend.`;

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

    const { answers, conceptSlug } = await req.json();

    const rubric = QUIZ_RUBRICS[conceptSlug as string];
    if (!rubric) {
      return new Response("No rubric found for this chapter.", { status: 400 });
    }

    const sanitized: Record<string, string> = {};
    for (const [k, v] of Object.entries(answers as Record<string, string>)) {
      sanitized[k] = String(v).slice(0, MAX_ANSWER_CHARS);
    }

    const userMessage = rubric
      .map(({ id, question, expected }) => {
        const answer = sanitized[id]?.trim() || "[skipped]";
        return `Question: ${question}\nExpected idea: ${expected}\nStudent answer: ${answer}`;
      })
      .join("\n\n");

    const models = [
      "google/gemini-2.0-flash-001",
      "meta-llama/llama-3.3-70b-instruct",
      "mistralai/mistral-small-3.1-24b-instruct",
    ];

    let text: string | undefined;
    let lastError: unknown;
    for (const modelId of models) {
      try {
        ({ text } = await generateText({
          model: openrouter(modelId),
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
          maxOutputTokens: 600,
        }));
        break;
      } catch (err) {
        console.warn(`Model ${modelId} failed, trying next`, err);
        lastError = err;
      }
    }

    if (!text) {
      console.error("All models failed", lastError);
      return new Response(FEEDBACK_ERROR_MESSAGE, { status: 500 });
    }

    return new Response(text, { headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Failed to evaluate quiz answers", error);
    return new Response(FEEDBACK_ERROR_MESSAGE, { status: 500 });
  }
}
