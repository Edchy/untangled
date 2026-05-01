---
name: Untangled
description: A free, illustrated narrative that builds a genuine mental model of AI — from the first machines to honest questions about what it can and can't do.
colors:
  ember: "#d85a30"
  ink: "#0a0a0a"
  paper: "#fafafa"
  mid: "#737373"
  mid-light: "#a3a3a3"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 5rem)"
    fontWeight: 600
    lineHeight: 0.95
    letterSpacing: "normal"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
  title:
    fontFamily: "Cormorant Garamond, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 2
  label:
    fontFamily: "Inter, Arial, Helvetica, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: "0.18em"
rounded:
  none: "0px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "20px"
  lg: "40px"
  xl: "80px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.ember}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0 20px"
    height: "48px"
  button-ghost-hover:
    backgroundColor: "transparent"
    textColor: "{colors.ember}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  nav-link-hover:
    textColor: "{colors.ink}"
---

# Design System: Untangled

## 1. Overview

**Creative North Star: "The Printed Lecture"**

Untangled feels like a beautifully typeset book written by an expert who trusts your intelligence. Every surface is considered the way a page layout is considered: whitespace is structural, not decorative; type hierarchy is what carries meaning; the single accent exists to mark moments that matter, not to decorate. The experience is unhurried — it never rushes you, never demands your attention with motion or color. It gives the ideas room to land.

The system is built on near-black on near-white (or the inverse in dark mode) with a single coral/terracotta accent that warms as the content arc moves toward the present. The sketch surface — a subtle crosshatch grid — is the only texture in the system, and it exists to ground the illustrative, hand-drawn quality of the content without competing with it. Nothing else is decorative.

This design system explicitly rejects what the product rejects: course-platform conventions (progress bars as motivation, gamified streaks, persistent achievement counts), corporate editorial warmth (soft blues, stock photo aesthetics, "Learn at your own pace!" copy), and the edtech cliché of endless identical card grids with icon + heading + body repeated down the page.

**Key Characteristics:**
- Sharp corners everywhere (radius: 0). No softening. The grid and the type carry warmth; geometry does not need to.
- One accent, used with strict economy. Its rarity is the signal.
- Generous vertical rhythm. Slide content breathes. Margins are not filled.
- Serif for headings, neutral sans for body. The pairing reads as editorial without tipping into precious.
- Dark mode as a first-class experience, not an afterthought. The system inverts cleanly.

## 2. Colors: The Ember Palette

One accent. Two neutrals. Everything else is opacity.

### Primary
- **Ember** (`#d85a30`, `oklch(55% 0.17 38)`): The single accent. Used on interactive states (hover borders, hover text), progress markers, module accent dots, and key moments in copy (eyebrow labels, "Start reading" CTA hover). Never used decoratively. Appears on less than 10% of any given surface.

### Neutral
- **Ink** (`#0a0a0a`): Default text and primary button background in light mode. Background in dark mode. Near-black, not true black.
- **Paper** (`#fafafa`): Page background in light mode. Primary button text and background in dark mode. Near-white, not true white.
- **Mid** (`#737373`): Muted text in light mode — module numbers, secondary labels, divider context. Low-emphasis but still readable.
- **Mid-light** (`#a3a3a3`): Muted text in dark mode. Same role as Mid, adjusted for dark surface contrast.

All other color work is achieved through opacity variants of Ink or Paper: borders at `foreground/10`–`foreground/14`, secondary text at `foreground/68`–`foreground/76`, hover backgrounds at `foreground/[0.035]`.

### Named Rules
**The One Voice Rule.** Ember appears on ≤10% of any surface. Every additional use dilutes the signal. When in doubt, remove it.

**The Opacity System Rule.** Do not introduce new color values for border tints, text secondary, or hover backgrounds. Use opacity variants of `--foreground` (`foreground/12`, `foreground/68`, etc.). The system scales cleanly to dark mode because it has no hardcoded grays.

