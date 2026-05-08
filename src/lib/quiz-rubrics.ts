export type QuizQuestion = {
  id: string;
  question: string;
  expected: string;
};

export const QUIZ_RUBRICS: Record<string, QuizQuestion[]> = {
  "01-the-foundation": [
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
  ],
  "01-the-question": [
    {
      id: "turing-move",
      question: "Turing didn't try to define \"thinking.\" Instead, he reframed the question. What did he propose instead, and why was that a clever move?",
      expected:
        "Rather than defining thinking, Turing proposed a practical test: if a machine can hold a conversation indistinguishable from a human's, we should treat it as thinking. This was clever because it sidestepped the impossibility of defining thinking precisely — a definition that everyone kept disagreeing about — and replaced it with something observable and testable.",
    },
    {
      id: "imitation-game-setup",
      question: "Describe how the Imitation Game works. Who's involved, and what does the judge have to figure out?",
      expected:
        "A judge communicates by text with two hidden respondents — one a human, one a machine. The judge's task is to figure out which is which. The key features are: text-only communication (no voice or appearance), and the judge doesn't know in advance which is human. If the machine fools the judge reliably, Turing argued it should be considered to think.",
    },
    {
      id: "test-limits",
      question: "If a machine passes the Imitation Game, does that prove it thinks? Why or why not?",
      expected:
        "No, it doesn't prove thinking — it proves the machine can fool someone. Fooling and thinking are different things. A good actor can convincingly portray grief without feeling it. A machine could generate plausible-sounding responses without any understanding behind them. Turing's test is a practical stand-in, not a proof of inner mental life.",
    },
  ],
  "02-the-summer-everything-seemed-possible": [
    {
      id: "logic-theorist",
      question: "The Logic Theorist proved 38 out of 52 mathematical theorems — and found a shorter proof than Bertrand Russell for one of them. Does that mean it understood mathematics? Explain your thinking.",
      expected:
        "No. The Logic Theorist manipulated symbols according to rules, searching through combinations until one matched the target theorem. It had no idea what the symbols meant — it was doing pattern matching and search. Proving a theorem is impressive; it means the program got the right answer. But understanding mathematics means knowing why it's true, what it connects to, and how it matters. The Logic Theorist didn't have any of that.",
    },
    {
      id: "intelligence-as-search",
      question: "What does it mean to say intelligence is a form of \"search\"? And where does that idea break down?",
      expected:
        "Search means systematically exploring a space of possibilities — trying moves, checking results, picking the option that gets closest to the goal. The early AI researchers thought all problems could be framed this way. It breaks down when the space of possibilities becomes too large to search — chess has more possible games than atoms in the universe, and language has effectively infinite continuations. Search works for small, well-defined problems. It doesn't scale to open-ended ones.",
    },
    {
      id: "dartmouth-optimism",
      question: "The Dartmouth researchers were brilliant, and they were wildly wrong about the timeline. Why do you think smart, careful people made such optimistic predictions — and got them so wrong?",
      expected:
        "They extrapolated from early successes. Their programs had solved problems that seemed hard — proving theorems, solving puzzles — and assumed the hard problems were just more of the same. They didn't know which problems were actually hard. In hindsight, the things they solved were the easy version; the hard version (understanding language, reasoning about the everyday world) was far more difficult than it appeared. Underestimating the depth of the unsolved problem is a common pattern in fields where early progress is deceptively fast.",
    },
  ],
  "03-what-understanding-actually-is": [
    {
      id: "chinese-room",
      question: "Describe the Chinese Room in your own words. What point was Searle trying to make with it?",
      expected:
        "Someone is locked in a room. They receive slips of paper with Chinese characters and, using a rulebook, produce correct Chinese responses — despite not understanding Chinese at all. Searle's point: this is what computers do. They manipulate symbols according to rules without any understanding of what those symbols mean. Passing the Turing Test (producing correct outputs) doesn't prove understanding, because the person in the room produces correct outputs without understanding anything.",
    },
    {
      id: "systems-reply",
      question: "What is the \"systems reply\" to Searle? Do you find it convincing? Why or why not?",
      expected:
        "The systems reply says: yes, the person in the room doesn't understand Chinese — but the system as a whole (person plus rulebook plus room) does. Understanding doesn't have to live in one component; it can be a property of the whole. A good answer engages genuinely with both sides: Searle's intuition that something is still missing, and the systems reply's point that we don't locate understanding in individual neurons either. Personal opinion is valid as long as it engages with the argument rather than dismissing it.",
    },
    {
      id: "narrow-vs-general",
      question: "What's the difference between narrow and general intelligence? Give an example of something current AI does well, and something it can't do — and say why that distinction matters.",
      expected:
        "Narrow intelligence is deep competence in one specific domain — a chess engine, a translation model, an image classifier. General intelligence is the ability to flexibly apply knowledge across many different domains and learn new tasks from minimal examples. Current AI is narrow: a chess engine that beats world champions can't tie its shoes or understand a children's story. The distinction matters because general intelligence is what we mean when we say someone is intelligent — and it's what we don't know how to build yet.",
    },
  ],
  "02-the-logic": [
    {
      id: "and-gate",
      question:
        "You have two switches wired in a row to a light. What has to be true for the light to turn on?",
      expected:
        "Both switches have to be on. If either one is off, the light stays off. That's an AND gate: all inputs must be 1 for the output to be 1.",
    },
    {
      id: "not-gate",
      question: "What does a NOT gate do?",
      expected:
        "It flips its input. A 1 becomes a 0, and a 0 becomes a 1. It has one input and one output, and the output is always the opposite.",
    },
    {
      id: "binary-addition",
      question: "What is 1+1 in binary, and why isn't it 2?",
      expected:
        "It's 10. Binary only has two digits, 0 and 1, so there's no way to write 2 in a single column. Instead the 1 carries over to the next column, giving you 10 — which represents the value two.",
    },
  ],
  "01-the-promise-and-the-crash": [
    {
      id: "combinatorial",
      question: "What is the combinatorial explosion problem? Explain it without using the word \"exponential\".",
      expected: "TODO",
    },
    {
      id: "eliza",
      question: "Why did ELIZA fool people, and what did that reveal about how humans interpret language?",
      expected: "TODO",
    },
    {
      id: "lighthill",
      question: "What did the Lighthill Report conclude, and why did it matter?",
      expected: "TODO",
    },
  ],
  "02-the-expert-systems-era": [
    {
      id: "expert-systems",
      question: "What was an expert system, and what made it different from earlier AI approaches?",
      expected: "TODO",
    },
    {
      id: "brittleness",
      question: "What does it mean to say expert systems were \"brittle\"? Give a concrete example of what that looks like in practice.",
      expected: "TODO",
    },
    {
      id: "second-winter",
      question: "Why was the second AI winter harder to see coming than the first?",
      expected: "TODO",
    },
  ],
  "03-what-the-cold-taught-us": [
    {
      id: "assumptions",
      question: "What were the core assumptions of early AI that the winters exposed as wrong?",
      expected: "TODO",
    },
    {
      id: "connectionism",
      question: "What is connectionism, and why did it seem like a dead end before it didn't?",
      expected: "TODO",
    },
    {
      id: "legacy",
      question: "If AI kept failing, why didn't researchers give up entirely? What kept the field alive?",
      expected: "TODO",
    },
  ],
};
