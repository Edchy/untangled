"use client";

import { useState } from "react";
import { LightSwitchScene } from "@/components/interactive/light-switch-scene";
import { Button, LinkButton } from "@/components/ui/button";
import { proseParagraphClassName } from "@/components/ui/prose";

const CONCEPTS = [
  { term: "Abstraction", def: "A simple surface hiding complexity underneath. The switch is the abstraction; the wiring is what you don't see." },
  { term: "Transistor", def: "A tiny switch with no moving parts. Signal on, electricity flows. Signal off, it stops. The basic unit of every computer." },
  { term: "Binary", def: "Two states — on and off, 1 and 0 — combined in patterns to represent anything: numbers, letters, colors, sound." },
  { term: "Byte", def: "Eight bits. Enough combinations to represent every character on your keyboard." },
  { term: "CPU", def: "The conductor. One brilliant processor, working in sequence — one instruction at a time, billions of times a second." },
  { term: "GPU", def: "Thousands of simpler processors running in parallel. Built for pixels; turned out to be perfect for AI." },
  { term: "RAM", def: "Your desk. Fast, right there, spread out and ready. Gone when you leave." },
  { term: "Storage", def: "The filing cabinet. Slower to reach, but survives when the power goes off." },
];

const SHARE_URL = "https://untangled.ai";
const SHARE_TEXT = "I just finished 01: The Machine in Untangled — a free interactive course on how AI actually works. Worth it.";

async function share() {
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Untangled", text: SHARE_TEXT, url: SHARE_URL });
      return;
    } catch {
      // user cancelled or API unavailable — fall through to clipboard
    }
  }
  await navigator.clipboard.writeText(`${SHARE_TEXT}\n${SHARE_URL}`);
}

export function ChapterEndScene() {
  const [recapOpen, setRecapOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    await share();
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  }

  return (
    <div className="flex w-full max-w-2xl flex-col items-start gap-10">
      {/* Switch — full circle callback */}
      <LightSwitchScene />

      {/* Slide text */}
      <div>
        <p className={proseParagraphClassName}>
          You clicked this at the start. Back then it was just a switch.
        </p>
        <p className={proseParagraphClassName}>
          Now you know that a computer is <strong>nothing but switches</strong>, arranged cleverly.
          Billions of them. Organized into circuits. Coordinated by a clock.
          Running billions of times a second.{" "}
          <strong>Same idea. Unimaginable scale.</strong>
        </p>
        <p className={proseParagraphClassName}>
          But there&apos;s still one piece missing.
          How do you get from a switch to something that can actually compute?{" "}
          <strong>That&apos;s next.</strong>
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3">
        <LinkButton href="/02-can-machines-think" variant="primary" size="md">
          Next chapter
        </LinkButton>
        <Button
          variant="ghost"
          size="md"
          onClick={() => setRecapOpen((o) => !o)}
          aria-expanded={recapOpen}
        >
          {recapOpen ? "Hide recap" : "Recap"}
        </Button>
        <Button variant="quiet" size="md" onClick={handleShare}>
          {copied ? "Copied" : "Share"}
        </Button>
      </div>

      {/* Recap panel */}
      {recapOpen && (
        <div className="w-full border-t border-foreground/12 pt-8">
          <p className="mb-6 font-mono text-xs font-semibold uppercase tracking-widest text-foreground/36 tabular-nums">
            01: The Machine — Key concepts
          </p>
          <dl className="flex flex-col gap-5">
            {CONCEPTS.map(({ term, def }) => (
              <div key={term} className="grid max-w-[60ch] grid-cols-[7rem_1fr] gap-x-6 gap-y-1">
                <dt className="text-body font-semibold text-foreground">{term}</dt>
                <dd className="text-body text-foreground/58 [text-wrap:pretty]">{def}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}
