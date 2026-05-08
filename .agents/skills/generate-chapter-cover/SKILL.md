---
name: generate-chapter-cover
description: Generate chapter cover text for the Untangled AI learning platform. Use this skill whenever writing, drafting, or rewriting the cover/intro text that appears at the start of a chapter — the narrative hook that draws the reader in. Triggers on "/generate-chapter-cover", "write chapter cover", "generate cover text for chapter", "write the intro for chapter", "write a chapter summary", "rewrite this chapter cover", or any request to produce the short narrative text that opens a chapter or module slide. Use this skill even when the user just shares some rough text and asks to improve it — if it's Untangled chapter cover text, this skill applies.
---

# generate-chapter-cover

Generates the cover text that opens each chapter in Untangled.

This text is not a syllabus. It is not a list of what the reader will learn. It is the opening of a well-crafted nonfiction book — philosophical, warm, unhurried. The kind of writing that makes someone feel like they are in good hands before a single concept has been explained.

## What makes this text work

Each chapter cover has one job: make the reader feel that what follows is worth understanding.

It does that by starting somewhere universal — a simple truth about how things work, how understanding works, how complexity is always hiding something simpler underneath — and then connecting that truth to the specific thing this chapter is about. The punchline is never fully given. The chapter delivers it.

Four qualities to keep in mind at all times:

**Philosophical.** Open with a bigger idea before narrowing to the chapter's subject. The best covers make the reader think about understanding itself, not just about the topic at hand. Think: what is it about this chapter's subject that says something true about how complex things work?

**Warmth.** This is a person talking to another person. Not a platform, not a textbook. If it sounds like something you would read on a certification syllabus, rewrite it.

**Simplicity.** No jargon. If a technical term must appear, it earns its place through context. The reader knows nothing about AI. Treat that as a feature, not a constraint. Never use "course" to describe this experience — it is a journey, not a curriculum.

**Length.** 5–7 paragraphs. Around 200–250 words. Each paragraph short — 1 to 3 sentences. Generous whitespace. The length earns the philosophical opening room to breathe before arriving at the specific.

**No em dashes.** Never use em dashes. Use a period, a colon, or restructure the sentence instead.

## Structure

This is loose — follow the material, not the template. But a strong cover usually moves through these phases:

**The universal truth.** Open with something that feels bigger than the chapter. A simple observation about complexity, foundations, understanding. Something the reader already suspects is true, said in a way that makes them feel it freshly.

**The analogy.** Ground that truth in something physical and familiar. A building. A language. Something the reader has a relationship with. Use it to make the abstract idea concrete. Keep it short — two or three sentences. Don't over-explain it.

**The pivot to understanding.** Connect the analogy to how understanding works. To truly understand something complex, you have to strip it down to its core and build it back up again, piece by piece. Name that process explicitly.

**The turn to the subject.** One clear line that transitions from the philosophical opening into what this chapter is actually about. Direct. No hedging.

**The substance.** What this chapter covers, told as a story rather than a list. What the reader will watch happen. What ideas connect to what other ideas. Build toward the aha without giving it away.

**The closing line.** End with something earned. The reader should feel a quiet sense of anticipation. The closing line provided by the user should be used if given — place it exactly as written.

## How to generate cover text

### Step 1 — Read the project brief

Find `project-brief.md` in the current workspace. Read it. Focus on:
- Core Principles (especially "One aha per unit" and "Warm, not clinical")
- Audience (intelligent, curious, zero technical background)
- The module table — understand where this chapter sits in the larger arc

### Step 2 — Find the chapter files

Look for files in the workspace that describe the target chapter:
- Spec files: `*-spec.md` or `[module]-[chapter]-spec.md`
- Plan files: `ch[N]-*.md` or `*-plan.md`

If the chapter is not specified, ask the user which one before proceeding.

### Step 3 — Extract the single aha

From the spec, find the "Teaching arc" or equivalent section. Answer this question: what is the one thing this chapter exists to make the reader understand or feel?

That aha is the spine of the cover text. Everything else is setup.

### Step 4 — Write the cover text

Start with the bigger idea, not the chapter topic. Ask: what does this chapter's subject reveal about how complex things work? Start there. Then work inward toward the specific.

After writing, read it aloud. If it sounds like a brochure, rewrite it. If it sounds like a person who finds this genuinely fascinating, you are close.

## Reference example

This is the Module 01 cover, written and refined by the user. Use it as the primary style reference for all future covers.

---

Every complex thing is built on something simple.

A skyscraper starts underground. Before a single floor rises above the street, the foundation is poured. Concrete and steel that no one will ever see, buried before anything else begins. Unglamorous. Essential. Everything above it depends on it being right.

Understanding something complex works the same way. You can live with it, use it, navigate it. And never really know it. To truly understand something, you have to tear it down to its naked core. And then build it back up again, piece by piece, until you can see exactly how each part depends on the one beneath it.

To really understand artificial intelligence, we have to start at the very beginning.

Not with algorithms, not with data, not with the word "neural." With the actual physical thing that makes all of it possible. The machine underneath the machine.

A computer, at its most fundamental level, is made of billions of tiny components that each do exactly one thing: they are either on, or off. Nothing in between. And from that one idea, combined and arranged in the right ways, billions of times over, comes everything you have ever done on a screen. Every calculation. Every word. Every image. Every decision a program has ever made.

This module is about that foundation. How something so simple becomes something so powerful. How on and off becomes arithmetic, and arithmetic becomes memory, and memory becomes language, and language becomes something that feels, sometimes, almost like thought.

Once you see this foundation, everything built on top of it will start to make a little more sense.

---

Note what makes this work: it opens on a universal truth (complex things are built on simple things), grounds it in a physical analogy (a skyscraper), applies it to the process of understanding (tear down, rebuild), then transitions cleanly into the specific subject. No em dashes. Short paragraphs. The chain of ideas in the penultimate paragraph (on/off becomes arithmetic becomes memory becomes language becomes thought) does the work of a table of contents without feeling like one.

## Output format

Return the cover text as plain prose. No headers, no bullet points, no markdown formatting. Paragraphs separated by blank lines. This text goes directly onto the chapter cover slide.

After the cover text, add one line prefixed with "Central aha:" that names the idea the text is building toward. This is for the user to verify you understood the chapter correctly and will not appear in the final slide.
