---
name: new-chapter
description: Use when the user wants to create a new module or chapter in Untangled. Scaffolds the full MDX slide structure including content slides, quiz (gate → questions → response), and final slide with correct nav wiring. Triggers on "new module", "new chapter", "create chapter", "add chapter", or similar.
---

# New Chapter Scaffold

Use this skill to scaffold a new Untangled chapter from scratch. It gathers the necessary information, then generates all MDX files and wires everything correctly — quiz flow, nav redirects, sidebar locking, rubric entry.

## Step 1: Gather information

Ask the user for the following. Collect everything before generating any files.

1. **Module** — is this a new module or does it go inside an existing one? If new, what is the module title (e.g. "What is AI")? If existing, which module?
2. **Chapter title** — e.g. "Neural Networks"
3. **Cover copy** — four short paragraphs that set the tone and lightly tease the chapter beats in a 2-by-2 text grid. If the user does not provide it, derive it from the chapter title and slide list.
4. **Slide titles** — list of content slide titles (before the quiz). User can give as many as they want.
5. **Quiz questions** — exactly 3 questions for this chapter. For each question, ask for:
   - The question text (what the student sees)
   - The expected answer (used as the rubric for the AI evaluator — a clear explanation of what a correct mental model looks like)

Do not proceed to generation until you have all of the above.

## Step 2: Derive slugs and order numbers

From the user's input, derive:

- `moduleSlug` — kebab-case of the module title, prefixed with the next available two-digit number. Check `content/` to find the next number. E.g. `03-can-machines-think`.
- `conceptSlug` — kebab-case of the chapter title, prefixed with the next available two-digit number within that module. E.g. `01-neural-networks`.
- The cover slide always gets `order: 0`.
- Content slides get `order` values starting at 1.
- Quiz slides follow immediately after the last content slide:
  - Quiz gate: last content order + 1
  - Q1: last content order + 2
  - Q2: last content order + 3
  - Q3 (last): last content order + 4
  - Response: last content order + 5
  - Final slide: last content order + 6

## Step 3: Determine file names

Cover slide: `00-cover.mdx`.

Content slides: `NN-kebab-title.mdx` where NN is a two-digit zero-padded number matching the order.

Quiz and final slides use these fixed names (prefix with the next available number):
- `NN-before-you-go.mdx` — quiz gate
- `NN-q-[first-word-of-q1].mdx` — question 1
- `NN-q-[first-word-of-q2].mdx` — question 2
- `NN-q-[first-word-of-q3].mdx` — question 3
- `NN-response.mdx` — AI response
- `NN-final.mdx` — final slide

All files live flat in `content/<moduleSlug>/<conceptSlug>/`.

## Step 4: Generate MDX files

### Cover slide

```
---
title: "<chapter title>"
module: <module-name-without-number-prefix, kebab>
concept: <concept-name-without-number-prefix, kebab>
order: 0
type: cover
cols: 1
hide_title: true
---

<four short cover paragraphs>
```

The cover is additive: do not replace or rewrite the first content slide. Covers are text-only book title pages with a large Roman numeral chapter marker; do not add an illustration or `component:` unless the user explicitly asks for one.

### Content slides (each one)

```
---
title: "<slide title>"
module: <module-name-without-number-prefix, kebab>
concept: <concept-name-without-number-prefix, kebab>
order: <N>
type: text
cols: 1
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

The `module` and `concept` frontmatter values are the slug **without** the numeric prefix. E.g. `moduleSlug = 03-can-machines-think` → `module: can-machines-think`.

### Quiz gate

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
skip_href: /<moduleSlug>/<conceptSlug>/<response-slug>
---
```

Note: `skip_href` on the gate goes to the **final slide** (skips quiz entirely), not the response.

Wait — correct behaviour: `skip_href` on the quiz gate goes to the **final slide** slug, bypassing the whole quiz.

### Question slides (Q1, Q2)

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
skip_href: /<moduleSlug>/<conceptSlug>/<response-slug>
---

<question text as markdown>
```

### Question slide (Q3 — last)

Same as above but add `is_last_question: true`:

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
back_href: /<moduleSlug>/<conceptSlug>/<q2-slug>
skip_href: /<moduleSlug>/<conceptSlug>/<response-slug>
---

<question text as markdown>
```

### Response slide

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
back_href: /<moduleSlug>/<conceptSlug>/<quiz-gate-slug>
redirect_href: /<moduleSlug>/<conceptSlug>/<q1-slug>
---
```

`redirect_href` points to Q1 — if a user lands on the response slide with no submission in progress (idle state), they get sent back to the start of the questions.

### Final slide

```
---
title: "That's a wrap"
module: <module>
concept: <concept>
order: <N>
type: text
cols: 1
hide_title: true
back_href: /<moduleSlug>/<conceptSlug>/<quiz-gate-slug>
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
```

`back_href` on the final slide goes to the **quiz gate**, not the response.

The `ChapterEndNav` (Back / Home / Next chapter / Share) appears automatically on this slide because the layout detects it as the last slide of the concept. No extra wiring needed.

## Step 5: Add rubric to quiz-rubrics.ts

Open `src/lib/quiz-rubrics.ts` and add a new entry to `QUIZ_RUBRICS`:

```ts
"<concept-slug-without-number-prefix>": [
  {
    id: "<kebab-id-q1>",
    question: "<question text>",
    expected: "<expected answer>",
  },
  {
    id: "<kebab-id-q2>",
    question: "<question text>",
    expected: "<expected answer>",
  },
  {
    id: "<kebab-id-q3>",
    question: "<question text>",
    expected: "<expected answer>",
  },
],
```

The key must be the full `conceptSlug` **including** the numeric prefix (e.g. `"02-neural-networks"`), because that is exactly what the URL param contains and what `chapter-answers-context.tsx` sends to `/api/evaluate`.

## Step 6: Add module to content.ts (if new module)

If this is a new module, add an entry to the `modules` array in `src/lib/content.ts`:

```ts
{ slug: "<moduleSlug>", number: "<NN>", title: "<NN>: <Module Title>", theme: "<one-line description of what the module covers>", accent: "#D85A30" },
```

Pick a reasonable accent color that fits the existing gradient progression in the file.

## Step 7: Verify

After generating all files, confirm:

1. The chapter has exactly one `00-cover.mdx` with `order: 0` and `type: cover`.
2. The former first content slide is still present and still has `order: 1`.
3. Every quiz question slide has `hide_nav: true` and `component: free-form-question` or `component: question-response` — these are automatically grayed out and unclickable in the sidebar.
4. The quiz gate (`component: quiz-gate`) does **not** get locked — it is the entry point.
5. `back_href` on the final slide points to the quiz gate.
6. `redirect_href` on the response slide points to Q1.
7. `skip_href` on the quiz gate points to the final slide.
8. `skip_href` on each question points to the response slide.
9. The rubric key in `quiz-rubrics.ts` matches the full concept slug including the numeric prefix.
10. Run `npx tsc --noEmit` to confirm no type errors.

## Wiring summary (quick reference)

```
[cover slide]
       ↓ next
[first content slide]
       ↓
[last content slide]
       ↓ next
[quiz gate]  →(skip)→  [final slide]
       ↓ start (nextHref)
[Q1]  →(skip)→  [response]
       ↓
[Q2]  →(skip)→  [response]
       ↓
[Q3, is_last_question]  →(skip)→  [response]
       ↓ submit
[response]  →(redirect if idle)→  [Q1]
       ↓ next
[final slide]  ← back_href on final points here → [quiz gate]
```
