# AI Learning Platform — Project Brief

> A free, nonprofit, interactive learning experience that demystifies AI for people who know nothing about it. Built with care, designed with warmth, structured like a beautifully illustrated book.

---

## The Idea

Most AI explainers are either too shallow ("it's like autocomplete!") or too technical. This platform sits in the gap: it treats curious people as intelligent adults without assuming any prior knowledge. The goal is not to inform — it's to build a genuine mental model. Someone who completes this should be able to explain how a large language model works to a friend.

The key insight driving the structure: **start from the very beginning**. Not from ChatGPT, not from "machine learning" — from the first computers, the first questions about thinking machines, the failures, the winters, the slow climb to the present. When you understand *why* something was invented and what moment in history it came from, the *how* clicks much faster.

---

## Audience

People who know nothing about AI. Curious, intelligent, possibly anxious about it. No assumed technical background whatsoever. Zero jargon — if a term must be used, it gets explained immediately and plainly.

---

## Core Principles

- **One aha per unit.** Every slide answers one question so clearly the person could explain it to someone else afterward. That's the quality bar.
- **Byte-sized.** No slide is overloaded. Each one has one job.
- **No jargon.** If a word needs a degree to understand, find a better word.
- **Warm, not clinical.** This should feel like a beautifully made book, not a course platform.
- **Built to last.** This is a living reference. Modules stay accessible after completion. Content evolves as AI evolves.

---

## Experience Structure

- **Linear with revisit.** The experience is linear — you build understanding in sequence. But every completed module is permanently accessible as a reference.
- **Solo.** No social features, no community, no leaderboards. Just you and the content.
- **No "done" state.** It's a living document. New modules can be added as the field evolves.
- **Nonprofit and free.** No paywall, no ads, no business model. A public good.

---

## Module Structure

Ten modules, ordered chronologically from the first computers to the present day. Each module contains multiple concepts, each concept multiple slides.

The accent color shifts across the arc — cooler/neutral in the foundational history, warming toward coral as the story reaches the present.

| # | Title | Theme |
|---|-------|-------|
| 01 | **The Machine** | What a computer actually is. Binary, logic, the first mechanical calculators. |
| 02 | **Can Machines Think?** | Turing's question, the 1956 Dartmouth workshop, the birth of the word "AI". |
| 03 | **The Long Winter** | When AI failed. The AI winters — what went wrong, and why. |
| 04 | **Learning from Data** | Neural networks, backpropagation, the shift from rules to patterns. |
| 05 | **Going Deeper** | Deep learning, GPUs, ImageNet 2012 — the moment everything changed. |
| 06 | **The Meaning of Words** | How computers deal with language. Word embeddings, tokens, the problem of meaning. |
| 07 | **Paying Attention** | The transformer. "Attention Is All You Need" (2017). Why it changed everything. |
| 08 | **Scale** | What happens when you make a model very, very large. Emergent behavior. |
| 09 | **What It Actually Does** | How an LLM generates a response. Tokens, probabilities, the live tokenizer. |
| 10 | **The Honest Questions** | What AI can and can't do. Hallucinations, bias, what to actually worry about. |

---

## Content Architecture

Each slide maps to one MDX file. MDX is chosen over plain MD because some slides embed live interactive components (tokenizer demos, neural network visualizations, logic gate explorers) — MDX allows these to live inline with the content naturally, while remaining readable as prose.

### Folder structure

```
/content
  /01-the-machine
    /01-what-is-a-computer
      01-the-problem.mdx
      02-punch-cards.mdx
      03-binary.mdx
    /02-logic-and-circuits
      01-gates.mdx
      02-demo-logic.mdx        ← imports LogicGateDemo component
  /02-can-machines-think
    ...
```

### MDX frontmatter convention

Every slide carries metadata in frontmatter:

```mdx
---
title: "What is a computer, really?"
module: the-machine
concept: what-is-a-computer
order: 1
type: text          # text | interactive | visual
sources:
  - "https://example.com/source-used-on-this-slide"
---

Content here...
```

The `order` field — not the filename — drives linear progression. This allows inserting slides without renaming files.
The optional `sources` field stores source URLs close to the slide they support.
Chapter-level source lists are reserved for broader further reading and useful extras.

### Interactive components

