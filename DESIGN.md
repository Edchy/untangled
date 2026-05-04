---
name: Untangled
description: A free, illustrated narrative that builds a genuine mental model of AI from the first machines to honest questions about what it can and cannot do.
sourceOfTruth:
  code: "src/app/globals.css"
  guidance: "DESIGN.md"
  enforcement: "npm run design:check"
---

# Untangled Design System

Untangled is a printed lecture on the web: rigorous, warm, sparse, and carefully paced. The system exists to make every slide feel like the same book, even when different agents build pieces of it.

## Source Of Truth

`src/app/globals.css` owns all design tokens. Change tokens there first. Components must consume token-backed Tailwind utilities rather than hardcoded values.

Core token families:

- Color: `--ds-color-background`, `--ds-color-foreground`, `--ds-color-accent`, `--ds-color-muted`
- Typography: `--ds-text-*`, `--ds-leading-*`, `--ds-tracking-label`
- Spacing: `--ds-space-*`, `--ds-space-prose-block`, `--ds-space-heading-after`
- Radius: `--ds-radius-control`, `--ds-radius-surface`, `--ds-radius-pill`
- Motion: `--ds-duration-*`, `--ds-ease-*`

Tailwind mappings live in `@theme inline`. Examples:

- `bg-background`, `text-foreground`, `text-accent`
- `text-body`, `text-headline`, `text-title`, `text-label`
- `rounded-control`, `rounded-surface`, `rounded-pill`
- `p-ds-4`, `gap-ds-6`, `mt-ds-10`
- `mt-prose-block` for paragraph block rhythm
- `mb-heading-after` for slide heading-to-body spacing

If changing `--ds-radius-control` from `0px` to `8px` does not update every standard button/control, that control is outside the system and should be refactored.

## Visual Rules

- One accent only: ember, `--ds-color-accent`. Use it for active states, hover states, selected markers, and rare instructional emphasis.
- Neutral variation comes from `foreground/N` and `background/N` opacity, not new colors.
- No shadows in UI components. Use borders, opacity, and layout for hierarchy.
- Corners come from radius tokens only. Never use raw `rounded-*` values in app UI.
- Body prose is `text-body` with `--ds-leading-body`, capped near `60ch`.
- Headings use the serif font. Interface controls, labels, buttons, and navigation use sans.
- Slide headings use `mb-heading-after`; this must be larger than the paragraph block gap so titles open the section instead of blending into the prose.
- Cards are rare. Module entries are ruled list items, not floating panels.
- Do not create a new UI pattern if a primitive already exists.

## Type And Rhythm

Fluid type follows the Utopia setup `360px, 18px, 1.2` to `1240px, 20px, 1.25`. The generated steps live in `globals.css` as `--ds-step--2` through `--ds-step-5`.

Semantic type tokens map onto those steps:

- `--ds-text-label`: `--ds-step--2`
- `--ds-text-body`: `--ds-step-0`
- `--ds-text-title`: `--ds-step-2`
- `--ds-text-headline`: `--ds-step-3`
- `--ds-text-display`: `--ds-step-5`

Vertical rhythm follows the same baseline as body type. This keeps the page calm because line-height, paragraph gaps, heading gaps, and layout spacing repeat related values instead of arbitrary ones.

- Paragraph blocks use `mt-prose-block`, backed by `--ds-space-prose-block`.
- Slide headings use `mb-heading-after`, backed by `--ds-space-heading-after`.
- `mb-heading-after` must stay larger than `mt-prose-block`.
- New spacing should use `--ds-space-*` tokens or a semantic token based on them.

## Component Primitives

Use these before writing custom UI:

- `Button`: standard button element. Variants: `primary`, `ghost`, `quiet`, `toggle`, `icon`. Sizes: `sm`, `md`, `lg`.
- `LinkButton`: same visual system as `Button`, for Next links.
- `Text`: text variants `body`, `muted`, `label`, `caption`.
- `Heading`: heading variants `display`, `headline`, `title`.
- `Surface`: flat bordered panel. No shadow, no decorative background.
- `Prose`: shared prose rhythm for slide/body copy.
- `SlideShell` and `SlideColumns`: shared slide layout wrappers.

When a control appears twice, it belongs in a primitive or a small composed component. Do not copy a Tailwind class string from one file to another.

## Exceptions

Illustrations may use bespoke SVG, canvas, Rough.js paths, and local drawing math. They should still use `var(--foreground)`, `var(--background)`, and `var(--accent)` for color. Any reusable control inside an interactive illustration should use `Button` or another primitive.

The sticky site header may use backdrop blur. No other UI should introduce blur as decoration.

## Agent Rules

Before UI work:

1. Read `DESIGN.md`.
2. Check existing primitives in `src/components/ui`.
3. Use tokens from `src/app/globals.css`.
4. Add or extend a primitive when a pattern will be reused.
5. Run `npm run design:check` with lint and typecheck before claiming done.

Do not add:

- `shadow-*` or `boxShadow` in app UI
- raw `rounded-*` values outside token utilities
- hardcoded hex/OKLCH colors outside token files or illustration internals
- one-off button/link/card styling when a primitive exists
