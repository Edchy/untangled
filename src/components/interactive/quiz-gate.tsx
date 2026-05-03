"use client";

import { useRouter } from "next/navigation";

interface Props {
  nextHref?: string;
  skipHref?: string;
}

export function QuizGate({ nextHref, skipHref }: Props) {
  const router = useRouter();

  return (
    <div className="w-full max-w-2xl">
      <p className="max-w-[45ch] text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty]">
        Three questions.
      </p>
      <p className="mt-5 max-w-[45ch] text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty]">
        Write what you actually think — in your own words.
        There&apos;s no score.
      </p>

      <div className="mt-10 flex items-center gap-8">
        {skipHref && (
          <button
            onClick={() => router.push(skipHref, { transitionTypes: ["nav-forward"] })}
            className="text-[0.8125rem] text-foreground/52 transition-colors duration-150 hover:text-foreground/80"
          >
            Skip
          </button>
        )}
        {nextHref && (
          <button
            onClick={() => router.push(nextHref, { transitionTypes: ["nav-forward"] })}
            className="text-[0.875rem] font-semibold tracking-wide text-foreground/80 transition-colors duration-150 hover:text-foreground"
          >
            Start →
          </button>
        )}
      </div>
    </div>
  );
}
