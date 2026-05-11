"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { useChapterAnswers } from "@/components/interactive/chapter-answers-context";
import { cn } from "@/lib/ui";

type SlideNavProps = {
  previousHref?: string;
  nextHref?: string;
  nextLabel?: string;
  nextSubmitQuestionId?: string;
  skipQuestionId?: string;
  noAnswerSkipHref?: string;
  nextIsPrimary?: boolean;
  showKeyboardHint?: boolean;
};

function ArrowKey({ children }: { children: string }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-control border border-foreground/18 px-1.5 font-sans text-xs font-semibold leading-none text-foreground/60">
      {children}
    </kbd>
  );
}

export function SlideNav({
  previousHref,
  nextHref,
  nextLabel,
  nextSubmitQuestionId,
  skipQuestionId,
  noAnswerSkipHref,
  nextIsPrimary = true,
  showKeyboardHint,
}: SlideNavProps) {
  const router = useRouter();
  const { submitAnswers, answers, saveAnswer } = useChapterAnswers();
  const hasExistingAnswers = Object.entries(answers).some(([id, v]) => id !== (nextSubmitQuestionId ?? skipQuestionId) && v.trim().length > 0);
  const resolvedNextLabel = nextSubmitQuestionId && hasExistingAnswers
    ? "skip question and submit"
    : nextLabel;
  const resolvedNextHref = nextSubmitQuestionId && !hasExistingAnswers && noAnswerSkipHref
    ? noAnswerSkipHref
    : nextHref;

  function handleNextClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!resolvedNextHref || !nextSubmitQuestionId || !hasExistingAnswers) return;
    event.preventDefault();
    submitAnswers(nextSubmitQuestionId, "");
    router.push(resolvedNextHref, { transitionTypes: ["nav-forward"] });
  }

  function handleSkipClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!resolvedNextHref || !skipQuestionId) return;
    event.preventDefault();
    router.push(resolvedNextHref, { transitionTypes: ["nav-forward"] });
  }

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-inherit px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6"
    >
      {showKeyboardHint && (
        <p className="mb-2 flex items-center justify-center gap-2 text-xs leading-6 text-foreground/48">
          <span>Arrow keys to move back and forth</span>
          <span className="inline-flex shrink-0 gap-1" aria-hidden>
            <ArrowKey>←</ArrowKey>
            <ArrowKey>→</ArrowKey>
          </span>
        </p>
      )}
      <div className="mx-auto flex w-full max-w-2xl items-center justify-center gap-3">
        {previousHref ? (
          <Link
            href={previousHref}
            transitionTypes={["nav-back"]}
            aria-label="Previous slide"
            className="flex h-11 items-center gap-2 rounded-control border border-foreground/12 px-4 text-sm !text-foreground/50 transition-colors duration-150 hover:border-foreground/24 hover:!text-foreground"
          >
            <ArrowLeft size={14} />
            Back
          </Link>
        ) : (
          <Link
            href="/"
            aria-label="Home"
            className="flex h-11 items-center gap-2 rounded-control border border-foreground/12 px-4 text-sm !text-foreground/50 transition-colors duration-150 hover:border-foreground/24 hover:!text-foreground"
          >
            <Home size={14} />
            Home
          </Link>
        )}
        {resolvedNextHref ? (
          nextSubmitQuestionId && hasExistingAnswers ? (
            <Link
              href={resolvedNextHref}
              onClick={handleNextClick}
              aria-label="Next slide"
              className={cn(
                "flex h-11 items-center gap-2 rounded-control border px-5 text-sm font-medium transition-colors duration-150",
                nextIsPrimary
                  ? "border-accent/40 !text-accent hover:border-accent hover:!text-accent"
                  : "border-foreground/12 !text-foreground/50 hover:border-foreground/24 hover:!text-foreground",
              )}
            >
              {resolvedNextLabel ?? "Next"}
              <ArrowRight size={14} />
            </Link>
          ) : (
            <Link
              href={resolvedNextHref}
              onClick={skipQuestionId ? handleSkipClick : undefined}
              transitionTypes={skipQuestionId ? undefined : ["nav-forward"]}
              aria-label="Next slide"
              className={cn(
                "flex h-11 items-center gap-2 rounded-control border px-5 text-sm font-medium transition-colors duration-150",
                nextIsPrimary
                  ? "border-accent/40 !text-accent hover:border-accent hover:!text-accent"
                  : "border-foreground/12 !text-foreground/50 hover:border-foreground/24 hover:!text-foreground",
              )}
            >
              {resolvedNextLabel ?? "Next"}
              <ArrowRight size={14} />
            </Link>
          )
        ) : null}
      </div>
    </nav>
  );
}
