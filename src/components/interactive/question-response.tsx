"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChapterAnswers } from "./chapter-answers-context";

interface Props {
  nextHref?: string;
  redirectHref?: string;
}

export function QuestionResponse({ nextHref, redirectHref }: Props) {
  const router = useRouter();
  const { feedbackState, feedback } = useChapterAnswers();

  useEffect(() => {
    if (feedbackState === "idle" && redirectHref) {
      router.replace(redirectHref);
    }
  }, [feedbackState, redirectHref, router]);

  if (feedbackState === "idle") return null;

  return (
    <div className="flex min-h-[18rem] w-full max-w-2xl flex-col justify-start">
      {feedbackState === "loading" && (
        <div className="flex items-center gap-2 text-[0.875rem] text-foreground/36">
          <span className="inline-block h-1 w-1 animate-pulse rounded-full bg-foreground/36" />
          Thinking...
        </div>
      )}

      {(feedbackState === "streaming" || feedbackState === "done" || feedbackState === "error") && feedback && (
        <p className="max-w-[65ch] whitespace-pre-line text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty]">
          {feedback}
          {feedbackState === "streaming" && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-pulse bg-foreground/36" />
          )}
        </p>
      )}

      {feedbackState === "done" && nextHref && (
        <div className="mt-10 flex justify-end">
          <button
            onClick={() => router.push(nextHref, { transitionTypes: ["nav-forward"] })}
            className="text-[0.875rem] font-semibold tracking-wide text-foreground/80 transition-colors duration-150 hover:text-foreground"
          >
            Continue →
          </button>
        </div>
      )}
    </div>
  );
}
