"use client";

import { createContext, useContext, useRef, useState, useEffect } from "react";

type Answers = Record<string, string>;
type FeedbackState = "idle" | "loading" | "streaming" | "done" | "error";

interface ChapterAnswersContextValue {
  answers: Answers;
  storageKey: string;
  saveAnswer: (id: string, text: string) => void;
  feedbackState: FeedbackState;
  feedback: string;
  fullFeedback: string;
  submitAnswers: (finalId: string, finalText: string) => void;
}

const ChapterAnswersContext = createContext<ChapterAnswersContextValue | null>(null);

export function ChapterAnswersProvider({ conceptSlug, children }: { conceptSlug: string; children: React.ReactNode }) {
  const storageKey = `untangled-answers-${conceptSlug}`;

  const [answers, setAnswers] = useState<Answers>({});
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [feedback, setFeedback] = useState("");
  const [fullFeedback, setFullFeedback] = useState("");

  // Keep a ref to answers so saveAnswer can write to localStorage synchronously
  const answersRef = useRef<Answers>({});

  // Restore from localStorage on mount
  useEffect(() => {
    let cancelled = false;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { answers: a, feedback: f, feedbackState: fs } = JSON.parse(saved);
        window.setTimeout(() => {
          if (cancelled) return;
          if (a) { setAnswers(a); answersRef.current = a; }
          if (f) { setFeedback(f); setFullFeedback(f); }
          if (fs && fs !== "loading" && fs !== "streaming") setFeedbackState(fs);
        }, 0);
      }
    } catch {}

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  // Persist feedback state changes to localStorage
  useEffect(() => {
    if (Object.keys(answersRef.current).length === 0 && !feedback) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers: answersRef.current, feedback, feedbackState }));
    } catch {}
  }, [feedback, feedbackState, storageKey]);

  function saveAnswer(id: string, text: string) {
    const next = { ...answersRef.current, [id]: text };
    answersRef.current = next;
    setAnswers(next);
    // Write synchronously so a refresh never loses in-progress text
    try {
      const existing = localStorage.getItem(storageKey);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(storageKey, JSON.stringify({ ...parsed, answers: next }));
    } catch {}
  }

  async function submitAnswers(finalId: string, finalText: string) {
    if (feedbackState === "done" || feedbackState === "streaming" || feedbackState === "loading") return;
    const allAnswers = { ...answers, [finalId]: finalText };
    setAnswers(allAnswers);
    setFeedbackState("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: allAnswers }),
      });

      const responseText = await res.text();
      setFullFeedback(responseText);
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
    <ChapterAnswersContext.Provider value={{ answers, storageKey, saveAnswer, feedbackState, feedback, fullFeedback, submitAnswers }}>
      {children}
    </ChapterAnswersContext.Provider>
  );
}

export function useChapterAnswers() {
  const ctx = useContext(ChapterAnswersContext);
  if (!ctx) throw new Error("useChapterAnswers must be used inside ChapterAnswersProvider");
  return ctx;
}
