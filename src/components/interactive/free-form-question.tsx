"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useChapterAnswers } from "./chapter-answers-context";
import { Button } from "@/components/ui/button";

const QUESTION_SEQUENCE = ["transistor", "abstraction", "binary"] as const;
const MIN_CHARS = 10;
const MAX_CHARS = 500;

interface Props {
  questionId: string;
  nextHref?: string;
  bodyHtml?: string;
}

export function FreeFormQuestion({ questionId, nextHref, bodyHtml }: Props) {
  const router = useRouter();
  const { storageKey, saveAnswer, submitAnswers } = useChapterAnswers();

  const isLast = QUESTION_SEQUENCE[QUESTION_SEQUENCE.length - 1] === questionId;
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isReady = text.trim().length >= MIN_CHARS;
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  // Restore saved answer from localStorage after hydration
  useEffect(() => {
    let cancelled = false;

    try {
      const saved = localStorage.getItem(storageKey);
      const savedText = saved ? JSON.parse(saved)?.answers?.[questionId] : null;
      if (savedText) {
        window.setTimeout(() => {
          if (!cancelled) setText(String(savedText).slice(0, MAX_CHARS));
        }, 0);
      }
    } catch {}

    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    return () => {
      if (textRef.current.trim()) saveAnswer(questionId, textRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target.value;
    setText(val);
    saveAnswer(questionId, val);
    const el = e.target;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  function handleSubmit() {
    if (!isReady || !nextHref) return;
    if (isLast) {
      submitAnswers(questionId, text);
    } else {
      saveAnswer(questionId, text);
    }
    router.push(nextHref, { transitionTypes: ["nav-forward"] });
  }

  return (
    <div className="w-full max-w-2xl">
      {bodyHtml && <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />}

      <div className="mt-8">
        <div className="relative">
          <textarea
            ref={textareaRef}
            value={text}
            onChange={handleInput}
            placeholder="Write your answer here..."
            maxLength={MAX_CHARS}
            rows={4}
            spellCheck={false}
            className="w-full resize-none rounded-control border border-foreground/12 bg-transparent px-4 py-3 pr-24 text-body leading-[var(--ds-leading-body)] text-foreground/80 placeholder:text-foreground/28 focus:border-foreground/24 focus:outline-none"
            style={{ overflow: "hidden" }}
          />
          <span className="pointer-events-none absolute right-3 top-3 font-mono text-[0.75rem] tabular-nums text-foreground/32">
            {text.length}/{MAX_CHARS}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-end">
          <Button
            onClick={handleSubmit}
            disabled={!isReady}
            variant="quiet"
            size="sm"
            className="px-0 tracking-wide text-foreground/80 enabled:hover:text-foreground"
          >
            {isLast ? "Submit →" : "Save & continue →"}
          </Button>
        </div>
      </div>
    </div>
  );
}
