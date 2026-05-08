---
name: new-module
description: Use when the user wants to scaffold a new module in Untangled. Reads docs/ and content/ for context, plans chapter structure, then generates all MDX files with correct nav wiring. Triggers on "new module", "scaffold module", "build module", or similar.
---

# New Module Scaffold

Scaffold a complete module from scratch. All 10 modules are pre-registered in `src/lib/content.ts` — you're creating the content directory and MDX files, not registering anything new.

---

## Step 1: Understand the module

Ask the user which module they want to scaffold (e.g. "03: The Long Winter").

Then, before planning anything, **read the following for context**:

- `docs/PRODUCT.md`
- `docs/PRD.md`
- `docs/project-brief.md`
- `content/01-the-machine/` — full file tree
- `content/02-can-machines-think/` — full file tree
- Read 2–3 representative slides from existing modules: a cover, a content slide, a final slide

This gives you the module's subject matter, tone, audience, and established content patterns.

---

## Step 2: Plan chapter structure

Based on what should be in this module (use the module title, theme from `content.ts`, and the docs for guidance), plan:

- How many chapters (concepts) this module needs
- The title of each chapter
- Roughly how many content slides each chapter needs
- Slide titles for each chapter (you decide these — make them narrative and specific, not generic)

Present this plan to the user and confirm before generating any files. Keep it concise — a numbered list of chapters with their slide titles is enough.

---

## Step 3: Generate all files

Once approved, generate everything. Structure:

```
content/<moduleSlug>/
  <NN>-<chapter-slug>/
    00-cover.mdx
    01-<slide>.mdx
    02-<slide>.mdx
    ...
    NN-before-you-go.mdx   ← quiz gate
    NN-q-<word>.mdx        ← question 1
    NN-q-<word>.mdx        ← question 2
    NN-q-<word>.mdx        ← question 3 (is_last_question: true)
    NN-response.mdx
    NN-final.mdx           ← last slide of chapter
```

Every chapter follows this exact structure. No exceptions.

---

## Frontmatter reference

### Module and concept values

The `module` and `concept` frontmatter fields are the slug **without** the numeric prefix:

- `moduleSlug = 03-the-long-winter` → `module: the-long-winter`
- `conceptSlug = 01-the-promise-and-the-crash` → `concept: the-promise-and-the-crash`

### Cover slide (`00-cover.mdx`)

```
---
title: "<Chapter Title>"
module: <module-without-prefix>
concept: <concept-without-prefix>
order: 0
type: cover
cols: 1
hide_title: true
---

<Four short paragraphs. Tone: warm, curious, slightly literary. Tease the chapter's key ideas without explaining them. This is the reader's first impression of the chapter — set the mood.>
```

Cover is text-only. No `component:`. No illustration.

### Content slides

```
---
title: "<Slide Title>"
module: <module-without-prefix>
concept: <concept-without-prefix>
order: <N>
type: text
cols: 1
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

### Quiz gate (`NN-before-you-go.mdx`)

```
---
title: "Reinforce your understanding"
module: <module>
concept: <concept>
order: <N>
type: interactive
component: quiz-gate
flip_cols: true
hide_title: true
hide_nav: true
skip_href: /<moduleSlug>/<conceptSlug>/NN-final
---
```

`skip_href` goes to the **final slide** of this chapter (skips the whole quiz).

### Question slides — Q1 and Q2

`skip_href` on Q1 points to Q2. `skip_href` on Q2 points to Q3. Only Q3's `skip_href` points to the response slide.

```
---
title: "Question: <short label>"
module: <module>
concept: <concept>
order: <N>
type: interactive
component: free-form-question
question_id: <kebab-id>
cols: 1
hide_title: true
hide_nav: true
back_href: /<moduleSlug>/<conceptSlug>/<previous-slide-slug>
skip_href: /<moduleSlug>/<conceptSlug>/<next-question-slug>
---

