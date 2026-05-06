"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";

const SHARE_URL = "https://untangled.ai";
const SHARE_TEXT = "I just finished a chapter in Untangled — a free interactive course on how AI actually works. Worth it.";

async function share() {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Untangled", text: SHARE_TEXT, url: SHARE_URL });
      return;
    } catch {
      // user cancelled or unavailable — fall through
    }
  }
  await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`);
}

type ChapterEndNavProps = {
  previousHref?: string;
  nextChapterHref: string;
};

export function ChapterEndNav({ previousHref, nextChapterHref }: ChapterEndNavProps) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    await share();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <nav
      aria-label="Slide navigation"
      className="fixed inset-x-0 bottom-0 z-40 bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-6"
    >
      <div className="relative mx-auto flex w-full max-w-2xl items-center justify-center gap-3">
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
          <div />
        )}
        <Link
          href="/"
          aria-label="Home"
          className="flex h-11 items-center gap-2 rounded-control border border-foreground/12 px-4 text-sm !text-foreground/50 transition-colors duration-150 hover:border-foreground/24 hover:!text-foreground"
        >
          <Home size={14} />
          Home
        </Link>
        <LinkButton
          href={nextChapterHref}
          transitionTypes={["nav-forward"]}
          variant="ember"
          size="md"
          className="gap-2 px-5"
        >
          Next chapter
          <ArrowRight size={14} />
        </LinkButton>
        <Button variant="quiet" size="md" onClick={handleShare} className="absolute right-0">
          {copied ? "Copied" : "Share"}
        </Button>
      </div>
    </nav>
  );
}
