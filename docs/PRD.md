# Untangled PRD

## Problem

Most AI explainers are either too shallow or too technical. Curious adults with no technical background need a clear, warm, trustworthy path for understanding what AI is, where it came from, how large language models work, and what questions are worth asking.

## Audience

People who know nothing about AI: curious, intelligent, and possibly anxious about it. The experience assumes no technical background and explains necessary terms immediately in plain language.

## Product

Untangled is a free, nonprofit, interactive learning experience that demystifies AI through a chronological story, illustrated slides, and hands-on demos.

## Principles

- One aha per unit
- Byte-sized slides
- No unexplained jargon
- Warm, not clinical
- Built to last as a living reference
- Linear progression with completed modules available for revisit
- No social features, ads, paywalls, or leaderboards

## V1 Scope

- Public web experience built with Next.js App Router
- MDX-based slide content architecture
- Ten-module chronological learning path
- Light and dark mode support
- Tailwind-first visual system
- Module and slide navigation
- Progress state for completed modules
- Initial interactive moments:
  - Logic gate explorer
  - Neural network visualizer
  - Live tokenizer
  - Predict-the-next-word mini-game

## Out of Scope For V1

- Accounts
- Community features
- Paid content
- Native mobile apps
- Authoring CMS
- Advanced analytics beyond basic privacy-conscious usage signals

## Content Architecture

Each slide maps to one MDX file. Frontmatter includes:

```mdx
---
title: "What is a computer, really?"
module: the-machine
concept: what-is-a-computer
order: 1
type: text
sources:
  - "https://example.com/source-used-on-this-slide"
---
```

The `order` field drives progression rather than filenames, so slides can be inserted without renaming existing files.
The optional `sources` field stores source URLs close to the slide they support.

## User Stories

- As a first-time learner, I want to start at the beginning so I can understand AI without prior knowledge.
- As a returning learner, I want to revisit completed modules so the site remains useful as a reference.
- As a cautious learner, I want clear explanations of limits, hallucinations, and bias so I can think about AI realistically.
- As a visual learner, I want interactive demos so abstract concepts become concrete.

## Success Criteria

- A non-technical learner can explain the basic idea of how an LLM works after completing the core path.
- Every slide has one clear job and one memorable aha.
- Interactive demos clarify the concept rather than distract from it.
- The experience feels warm, editorial, and human rather than corporate or course-like.