<Question text. One or two sentences. What does the student need to explain?>
```

### Question slide — Q3 (last)

Same as Q1/Q2 but add `is_last_question: true`:

```
---
title: "Question: <short label>"
module: <module>
concept: <concept>
order: <N>
type: interactive
component: free-form-question
question_id: <kebab-id>
is_last_question: true
cols: 1
hide_title: true
hide_nav: true
back_href: /<moduleSlug>/<conceptSlug>/NN-q-<q2-first-word>
skip_href: /<moduleSlug>/<conceptSlug>/NN-response
---

<Question text.>
```

### Response slide (`NN-response.mdx`)

```
---
title: "Quiz: answer"
module: <module>
concept: <concept>
order: <N>
type: interactive
component: question-response
cols: 1
hide_title: true
hide_nav: true
back_href: /<moduleSlug>/<conceptSlug>/NN-before-you-go
redirect_href: /<moduleSlug>/<conceptSlug>/NN-q-<q1-first-word>
---
```

`redirect_href` → Q1. If the user lands on response with no submission in progress, they go back to Q1.

### Final slide (`NN-final.mdx`)

```
---
title: "<Title>"
module: <module>
concept: <concept>
order: <N>
type: text
cols: 1
hide_title: true
back_href: /<moduleSlug>/<conceptSlug>/NN-before-you-go
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

Lorem ipsum dolor sit amet.
```

`back_href` → quiz gate (not response).

The layout auto-detects this as the last slide of the concept and renders `ChapterEndNav`:
- If there's a next chapter in the same module → "Next chapter" button
- If this is the last chapter in the module → "Start module [NN]" button (uses the next module's number from `modules` array in `content.ts`)
- If this is the very last module → "Journey complete" state

No extra wiring needed for this. It's automatic.

---

## Quiz wiring summary

```
[before-you-go]  →(skip_href)→  [final]
       ↓ (start button)
[Q1]  →(skip_href)→  [Q2]        ← skip goes to NEXT QUESTION, not response
       ↓
[Q2]  →(skip_href)→  [Q3]        ← skip goes to NEXT QUESTION, not response
       ↓
[Q3, is_last_question: true]  →(skip_href)→  [response]
       ↓ (submit)
[response]  →(redirect_href if idle)→  [Q1]
       ↓ (next)
[final]  ←(back_href)→  [before-you-go]
```

Quiz slides (`free-form-question`, `question-response`) all have `hide_nav: true` — they are grayed out and unreachable from the sidebar. The only entry into the quiz is the start button on the gate. This logic is already in the app; you just need the correct frontmatter.

---

## Step 4: Add quiz rubrics

After generating all files, add entries to `src/lib/quiz-rubrics.ts`:

```ts
"<full-conceptSlug-with-prefix>": [
  { id: "<q1-id>", question: "<question text>", expected: "<what a correct mental model looks like>" },
  { id: "<q2-id>", question: "<question text>", expected: "<expected answer>" },
  { id: "<q3-id>", question: "<question text>", expected: "<expected answer>" },
],
```

The key must be the full `conceptSlug` **with** the numeric prefix (e.g. `"01-the-promise-and-the-crash"`).

For now, use placeholder expected answers (`"TODO"`) — the user will fill these in when they write real content.

---

## Step 5: Verify

After generating all files:

1. Every chapter has exactly one `00-cover.mdx` with `order: 0` and `type: cover`.
2. Content slides start at `order: 1`.
3. Quiz slides (`free-form-question`, `question-response`) all have `hide_nav: true`.
4. Quiz gate (`quiz-gate`) does NOT have `hide_nav: true` — it's the entry point.
5. Q3 has `is_last_question: true`. Q1 and Q2 do not.
6. `skip_href` on gate → final slide of that chapter.
7. `skip_href` on each question → response slide.
8. `redirect_href` on response → Q1.
9. `back_href` on final → quiz gate.
10. Rubric entries added to `quiz-rubrics.ts` for every chapter.
11. Run `npx tsc --noEmit` to confirm no type errors.
