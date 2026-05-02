---
name: untangled-illustrations
description: Use when creating, editing, reviewing, or polishing Untangled illustrations, especially Rough.js, hand-drawn SVG, narrative diagrams, slide visuals, switch/circuit/wire drawings, abstraction visuals, or requests mentioning "illustration", "illustrations", "rough.js", "Rough.js", "sketch", "drawing", "diagram", or "visual".
---

# Untangled Illustrations

Use this skill for illustration work in Untangled.

## Required Reference

Before changing or creating illustrations, read:

- `docs/illustration.md`

Use it as the source of truth for Rough.js defaults, color, texture, composition, interaction, and accessibility.

## Workflow

1. Identify the slide's one visual job.
2. Reuse an existing component when the same object appears again.
3. Use `var(--foreground)`, `var(--background)`, and `var(--accent)` only.
4. Keep Rough.js hand-drawn qualities restrained and stable.
5. Make text readability non-negotiable when visuals overflow behind content.
6. Verify with `npm run lint`, `./node_modules/.bin/tsc --noEmit`, and `git diff --check` when code changes.

## Defaults

- Prefer repo-native SVG, canvas, or Rough.js over generated bitmap art for course diagrams.
- Use generated images only when a bitmap subject is truly needed.
- Do not add decorative illustration without an explanatory role.
- Do not create a second variant of an existing object if the existing component can be reused.