## 3. Typography: The Editorial Pair

**Display Font:** Cormorant Garamond (500, 600, 700 weights), fallback Georgia, serif
**Body Font:** Inter, fallback Arial, Helvetica, sans-serif
**Label/Mono Font:** Inter (600, uppercase, tracked), no mono font in current system

**Character:** Cormorant Garamond carries the ideas. Inter carries the interface. The pairing reads like a well-edited magazine: the serif is authoritative and warm, never fussy; the sans is invisible in the best sense, staying out of the way. They do not compete.

### Hierarchy
- **Display** (600, `clamp(3rem, 8vw, 5rem)`, line-height 0.95): The homepage `h1` ("Untangled"). One per page. Tight leading because the letterforms carry it.
- **Headline** (600, `clamp(2rem, 5vw, 3.75rem)`, line-height 1.1): Slide titles, module page heading, section headings. The workhorse of the content hierarchy.
- **Title** (600, `1.875rem` / 30px, line-height 1.25): Module list titles, sidebar module name, navigation cards (previous / next). Slightly subordinate to headline.
- **Body** (400, `1.125rem` / 18px, line-height 2): Slide prose. Generous leading for readability. Capped at 65–75ch in single-column reading contexts.
- **Label** (600, `0.75rem` / 12px, `0.18em` letter-spacing, uppercase): Eyebrow labels ("AI from zero", "First path", "01"), type labels ("text", "interactive"), section dividers. Always uppercase, always tracked. Never used for more than a few words.

### Named Rules
**The Serif-for-Ideas Rule.** Cormorant Garamond is for what the reader needs to understand. Inter is for what the interface needs to communicate. Do not use serif in navigation, buttons, labels, or form elements. Do not use Inter for content headings or slide titles.

**The Tight Display Rule.** Display type (the homepage h1) uses `line-height: 0.95`. This is intentional. At large sizes, default leading creates too much air. The tightness is the drama.

## 4. Elevation

This is a flat system. There are no drop shadows. Depth is created through tonal layering (opacity variants of the foreground/background), the sketch surface texture, and the semi-transparent header backdrop-blur — which is the one exception to the flat rule, and justified only because it serves a functional need (reading content beneath a sticky nav).

No element rests above another via shadow. Hierarchy is positional and typographic, not elevational.

### Named Rules
**The Flat-By-Default Rule.** Surfaces sit at the same plane. `box-shadow` is absent from the system. If an element needs to feel elevated, use a full border (`border-foreground/12`) or a tinted background, not a shadow.

**The One Blur Exception.** The site header uses `backdrop-blur` at 88% background opacity. This is the only blur in the system. It is not a design choice to replicate elsewhere; it is a functional affordance for a sticky element over scrolling content.

## 5. Components

### Buttons
Sharp corners (border-radius: 0) across all variants. The geometry is deliberate: no soft affordances. The ember accent on hover is how the system signals interactivity.

- **Primary:** Ink background, Paper text, `h-12` (48px), `px-5` (20px), `text-sm font-semibold`. Hover: Ember background, white text. Transition: `background-color 150ms`.
- **Ghost:** Transparent background, border `border-foreground` (full Ink in light mode), Ink text, same dimensions as Primary. Hover: Ember border, Ember text — no fill. Transition: `border-color 150ms, color 150ms`.
- **No variants beyond these two.** Icon buttons, link-style buttons, and destructive variants do not exist in the current system.

### Navigation Cards (Previous / Next)
Full-border rectangular blocks (`border-foreground/12`). Internal padding `p-4`, minimum height `min-h-24`. Secondary label ("Previous" / "Next") in `text-sm text-foreground/60`. Title in Title-weight serif. Hover: Ember border, Ember text. The next card sits right-aligned (text-right, icon trailing).

