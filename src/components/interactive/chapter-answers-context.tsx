"use client";

import { createContext, useContext, useState } from "react";

type Answers = Record<string, string>;
type FeedbackState = "idle" | "loading" | "streaming" | "done" | "error";

interface ChapterAnswersContextValue {
  answers: Answers;
  saveAnswer: (id: string, text: string) => void;
  feedbackState: FeedbackState;
  feedback: string;
  submitAnswers: (finalId: string, finalText: string) => void;
}

const ChapterAnswersContext = createContext<ChapterAnswersContextValue | null>(null);

export function ChapterAnswersProvider({ children }: { children: React.ReactNode }) {
  const [answers, setAnswers] = useState<Answers>({});
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [feedback, setFeedback] = useState("");

  function saveAnswer(id: string, text: string) {
    setAnswers((prev) => ({ ...prev, [id]: text }));
  }

  async function submitAnswers(finalId: string, finalText: string) {
    const allAnswers = { ...answers, [finalId]: finalText };
    setAnswers(allAnswers);
    setFeedbackState("loading");
    setFeedback("");

    console.log("Submitting answers:", allAnswers);

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: allAnswers }),
      });

      const responseText = await res.text();
      setFeedbackState("streaming");

      let i = 0;
      const words = responseText.split(" ");
      const interval = setInterval(() => {
        i++;
        setFeedback(words.slice(0, i).join(" "));
        if (i >= words.length) {
          clearInterval(interval);
          setFeedbackState("done");
        }
      }, 60);
    } catch {
      setFeedback("Something went wrong. Please try again.");
      setFeedbackState("error");
    }
  }

  return (
    <ChapterAnswersContext.Provider value={{ answers, saveAnswer, feedbackState, feedback, submitAnswers }}>
      {children}
    </ChapterAnswersContext.Provider>
  );
}

export function useChapterAnswers() {
  const ctx = useContext(ChapterAnswersContext);
  if (!ctx) throw new Error("useChapterAnswers must be used inside ChapterAnswersProvider");
  return ctx;
}
