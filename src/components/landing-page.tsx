"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";
import { BinaryExplorer } from "@/components/interactive/binary-explorer";
import { PunchCardReader } from "@/components/interactive/punch-card-reader";
import {
  ComputerStackIllustration,
  LayersIllustration,
  CpuIllustration,
  BitsRainIllustration,
} from "@/components/interactive/chapter-one-illustrations";

const MAX_W = "mx-auto w-full max-w-[1200px] px-6 sm:px-10";

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const CHAPTERS = [
  {
    title: "01: The Machine",
    teaser: "Before AI, there was a switch. Everything flows from that.",
    Illustration: ComputerStackIllustration,
  },
  {
    title: "02: Can Machines Think?",
    teaser: "Turing's question, the 1956 Dartmouth workshop, and the birth of the word \"AI\".",
    Illustration: LayersIllustration,
  },
  {
    title: "03: The Long Winter",
    teaser: "When AI failed, what went wrong, and why the field froze.",
    Illustration: CpuIllustration,
  },
];

export function LandingPage({ firstSlideHref }: { firstSlideHref: string }) {
  return (
    <div className="min-h-svh bg-background text-foreground">
      {/* ── HERO (dark) ─────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={
          {
            "--background": "var(--ds-color-ink)",
            "--foreground": "var(--ds-color-paper)",
            "--accent": "var(--ds-color-ember)",
            background: "var(--ds-color-ink)",
            color: "var(--ds-color-paper)",
          } as React.CSSProperties
        }
      >
        {/* Header */}
        <header>
          <div className={`${MAX_W} flex h-16 items-center justify-between`}>
            <Link href="/" aria-label="Untangled home">
              <Image
                src="/un.svg"
                alt="Untangled"
                width={89}
                height={97}
                priority
                className="h-6 w-auto"
                style={{ filter: "none" }}
              />
            </Link>
            <nav>
              <Link
                href={firstSlideHref}
                className="text-label font-semibold uppercase tracking-[var(--ds-tracking-label)] text-[var(--ds-color-paper)] opacity-60 transition-opacity duration-150 hover:opacity-100"
              >
                Start
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero content */}
        <div className={`${MAX_W} relative flex min-h-[92svh] items-center`}>
          {/* Text column */}
          <div className="relative z-10 w-full max-w-[640px] py-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10"
            >
              <span className="text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent">
                Untangled
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              <h1 className="font-serif text-display font-semibold leading-[0.92] text-[var(--ds-color-paper)] [text-wrap:balance] mb-8">
                AI, from the<br />beginning.
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
              className="space-y-[var(--ds-space-4)]"
            >
              <p className="max-w-[52ch] text-body leading-[var(--ds-leading-body)] text-[var(--ds-color-paper)] opacity-68 [text-wrap:pretty]">
                A free, self-paced journey through artificial intelligence. Not the hype. The real thing. No technical background required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
              className="mt-12"
            >
              <LinkButton
                href={firstSlideHref}
                variant="ghost"
                size="lg"
                className="group gap-2.5 border-[var(--ds-color-paper)]/40 text-[var(--ds-color-paper)] hover:border-accent hover:text-accent"
              >
                Begin from the start
                <ArrowRight
                  size={14}
                  className="transition-transform duration-150 group-hover:translate-x-0.5"
                />
              </LinkButton>
            </motion.div>
          </div>

          {/* Ambient illustration — right half, desktop only */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 hidden w-[480px] -translate-y-1/2 opacity-[0.18] lg:block"
            aria-hidden
          >
            <ComputerStackIllustration />
          </div>
        </div>
      </section>

      {/* ── MANIFESTO (light) ───────────────────────────────────────────── */}
      <section className="border-t border-foreground/8 py-[var(--ds-space-24)]">
        <div className={MAX_W}>
          <Reveal>
            <h2 className="font-serif text-display font-semibold leading-[0.92] text-foreground [text-wrap:balance] mb-[var(--ds-space-16)] max-w-[14ch]">
              Not a course.<br />A story.
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 gap-x-[var(--ds-space-16)] gap-y-[var(--ds-space-8)] sm:grid-cols-2">
            <Reveal delay={0.08}>
              <div className="space-y-[var(--ds-space-5)]">
                <Text variant="body">
                  Most AI explainers start in the middle. They assume you already know what a computer is doing when it runs, what training means, what a model really is. Untangled starts before all of that.
                </Text>
                <Text variant="body">
                  We begin with a light switch. Then transistors. Then bits. Then everything that follows clicks into place — because you built the foundation yourself.
                </Text>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="space-y-[var(--ds-space-5)]">
                <Text variant="body">
                  No progress bars. No points. No accounts. Just a carefully paced narrative that respects your intelligence and your time.
                </Text>
                <Text variant="body">
                  Finish it and you&apos;ll be able to explain how a language model works to a friend — in your own words, with the whole picture.
                </Text>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── BINARY EXPLORER DEMO ────────────────────────────────────────── */}
      <section className="py-[var(--ds-space-24)] border-t border-foreground/8">
        <div className={MAX_W}>
          <Reveal>
            <span className="text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent mb-[var(--ds-space-6)] block">
              Try it
            </span>
            <h2 className="font-serif text-headline font-semibold leading-[var(--ds-leading-headline)] text-foreground mb-[var(--ds-space-8)] max-w-[22ch]">
              Every letter you&apos;ve ever typed was secretly a number.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-foreground/12 p-[var(--ds-space-8)]">
              <BinaryExplorer />
            </div>
            <p className="mt-[var(--ds-space-4)] max-w-[60ch] text-body leading-[var(--ds-leading-body)] text-foreground/48 [text-wrap:pretty]">
              This is how computers read. Every character maps to a pattern of ones and zeros — an agreement made in 1963 that still governs every keystroke you make today.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── CHAPTER TEASER (dark) ───────────────────────────────────────── */}
      <section
        className="py-[var(--ds-space-24)] border-t border-foreground/8"
        style={
          {
            "--background": "var(--ds-color-ink)",
            "--foreground": "var(--ds-color-paper)",
            "--accent": "var(--ds-color-ember)",
            background: "var(--ds-color-ink)",
            color: "var(--ds-color-paper)",
          } as React.CSSProperties
        }
      >
        <div className={MAX_W}>
          <Reveal>
            <span className="text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent mb-[var(--ds-space-10)] block">
              What&apos;s inside
            </span>
          </Reveal>

          <div className="grid grid-cols-1 gap-y-[var(--ds-space-16)] sm:grid-cols-3 sm:gap-x-[var(--ds-space-10)]">
            {CHAPTERS.map((chapter, i) => (
              <Reveal key={chapter.title} delay={i * 0.1}>
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <div className="mb-[var(--ds-space-6)] max-w-[240px] opacity-60">
                    <chapter.Illustration />
                  </div>
                  <h3 className="font-serif text-title font-semibold leading-[var(--ds-leading-title)] text-[var(--ds-color-paper)] mb-[var(--ds-space-3)] tabular-nums">
                    {chapter.title}
                  </h3>
                  <p className="text-body leading-[var(--ds-leading-body)] text-[var(--ds-color-paper)] opacity-52 max-w-[32ch] [text-wrap:pretty]">
                    {chapter.teaser}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUNCH CARD DEMO ─────────────────────────────────────────────── */}
      <section className="py-[var(--ds-space-24)] border-t border-foreground/8">
        <div className={MAX_W}>
          <Reveal>
            <span className="text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent mb-[var(--ds-space-6)] block">
              The history
            </span>
            <h2 className="font-serif text-headline font-semibold leading-[var(--ds-leading-headline)] text-foreground mb-[var(--ds-space-8)] max-w-[22ch]">
              Weirder than you think.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-foreground/12 p-[var(--ds-space-8)]">
              <PunchCardReader />
            </div>
            <p className="mt-[var(--ds-space-4)] max-w-[60ch] text-body leading-[var(--ds-leading-body)] text-foreground/48 [text-wrap:pretty]">
              Before RAM, before transistors, before screens — there were holes in paper. This is how HELLO looked in 1952.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── WHY IT'S FREE ───────────────────────────────────────────────── */}
      <section className="py-[var(--ds-space-24)] border-t border-foreground/8">
        <div className={MAX_W}>
          <Reveal>
            <h2 className="font-serif text-headline font-semibold leading-[var(--ds-leading-headline)] text-foreground mb-[var(--ds-space-10)] max-w-[20ch]">
              Free. No account.<br />No ads. No bars.
            </h2>
          </Reveal>

          <div className="space-y-0">
            {[
              ["Open to everyone", "No signup, no paywall, no email required. Just open a link and read."],
              ["Nonprofit by design", "Untangled exists to build understanding, not to monetize it. That's the whole point."],
              ["At your own pace", "No deadlines, no streaks, no guilt mechanics. Come back whenever you want."],
            ].map(([title, body], i) => (
              <Reveal key={title} delay={i * 0.08}>
                <div className="flex gap-[var(--ds-space-6)] border-t border-foreground/10 py-[var(--ds-space-6)] first:border-t-0">
                  <div
                    className="mt-[0.35em] h-[1em] w-px shrink-0 bg-accent opacity-70"
                    aria-hidden
                  />
                  <div>
                    <p className="font-sans font-semibold text-body text-foreground mb-[var(--ds-space-2)]">
                      {title}
                    </p>
                    <Text variant="muted">{body}</Text>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FOOTER (dark) ───────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden flex flex-col min-h-[80svh] justify-between pt-[var(--ds-space-24)] pb-[var(--ds-space-10)]"
        style={
          {
            "--background": "var(--ds-color-ink)",
            "--foreground": "var(--ds-color-paper)",
            "--accent": "var(--ds-color-ember)",
            background: "var(--ds-color-ink)",
            color: "var(--ds-color-paper)",
          } as React.CSSProperties
        }
      >
        {/* Ambient illustration */}
        <div
          className="pointer-events-none absolute right-0 bottom-0 w-[360px] opacity-[0.1] lg:w-[480px]"
          aria-hidden
        >
          <BitsRainIllustration />
        </div>

        <div className={`${MAX_W} relative z-10 flex-1 flex flex-col justify-center`}>
          <Reveal>
            <h2 className="font-serif text-display font-semibold leading-[0.92] text-[var(--ds-color-paper)] [text-wrap:balance] mb-[var(--ds-space-8)] max-w-[12ch]">
              Start from zero.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[44ch] text-body leading-[var(--ds-leading-body)] text-[var(--ds-color-paper)] opacity-60 mb-[var(--ds-space-10)] [text-wrap:pretty]">
              The story of AI begins further back than you think. And once you see it from the beginning, everything else makes sense.
            </p>
            <LinkButton
              href={firstSlideHref}
              variant="ghost"
              size="lg"
              className="group gap-2.5 border-[var(--ds-color-paper)]/40 text-[var(--ds-color-paper)] hover:border-accent hover:text-accent"
            >
              Begin from the start
              <ArrowRight
                size={14}
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </LinkButton>
          </Reveal>
        </div>

        <div className={`${MAX_W} relative z-10`}>
          <div className="flex flex-col items-start gap-5 pt-[var(--ds-space-16)] border-t border-[var(--ds-color-paper)]/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/un.svg"
                alt=""
                width={89}
                height={97}
                className="h-6 w-auto"
                style={{ filter: "none" }}
              />
              <Image
                src="/untangled.svg"
                alt="Untangled"
                width={590}
                height={124}
                className="h-8 w-auto"
                style={{ filter: "none" }}
              />
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              <p className="text-xs text-[var(--ds-color-paper)] opacity-40">
                Free and nonprofit. No accounts, no progress bars, no ads.
              </p>
              <p className="text-xs text-[var(--ds-color-paper)] opacity-40">
                Made by{" "}
                <a
                  href="https://nope.digital"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-2 transition-colors duration-150 hover:opacity-100 hover:underline"
                >
                  Nope Digital
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
