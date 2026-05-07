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

Rough.js runs inside Canvas 2D — use the canvas-safe tokens, not CSS variables directly (canvas cannot parse `oklch`).

```ts
// Read once per draw call, after theme is resolved:
const ink    = getComputedStyle(document.documentElement).getPropertyValue("--foreground-canvas").trim();
const paper  = getComputedStyle(document.documentElement).getPropertyValue("--background-canvas").trim();
const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent-canvas").trim();

export const roughStyle = {
  primaryStroke: { stroke: ink,    strokeWidth: 1.5, roughness: 0.85, bowing: 0.45 },
  detailStroke:  { stroke: ink,    strokeWidth: 1.2, roughness: 0.75, bowing: 0.35 },
  quietStroke:   { stroke: ink,    strokeWidth: 1.2, roughness: 0.75, bowing: 0.35 },
  activeStroke:  { stroke: accent, strokeWidth: 2.2, roughness: 0.8,  bowing: 0.4  },
  quietFill:     { fillStyle: "hachure", hachureGap: 16, hachureAngle: -35 },
} as const;
```

## Color

- Use `var(--foreground)` for structure in SVG. In Canvas 2D, use `var(--foreground-canvas)` — it is always a hex value the browser can parse.
- Use `var(--background)` for filled surfaces in SVG. In Canvas 2D, use `var(--background-canvas)`.
- Use `var(--accent)` in SVG, `var(--accent-canvas)` in Canvas 2D — never hardcode a hex accent color.
- Keep supporting wires, construction lines, and hidden systems at low opacity.
- Do not introduce new colors outside the approved palette below.

### Approved illustration palette

These tokens are always available. Use `color-mix()` to apply opacity in SVG, or read the token via `getComputedStyle` and apply `globalAlpha` in Canvas 2D.

| Token | Use |
|---|---|
| `var(--accent-canvas)` | Active path, selected state, the one thing to notice (Canvas 2D) |
| `var(--accent)` | Same, but in SVG |
| `var(--ds-color-banana)` | Warm yellow — layers, memory, data at rest |
| `var(--ds-color-peach)` | Warm orange — energy, active state, heat |
| `var(--ds-color-pink)` | Rose — human element, history, people |
| `var(--ds-color-lavender)` | Cool blue-purple — logic, structure, connections |
| `var(--ds-color-purple)` | Deep purple — abstraction, hidden systems |

**Never hardcode hex or rgba color values in illustrations.** All colors must come from these tokens.

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

## Illustrate the Idea, Not the Object

When a slide has a strong textual metaphor — a desk, a chef, a relay race — the illustration should inhabit that metaphor, not draw the technical thing the metaphor describes.

A CPU slide should not show a chip. It should show a conductor mid-beat, or a chef reading one ticket at a time. A GPU slide should not show a circuit board. It should show an ant colony. The object is the lesson. The metaphor is the illustration.

Ask: *what is the concept doing, not what does it look like?*

Illustrations that show the real thing (chip, card, cabinet) are often doing less work than illustrations that show what the thing *is like*. Prefer the latter.

## Common Patterns

### Interface Over Hidden System

Use for abstractions. Show a simple object or control in front, with lower-opacity wiring, layers, or mechanisms behind it.

### Active Path

Use for cause and effect. One `var(--accent)` path traces the important flow through otherwise quiet complexity.

### Cutaway

Use for “underneath” moments. Keep the outer object recognizable, then expose only the parts that matter.

### Scale Field

Use for “many tiny things” moments. Repeat simple marks with low opacity, then highlight one or two examples.

### Paired Contrast

Use when two things differ by one dimension — speed, permanence, access, quantity. Show both objects side by side at the same scale. The spatial relationship between them carries the lesson. Used for RAM vs. storage (desk vs. filing cabinet), CPU vs. GPU (one chef vs. colony), and abstraction vs. implementation (switch face vs. wiring behind wall).

### Collapse to Substrate

Use for “it's all the same stuff” moments. Show several different objects — a letter, a color swatch, a waveform, a pixel — and overlay them with the same underlying pattern (binary stream, transistor grid). The overlay reveals that the diversity above is an illusion; the substrate is always the same.

## Motif Vocabulary

These motifs are part of the shared visual language for Untangled Chapter 1. Reuse them rather than inventing new ones for the same concept.

### Established

| Motif | Concept | Component |
|---|---|---|
| Light switch (interactive) | Decision, on/off, transistor | `light-switch` |
| Iceberg | Abstraction, hidden complexity | `iceberg-illustration` |
| Ant colony | GPU, parallel workers, emergent intelligence | `GpuIllustration` |
| Stacked tilted planes | Abstraction layers | `LayersIllustration` |
| Perspective dot field (zoom tunnel) | Transistor scale, many tiny things | `TransistorScaleIllustration` |


## Before Shipping

Check:

- The visual has one clear job.
- It matches the existing switch and iceberg roughness.
- `var(--accent)` is rare and meaningful.
- Text is readable on desktop and mobile.
- The illustration does not resize the slide columns unexpectedly.
- Lint and typecheck pass.
