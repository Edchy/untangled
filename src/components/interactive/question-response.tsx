"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChapterAnswers } from "./chapter-answers-context";
import { Button } from "@/components/ui/button";

interface Props {
  nextHref?: string;
  redirectHref?: string;
}

export function QuestionResponse({ redirectHref }: Props) {
  const router = useRouter();
  const { feedbackState, feedback, fullFeedback, retrySubmit } = useChapterAnswers();

  useEffect(() => {
    if (feedbackState === "idle" && redirectHref) {
      router.replace(redirectHref);
    }
  }, [feedbackState, redirectHref, router]);

  if (feedbackState === "idle") return null;

  return (
    <div className="flex min-h-[18rem] w-full max-w-[70ch] flex-col justify-start pb-12">
      {feedbackState === "loading" && (
        <div className="flex items-center gap-2 text-sm text-foreground/36">
          <span className="inline-block h-1 w-1 animate-pulse rounded-pill bg-foreground/36" />
          Thinking...
        </div>
      )}

      {feedbackState === "error" && (
        <div className="flex flex-col gap-4">
          <p className="font-body text-body text-foreground/48">{feedback}</p>
          <Button variant="subtle" size="sm" onClick={retrySubmit}>
            Try again
          </Button>
        </div>
      )}

      {(feedbackState === "streaming" || feedbackState === "done") && feedback && (
        <div className="relative">
          {/* Ghost holds the full final text — reserves exact height so streaming never reflows */}
          <p className="max-w-[70ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/68 [text-wrap:pretty] whitespace-pre-line opacity-0 select-none" aria-hidden>
            {fullFeedback || feedback}
          </p>
          <p className="absolute inset-0 max-w-[70ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/68 [text-wrap:pretty] whitespace-pre-line">
            {feedback}
            {feedbackState === "streaming" && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-pulse bg-foreground/36" />
            )}
          </p>
        </div>
      )}
    </div>
  );
}
