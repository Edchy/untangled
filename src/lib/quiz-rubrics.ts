export type QuizQuestion = {
  id: string;
  question: string;
  expected: string;
};

export const QUIZ_RUBRICS: Record<string, QuizQuestion[]> = {
  "01-what-is-a-computer": [
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
  "02-logic-and-circuits": [
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
};