### Module Cards
Separated by a top border only (`border-t border-foreground/12`), `py-6` vertical padding. No background, no shadow, no card container. Module number in Label style (muted). Title in Title serif. Theme in body sans at `foreground/70`. CTA button right-aligned on large screens, full-width fallback on small screens.

**The No-Container Card Rule.** Module cards are not "cards" in the conventional sense. They have no background, no radius, no shadow. They are entries in a list, separated by lines. Adding a background or elevation to them is forbidden.

### Sketch Surface
A procedural crosshatch texture: `background-image` with two `linear-gradient` layers at `foreground/7` opacity, `26px × 26px` repeat. Used on the homepage hero panel (the module preview block). The content inside sits on a `bg-background/88 backdrop-blur` layer over the texture. The sketch surface is not a card pattern — it is the illustrative ground for a specific narrative moment.

### Site Header
Sticky, `h-16`, `border-b border-foreground/10`, `bg-background/88 backdrop-blur`. Logo: Cormorant Garamond 24px semibold. Nav links: `text-sm text-foreground/70`, hover `text-foreground`. Max-width `max-w-6xl`, `px-5` horizontal padding.

### Callout (Inline)
Used within MDX slide content. Full `border-l-4 border-accent` (the one intentional side-stripe exception — this is a blockquote-style inline component, not a card or list item, so the convention does not apply). Background `bg-foreground/[0.035]`. Label: Label style in Ember. Body: body text at `foreground/86`.

### Slide Layout
Two-column grid on large screens: fixed 220px aside (sticky, `top-24`) + fluid content column. Single column on mobile. The aside contains the back link, module number, module title, and theme in a `border-l border-foreground/14 pl-4` treatment — a thin ruled edge that anchors the sidebar without boxing it.

## 6. Do's and Don'ts

### Do:
- **Do** use `foreground/N` opacity variants for all border tints, secondary text, and hover backgrounds. Never introduce a new hardcoded color for these roles.
- **Do** use Ember only for interactive states, progress markers, key eyebrow labels, and moments that need to earn the reader's attention.
- **Do** use sharp corners (border-radius: 0) on all interactive elements: buttons, nav cards, module cards, the sketch surface panel.
- **Do** use the Label style (uppercase, `tracking-[0.18em]`, 600 weight, 12px) for all eyebrow labels and secondary section markers. It is the system's signal for "this is structure, not content."
- **Do** cap body prose at 65–75ch in single-column reading layouts. The slide content column should never feel like a wall of text.
- **Do** maintain the flat elevation system. Use `border-foreground/12` or `bg-foreground/[0.035]` to create layering, not shadows.
- **Do** support dark mode through the CSS custom property inversion (`--background` / `--foreground` swap). All color references should use these tokens, not hardcoded hex.

### Don't:
- **Don't** use box-shadow. The system has no drop shadows. Not on buttons, cards, nav, or modals.
- **Don't** add border-radius to buttons, cards, or containers. Sharp corners are the system's geometry.
- **Don't** introduce a second accent. Ember is the single accent. A second color competes with it and collapses the signal.
- **Don't** make the interface feel like a course platform: no persistent progress bars in navigation, no achievement badges, no "X% complete" counters in the header, no gamified streaks. This is a book, not an app.
- **Don't** use card grids with identical icon + heading + body repeated. Module cards are list entries, not tiles. Slide content sections are not cards.
- **Don't** use gradient text (`background-clip: text`). Ember at solid value is the only accent text treatment.
- **Don't** use Cormorant Garamond in navigation, buttons, labels, or form elements. Serif is for content hierarchy, not UI chrome.
- **Don't** replicate the sketch surface texture in more than one location. It is a single narrative device on the homepage hero, not a background pattern for the whole system.
- **Don't** design for Coursera, Duolingo, or Medium aesthetics: no soft rounded corners everywhere, no blue-dominant palettes, no "friendly" mascot or illustration styles that read as approachable rather than considered.
