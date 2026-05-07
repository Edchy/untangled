"use client";

import { createContext, useContext, useRef, useState, useEffect } from "react";

type Answers = Record<string, string>;
type FeedbackState = "idle" | "loading" | "streaming" | "done" | "error";

const GENERIC_FEEDBACK_ERROR = "I couldn't get your response just now. Please try again.";

interface ChapterAnswersContextValue {
  answers: Answers;
  storageKey: string;
  saveAnswer: (id: string, text: string) => void;
  feedbackState: FeedbackState;
  feedback: string;
  fullFeedback: string;
  submitAnswers: (finalId: string, finalText: string) => void;
  retrySubmit: () => void;
}

const ChapterAnswersContext = createContext<ChapterAnswersContextValue | null>(null);

export function ChapterAnswersProvider({ conceptSlug, children }: { conceptSlug: string; children: React.ReactNode }) {
  const storageKey = `untangled-answers-${conceptSlug}`;

  const [answers, setAnswers] = useState<Answers>({});
  const [feedbackState, setFeedbackState] = useState<FeedbackState>("idle");
  const [feedback, setFeedback] = useState("");
  const [fullFeedback, setFullFeedback] = useState("");

  const answersRef = useRef<Answers>({});
  const lastSubmittedAnswersRef = useRef<Answers | null>(null);

  // Restore from localStorage on mount
  useEffect(() => {
    let cancelled = false;

    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const { answers: a } = JSON.parse(saved);
        window.setTimeout(() => {
          if (cancelled) return;
          if (a) { setAnswers(a); answersRef.current = a; }
        }, 0);
      }
    } catch {}

    return () => {
      cancelled = true;
    };
  }, [storageKey]);

  // Persist answers to localStorage
  useEffect(() => {
    if (Object.keys(answersRef.current).length === 0) return;
    try {
      localStorage.setItem(storageKey, JSON.stringify({ answers: answersRef.current }));
    } catch {}
  }, [storageKey]);

  function saveAnswer(id: string, text: string) {
    const next = { ...answersRef.current, [id]: text };
    answersRef.current = next;
    setAnswers(next);
    try {
      const existing = localStorage.getItem(storageKey);
      const parsed = existing ? JSON.parse(existing) : {};
      localStorage.setItem(storageKey, JSON.stringify({ ...parsed, answers: next }));
    } catch {}
  }

  async function callEvaluate(allAnswers: Answers) {
    setFeedbackState("loading");
    setFeedback("");

    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: allAnswers, conceptSlug }),
      });

      const responseText = await res.text();
      if (!res.ok) {
        setFeedback(responseText || GENERIC_FEEDBACK_ERROR);
        setFeedbackState("error");
        return;
      }

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
      setFeedback(GENERIC_FEEDBACK_ERROR);
      setFeedbackState("error");
    }
  }

  async function submitAnswers(finalId: string, finalText: string) {
    if (feedbackState === "streaming" || feedbackState === "loading") return;
    const allAnswers = { ...answers, [finalId]: finalText };
    setAnswers(allAnswers);
    lastSubmittedAnswersRef.current = allAnswers;
    await callEvaluate(allAnswers);
  }

  function retrySubmit() {
    if (feedbackState === "streaming" || feedbackState === "loading") return;
    if (!lastSubmittedAnswersRef.current) return;
    callEvaluate(lastSubmittedAnswersRef.current);
  }

  return (
    <ChapterAnswersContext.Provider value={{ answers, storageKey, saveAnswer, feedbackState, feedback, fullFeedback, submitAnswers, retrySubmit }}>
      {children}
    </ChapterAnswersContext.Provider>
  );
}

export function useChapterAnswers() {
  const ctx = useContext(ChapterAnswersContext);
  if (!ctx) throw new Error("useChapterAnswers must be used inside ChapterAnswersProvider");
  return ctx;
}
