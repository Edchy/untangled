"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useChapterAnswers } from "./chapter-answers-context";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

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
        <div className="flex items-center gap-2 text-sm text-foreground/36">
          <span className="inline-block h-1 w-1 animate-pulse rounded-pill bg-foreground/36" />
          Thinking...
        </div>
      )}

      {(feedbackState === "streaming" || feedbackState === "done" || feedbackState === "error") && feedback && (
        <Text className="max-w-[65ch] whitespace-pre-line">
          {feedback}
          {feedbackState === "streaming" && (
            <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[1px] animate-pulse bg-foreground/36" />
          )}
        </Text>
      )}

      {feedbackState === "done" && nextHref && (
        <div className="mt-10 flex justify-end">
          <Button
            onClick={() => router.push(nextHref, { transitionTypes: ["nav-forward"] })}
            variant="quiet"
            size="sm"
            className="px-0 tracking-wide text-foreground/80 hover:text-foreground"
          >
            Continue →
          </Button>
        </div>
      )}
    </div>
  );
}
