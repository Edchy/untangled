---
name: format-slides
description: >
  Scans a module's slide/text files and proposes three kinds of formatting improvements:
  (1) words or phrases that should be **bold** or *italic* to improve readability and
  emphasis, (2) em dashes (— or " - " used as a dash between words) that should be
  replaced with cleaner punctuation like commas, parentheses, or periods, and
  (3) dense text blocks that need breathing room — paragraph breaks, shorter sentences,
  or structural changes to improve overall legibility.

  Use this skill whenever the user asks to "format slides", "clean up a module",
  "fix em dashes", "improve emphasis in slides", "review formatting in a module",
  "make this more readable", "add breathing room", or anything along those lines.
  Even vague requests like "make the slides read better" or "go through module X"
  should trigger this skill.
---

# format-slides

Your job is to scan a module's slide content, identify three things that make text harder to read, and propose clean, specific fixes — without changing meaning.

## Step 1: Ask which module

Start by asking:

> "What module do you wanna format?"

Wait for the user's answer before doing anything else. They might give you:
- A folder path (e.g., `module-3/` or `~/course/week-2/`)
- A name you'll need to resolve (e.g., "the intro module" or "week 3")

If it's a name rather than a path, ask for clarification or look in the current working directory for a matching folder.

## Step 2: Discover the files

List all text-based files in the module directory. Focus on:
- `.md` — most common for slide content
- `.txt`
- `.html` / `.htm`
- `.mdx`

Skip images, fonts, config files, and anything binary. If there are many files (10+), briefly list them and confirm with the user before scanning all of them.

## Step 3: Scan for issues

Read each file and look for three kinds of issues:

### Issue A: Em dashes

Em dashes appear as `—` (the actual em dash character) or as ` - ` (a hyphen with spaces on both sides, used like a dash). These interrupt flow and can usually be replaced more cleanly.

Common patterns and what to do with them:

| Pattern | Example | Fix |
|---|---|---|
| Connecting clauses | "it works — just slowly" | comma: "it works, just slowly" |
| Introducing explanation | "the key idea — which is X" | comma or parentheses: "the key idea, which is X" |
| Abrupt pivot | "he agreed — then changed his mind" | period or semicolon: "he agreed. Then he changed his mind." |
| Adding context | "the result — over 90% accuracy" | parentheses: "the result (over 90% accuracy)" |

Choose the replacement that best preserves the intended rhythm and meaning. Don't just swap every em dash for a comma — think about what the sentence is actually doing.

### Issue B: Emphasis opportunities

Look for words and phrases that are carrying a lot of weight but aren't visually differentiated. Good candidates for **bold**:
- The central term or concept being defined or introduced on that slide
- A key action the learner must take
- A contrast ("NOT this — THIS")
- A warning, caveat, or "gotcha"

Good candidates for *italic*:
- Technical terms being introduced for the first time
- Titles of books, tools, frameworks, or external references
- A word being stressed for tone (e.g., "you *can* do it this way, but...")

Don't over-emphasize. A slide with 6 bolded phrases gains nothing. Aim for 1-2 per slide/section, and only where it genuinely helps a reader's eye land on the right thing.

### Issue C: Breathing room and legibility

Dense text is the enemy of slides. A wall of text forces the reader to do the work of finding structure — structure that should already be visible.

Look for:

**Paragraph walls** — three or more sentences stacked together with no break, no visual separation, no list. These should usually be split into shorter paragraphs or converted to a short list when the content is actually enumerable.

**Sentences that are doing too much** — a single sentence that contains three ideas, two clauses, and a parenthetical aside. These can often be cleanly split in two without losing anything.

**Transitions buried in dense copy** — "First... then... finally..." or "This means... therefore... which is why..." patterns that are trying to create structure through words alone. Suggest making that structure visual instead (numbered list, short paragraphs, a subheading).

**Missing whitespace between sections** — slides where distinct topics or steps run directly into each other with no visual break.

When you find these, suggest the restructured version. Show the new paragraph breaks or list structure clearly. The goal is that someone can skim the slide and understand its shape before they read a single word.

Calibrate by context. A detailed reference doc can handle more density than a teaching slide. If the content is clearly reference material (cheat sheets, API docs), flag dense blocks as lower priority.

## Step 4: Write a plan

Before proposing any changes, write a brief plan in the conversation:

```
## Format Plan for [module name]

### Files scanned
- file1.md
- file2.md

### Em dash fixes (N found)
Brief summary — e.g., "12 em dashes across 4 files, mostly connecting clauses"

### Emphasis additions (N found)
Brief summary — e.g., "Key terms on slides 2, 5, and 8 not highlighted"

### Legibility improvements (N found)
Brief summary — e.g., "3 paragraph walls that need breaking up, 2 run-on sentences"

Ready to show proposed changes?
```

Wait for the user to confirm before showing changes, or if the plan is small, just proceed and note that you're doing so.

## Step 5: Propose changes

For each file, show changes in a clear diff-style format. Group by file.

**Format:**

```
### file1.md

**Em dash fix — line 14:**
Before: "the model learns — it adjusts weights based on error"
After:  "the model learns, adjusting weights based on error"

**Emphasis — line 22:**
Before: "This is called backpropagation"
After:  "This is called **backpropagation**"

**Legibility — lines 31–34 (paragraph wall):**
Before:
"CSS works by selecting elements and applying rules to them. The rule has two parts: the property and the value. Properties describe what you want to change, like color or font-size. Values describe how you want to change it."

After:
"CSS works by selecting elements and applying rules to them. Each rule has two parts:

- **Property** — what you want to change (e.g., `color`, `font-size`)
- **Value** — how you want to change it"
```

For legibility issues, show the full before/after block since multiple lines are involved. Keep the restructured version tight — don't pad it, just make the shape clearer.

Only show lines that change. Don't reprint entire files.

After showing all proposed changes, ask:

> "Want me to apply these? I can do all of them, or just pick a category — em dash fixes, emphasis, or legibility."

## Step 6: Apply if confirmed

If the user confirms (all or a subset), apply the changes by editing the files directly. Then summarize what was done:

```
Done. Applied to 3 files:
- 12 em dash replacements
- 5 emphasis additions
- 3 legibility restructures
```

## Guiding principles

**Preserve voice.** These are the user's words. Don't rephrase for style — only fix the two specific issues above.

**Less is more for emphasis.** If you're unsure whether something needs emphasis, leave it. Over-bolding is worse than under-bolding.

**Be specific, not mechanical.** Don't replace every em dash with a comma. Think about what each sentence is doing and pick the punctuation that fits. Some em dashes are fine — the ones to fix are the ones that make a sentence feel choppy or unclear.

**Structure reveals meaning.** When you break up a paragraph or convert a sentence run to a list, you're not just adding whitespace — you're making the author's logic visible. The restructured version should feel like something the author would nod at, not something that changes their point.

**Explain your reasoning briefly.** When a fix isn't obvious (e.g., why you chose a period over a comma, or why a paragraph wall became a list instead of two paragraphs), add a one-line note in parentheses.
