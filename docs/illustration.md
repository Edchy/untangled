# Untangled Illustration Guidelines

These rules keep explanatory illustrations coherent across Untangled, especially when using Rough.js.

## Purpose

Illustrations explain. They are not decoration.

Each visual should make one idea easier to understand: hidden complexity, layers, switching, flow, scale, memory, attention, or transformation. If a mark does not support the idea, remove it.

## Visual Character

Untangled illustrations should feel like careful lecture notes in a printed book:

- restrained, not cute
- mechanical, but warm
- hand-drawn, but not messy
- sparse at first glance, detailed where the concept needs detail

Use Rough.js to give objects a human, explanatory quality. Avoid sketchiness for its own sake.

## Rough.js Defaults

Use these as the starting point for new Rough.js drawings.

```ts
export const roughStyle = {
  primaryStroke: {
    stroke: "var(--foreground)",
    strokeWidth: 1.5,
    roughness: 0.85,
    bowing: 0.45,
  },
  detailStroke: {
    stroke: "var(--foreground)",
    strokeWidth: 1.2,
    roughness: 0.75,
    bowing: 0.35,
  },
  quietStroke: {
    stroke: "var(--foreground)",
    strokeWidth: 1.2,
    roughness: 0.75,
    bowing: 0.35,
  },
  activeStroke: {
    stroke: "var(--accent)",
    strokeWidth: 2.2,
    roughness: 0.8,
    bowing: 0.4,
  },
  quietFill: {
    fillStyle: "hachure",
    hachureGap: 16,
    hachureAngle: -35,
  },
} as const;
```

## Color

- Use `var(--foreground)` for structure.
- Use `var(--background)` for filled surfaces.
- Use `var(--accent)` only for the active path, selected state, or the single thing the learner should notice.
- Keep supporting wires, construction lines, and hidden systems at low opacity.
- Do not introduce new accent colors.

Recommended opacity ranges:

- main object: `1`
- secondary object: `0.36` to `0.6`
- hidden system: `0.12` to `0.3`
- construction texture: `0.04` to `0.1`
- active path: `0.65` to `0.9`

## Stroke And Texture

- Keep most strokes between `1.2` and `2.2`.
- Use `2.4` to `3` only for a deliberate active line or tactile control.
- Use hachure sparingly for surfaces, cutaways, and hidden areas.
- Prefer stable seeds per illustration. Drawings should not jitter between renders unless motion is the concept.
- Avoid dense crosshatching behind body text.

## Composition

- One visual idea per slide.
- The simple interface should be visually dominant; hidden complexity can spread around it.
- Complexity may overflow the normal illustration column if it is decorative and does not change layout.
- Text must stay readable. If illustration crosses behind text, lower opacity or add a subtle text veil.
- Do not place illustrations in decorative cards.

## Interaction

- Interactive illustrations need a real conceptual payoff.
- Reuse existing interactive components when the same object appears again.
- Do not create a second, slightly different version of an existing object unless the concept requires it.
- Audio is allowed only for tactile direct manipulation, such as the light switch.

## Accessibility

- Decorative explanatory backgrounds should use `aria-hidden`.
- Interactive visuals need accurate labels and state, for example `aria-pressed`.
- Do not rely on color alone. The active path should also differ by weight, placement, or motion.
- Honor reduced-motion preferences when adding animation.

## Common Patterns

### Interface Over Hidden System

Use for abstractions. Show a simple object or control in front, with lower-opacity wiring, layers, or mechanisms behind it.

### Active Path

Use for cause and effect. One `var(--accent)` path traces the important flow through otherwise quiet complexity.

### Cutaway

Use for “underneath” moments. Keep the outer object recognizable, then expose only the parts that matter.

### Scale Field

Use for “many tiny things” moments. Repeat simple marks with low opacity, then highlight one or two examples.

## Before Shipping

Check:

- The visual has one clear job.
- It matches the existing switch and iceberg roughness.
- `var(--accent)` is rare and meaningful.
- Text is readable on desktop and mobile.
- The illustration does not resize the slide columns unexpectedly.
- Lint and typecheck pass.