- **Module-specific components** (e.g. `TokenizerDemo`, `NeuralNetViz`) live co-located in their module folder.
- **Shared components** (e.g. callout cards, progress indicators) live in `/components/interactive`.

### Key interactive moments (planned)

- **Live tokenizer** — type any text, watch it break into tokens in real time. (Module 06/09)
- **Predict the next word** — mini-game that puts you in the position of an LLM so you feel how it works. (Module 09)
- **Neural network visualizer** — animated network that lights up as data passes through. (Module 04)
- **Logic gate explorer** — interactive introduction to binary logic. (Module 01)

---

## Design Direction

### Visual language

**Hand-drawn / illustrated.** Not corporate, not data-viz, not techy. Warm, human, slightly imperfect. Think: a beautifully designed science book meets a thoughtful editorial magazine. Every illustration should feel like it was made by a person.

Consistency matters more than polish. A coherent line weight, texture, and color palette across all illustrations will feel more intentional than highly detailed assets that vary in style.

### Modes

Full **dark mode and light mode** support. Base palette is near-black on near-white (or inverse) — no off-grays, no beige. Clean, high-contrast, typographic.

- Light: `#FAFAFA` background / `#0A0A0A` text
- Dark: `#0A0A0A` background / `#FAFAFA` text

### Accent color

**Single accent: coral/terracotta** (`#D85A30`). Used with restraint — highlights, interactive states, progress indicators, key moments. One strong color used sparingly is more distinctive than two competing accents.

A subtle color progression across modules is worth exploring: the accent shifts slightly cooler in the early history modules (grays dominate) and warms toward coral as the story reaches the present. Small detail, meaningful effect.

### Design reference

[thedot.space](https://www.thedot.space/) — to be documented further. Key qualities: *(add notes after reviewing)*

### Typography

To be finalized. Should feel editorial — likely a strong serif for headings paired with a clean sans-serif for body. Generous leading, generous whitespace. Nothing small.

### Illustration approach (practical)

Since hand-drawing from scratch isn't the plan:

1. **AI-generated illustration** (Midjourney or Ideogram) with a locked style prompt: consistent line weight, warm off-white paper feel, minimal color except the accent. Run all narrative/atmospheric illustrations through the same prompt for cohesion.
2. **Rough.js** for all interactive technical diagrams (neural networks, data flows, timelines, logic gates). Renders canvas/SVG in a sketchy hand-drawn style programmatically — no drawing required, just code. Keeps the aesthetic unified between static and interactive.

---

## Tech Stack

### Framework

**Next.js** — chosen for its excellent MDX support, large ecosystem, and compatibility with Claude Code (the primary dev tool). App Router.

### Styling

**Tailwind CSS** — fast, consistent, no runtime overhead.

### Animation

**Framer Motion** — handles entrance animations, slide transitions, and interactive visual states with a clean API. Pairs well with React.

### Content

**MDX** (via `@next/mdx` or `next-mdx-remote`) — modules written as MDX files. Prose stays readable. Interactive components drop in as JSX where needed.

### Interactive diagrams

**Rough.js** — sketchy/hand-drawn style rendering for technical diagrams. Keeps illustration aesthetic consistent across static and interactive content.

### Hosting

**Vercel** — free tier, zero config with Next.js, deploy on push.

### Platform

**Web (PWA)** — no native app. Target audience discovers this via links and shares; friction to access must be zero. A well-built PWA can be installed to a home screen if desired, with no app store gatekeeping.

---

## Name

*TBD.* Candidates under consideration:

- **Plainly** — explained plainly. Unpretentious, warm, signals tone immediately.
- **Actually** — conversational, slightly conspiratorial. "How AI actually works."
- **Untangled** — AI is knotted and confusing; this unravels it.
- **Thread** — follows the historical thread, connects ideas across time.
- **From Zero** — literal and honest. Starts at zero, together.
- **Kernel** — double meaning: computing core + seed/origin.
- **Trace** — tracing history, tracing how something works.

Criteria: short, warm, conversational, signals approachability immediately. Should feel like something a person would say, not a startup brand.

---

## What This Is, Ultimately

A linear narrative with depth, beautiful illustration, and interactive moments where understanding requires doing rather than reading. Closer to a beautifully designed book than a typical educational website. A public good — free, open, made with care — for a moment when understanding AI is becoming genuinely important for everyone.

---

*Last updated: April 2026*
