"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useChapterAnswers } from "./chapter-answers-context";

const QUESTION_SEQUENCE = ["transistor", "abstraction", "binary"] as const;
const MIN_CHARS = 10;

interface Props {
  questionId: string;
  nextHref?: string;
  skipHref?: string;
  bodyHtml?: string;
}

export function FreeFormQuestion({ questionId, nextHref, skipHref, bodyHtml }: Props) {
  const router = useRouter();
  const { answers, saveAnswer, submitAnswers } = useChapterAnswers();

  const isLast = QUESTION_SEQUENCE[QUESTION_SEQUENCE.length - 1] === questionId;
  const [text, setText] = useState(answers[questionId] ?? "");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isReady = text.trim().length >= MIN_CHARS;
  const textRef = useRef(text);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    return () => {
      if (textRef.current.trim()) saveAnswer(questionId, textRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(e.target.value);
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
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInput}
          placeholder="Write your answer here..."
          rows={4}
          spellCheck={false}
          className="w-full resize-none rounded-[var(--radius)] border border-foreground/12 bg-transparent px-4 py-3 text-[1.0625rem] leading-[1.85] text-foreground/80 placeholder:text-foreground/28 focus:border-foreground/24 focus:outline-none"
          style={{ overflow: "hidden" }}
        />
        <div className="mt-3 flex items-center justify-between">
          <button
            onClick={() => { const dest = skipHref ?? nextHref; if (dest) router.push(dest, { transitionTypes: ["nav-forward"] }); }}
            className="text-[0.8125rem] text-foreground/52 transition-colors duration-150 hover:text-foreground/80"
          >
            Skip
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isReady}
            className="text-[0.875rem] font-semibold tracking-wide text-foreground/80 transition-opacity duration-150 disabled:cursor-default disabled:opacity-28 enabled:hover:text-foreground"
          >
            {isLast ? "Submit →" : "Save & continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
