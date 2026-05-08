"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Home, Link2, Mail, MoreHorizontal, X } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Bluesky, Facebook, LinkedIn, Messenger, Reddit, XformerlyTwitter } from "@/components/icons/social";

const SHARE_ORIGIN = "https://untangled.se";
const SHARE_TEXT = "If you've ever wanted to actually understand how AI works, not just the surface-level stuff, this is worth reading. It's free and starts from scratch.";
const SHARE_TITLE = "Untangled";
const SHARE_DESCRIPTION = "AI is reshaping the world faster than most people can follow. Untangled takes the knot apart, one careful chapter at a time, from the very beginning. No technical background needed. No jargon. No shortcuts. Just a careful, illustrated journey through how AI actually works, built for curious people who want a real understanding, not just the surface version. Free, forever.";
const ENCODED_TEXT = encodeURIComponent(SHARE_TEXT);
const ENCODED_TITLE = encodeURIComponent(SHARE_TITLE);

async function copyShareText(shareUrl: string) {
  await navigator.clipboard.writeText(shareUrl);
}

type ChapterEndNavProps = {
  previousHref?: string;
  nextDestination:
    | {
        kind: "chapter";
        href: string;
        chapterTitle?: string;
      }
    | {
        kind: "module";
        href: string;
        moduleTitle?: string;
        moduleNumber?: string;
        chapterTitle?: string;
      }
    | {
        kind: "complete";
      };
  shareHref?: string;
};

export function ChapterEndNav({ previousHref, nextDestination, shareHref = "/" }: ChapterEndNavProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const shareUrl = new URL(shareHref, SHARE_ORIGIN).toString();
  const encodedUrl = encodeURIComponent(shareUrl);
  const displayUrl = shareUrl.replace(/^https?:\/\//, "").replace(/\/$/, "");

  useEffect(() => {
    if (!open) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  async function handleCopy() {
    await copyShareText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  const isMilestone = nextDestination.kind !== "chapter";
  const nextCtaLabel =
    nextDestination.kind === "module"
      ? `Start module ${nextDestination.moduleNumber ?? ""}`.trim()
      : nextDestination.kind === "chapter"
        ? "Next chapter"
        : undefined;

  return (
    <>
      <nav
        aria-label="Slide navigation"
        className="fixed inset-x-0 bottom-0 z-40 bg-background px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5"
      >
        <div className="relative mx-auto flex w-full max-w-3xl flex-col items-center gap-4">
          {isMilestone ? (
            <div className="flex max-w-[min(100%,42rem)] flex-col items-center gap-1 text-center">
              <p className="font-sans text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent">
                {nextDestination.kind === "module" ? "Module complete" : "Journey complete"}
              </p>
              <p className="font-body text-sm leading-6 text-foreground/58 [text-wrap:balance]">
                {nextDestination.kind === "module"
                  ? `Next: ${nextDestination.moduleTitle ?? "the next module"}`
                  : "You have reached the end of Untangled."}
              </p>
            </div>
          ) : null}
          <div className="flex w-full flex-wrap items-center justify-center gap-3">
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
            {nextDestination.kind !== "complete" && (
              <LinkButton
                href={nextDestination.href}
                transitionTypes={["nav-forward"]}
                variant="ember"
                size={isMilestone ? "lg" : "md"}
                className="gap-2 px-5"
              >
                {nextCtaLabel}
                <ArrowRight size={14} />
              </LinkButton>
            )}
            <Button
              variant="quiet"
              size="md"
              onClick={() => setOpen(true)}
              className="flex h-11 items-center gap-2 rounded-control border border-foreground/12 px-4 text-sm"
            >
              Share
            </Button>
          </div>
        </div>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/24 px-5 py-8 backdrop-blur-sm"
          onClick={() => { setOpen(false); setExpanded(false); }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-dialog-title"
            className="w-full max-w-md rounded-surface border border-foreground/12 bg-background p-ds-6 text-foreground"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-ds-4">
              <h2 id="share-dialog-title" className="font-sans text-base font-semibold leading-none">
                Share
              </h2>
              <Button variant="icon" size="md" aria-label="Close share dialog" onClick={() => { setOpen(false); setExpanded(false); }}>
                <X size={22} />
              </Button>
            </div>

            <div className="mt-ds-5 overflow-hidden rounded-surface border border-foreground/12">
              <div className="flex aspect-[16/9] items-center justify-center bg-foreground/[0.04]">
                <Image src="/un.png" alt="" width={96} height={96} />
              </div>
              <div className="border-t border-foreground/12 p-ds-4">
                <p className="font-sans text-lg font-semibold leading-snug text-foreground">{SHARE_TITLE}</p>
                <p className="mt-ds-2 line-clamp-4 font-sans text-sm leading-6 text-foreground/58">
                  {SHARE_DESCRIPTION}
                </p>
                <p className="mt-ds-3 font-sans text-xs font-semibold text-foreground/70">{displayUrl}</p>
              </div>
            </div>

            <div className="mt-ds-5 flex flex-wrap gap-ds-3">
              <Button variant="ember" size="lg" onClick={handleCopy} className="h-12 flex-1 gap-2 whitespace-nowrap">
                <Link2 size={18} />
                {copied ? "Copied!" : "Copy link"}
              </Button>
              <a
                href={`https://twitter.com/intent/tweet?text=${ENCODED_TEXT}&url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on X"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-foreground/12 text-foreground/78 transition-colors duration-150 hover:border-foreground/24 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <XformerlyTwitter className="h-4 w-4" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Share on LinkedIn"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-foreground/12 text-foreground/78 transition-colors duration-150 hover:border-foreground/24 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <LinkedIn className="h-5 w-5" />
              </a>
              <a
                href={`mailto:?subject=${ENCODED_TITLE}&body=${ENCODED_TEXT}%0A%0A${encodedUrl}`}
                aria-label="Share by email"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-control border border-foreground/12 text-foreground/78 transition-colors duration-150 hover:border-foreground/24 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <Mail size={20} />
              </a>
              <div className="relative shrink-0">
                {expanded && (
                  <div className="absolute bottom-[calc(100%+0.5rem)] right-0 flex gap-ds-2 rounded-control border border-foreground/12 bg-background p-2 shadow-lg">
                    <a
                      href={`https://bsky.app/intent/compose?text=${ENCODED_TEXT}%20${encodedUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Bluesky"
                      className="flex h-10 w-10 items-center justify-center rounded-control border border-foreground/12 transition-colors duration-150 hover:border-foreground/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <Bluesky className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${ENCODED_TITLE}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Reddit"
                      className="flex h-10 w-10 items-center justify-center rounded-control border border-foreground/12 transition-colors duration-150 hover:border-foreground/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <Reddit className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Facebook"
                      className="flex h-10 w-10 items-center justify-center rounded-control border border-foreground/12 transition-colors duration-150 hover:border-foreground/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <Facebook className="h-4 w-4" />
                    </a>
                    <a
                      href={`https://m.me/share?link=${encodedUrl}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label="Share on Messenger"
                      className="flex h-10 w-10 items-center justify-center rounded-control border border-foreground/12 transition-colors duration-150 hover:border-foreground/24 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                    >
                      <Messenger className="h-4 w-4" />
                    </a>
                  </div>
                )}
                <Button variant="subtle" size="lg" aria-label="More sharing options" onClick={() => setExpanded((v) => !v)} className="h-12 w-12 px-0">
                  <MoreHorizontal size={20} />
                </Button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
