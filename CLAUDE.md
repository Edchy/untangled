# Untangled — Agent Context

## 1. Think Before Coding
Don't assume. Don't hide confusion. Surface tradeoffs.
- State assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First
Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- If 200 lines could be 50, rewrite it.
Ask: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes
Touch only what you must. Clean up only your own mess.
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- Every changed line should trace directly to the request.

## 4. Goal-Driven Execution
Define success criteria. Loop until verified.
- Transform tasks into verifiable goals before starting.
- For multi-step tasks, write a brief plan and confirm before executing.
- "Add validation" → "Write tests for invalid inputs, then make them pass."

## Red Lines
Require explicit approval — never do these autonomously:
- `rm -rf` or any recursive delete
- Force push (`--force`, `-f`)
- Direct commits or merges to `main`/`master`
- Secrets in version control
- Bypassing pre-commit hooks (`--no-verify`)

## Planning
- Plan before any task with 3+ steps or architectural impact.
- Write the plan out. Confirm before executing.
- If something breaks: stop, re-plan, then continue.
- Log mistakes and lessons in `gotchas.md`.

## Task Loop
Plan → Verify inputs → Execute → Explain changes → Capture lessons

## Quality
- Root-cause every bug. Symptoms are not solutions.
- Verify before done: tests pass, build succeeds, UI looks correct.

## Styling
- This is a hardcore Tailwind project.
- Prefer Tailwind utilities and Tailwind v4 theme variables in `src/app/globals.css`.
- Keep custom CSS small and limited to global primitives, theme variables, and genuinely reusable selectors.
- When styling components, reach for Tailwind classes first.
- `DESIGN.md` is mandatory context before any UI work.
- `src/app/globals.css` is the code source of truth for design tokens. Change token values there before changing component styling.
- Use reusable primitives from `src/components/ui` before writing one-off UI: `Button`, `LinkButton`, `Text`, `Heading`, `Surface`, `Prose`, `SlideShell`, and `SlideColumns`.
- Add or extend a primitive when a button, link, surface, text style, or layout pattern appears more than once.
- Use token-backed utilities such as `rounded-control`, `rounded-surface`, `text-body`, `text-headline`, and `bg-background`. Do not hardcode radii, shadows, or colors in reusable UI.
- Run `npm run design:check` for UI changes.


## Tools & Docs
Before implementing anything with a library or framework, look up the docs first.
- Use Context7 for general library docs: resolve the library ID, then fetch docs.
- Load the dedicated vercel and react skills for any react or vercel-specific questions.
- If a dedicated MCP exists for a library in this stack, prefer it over Context7.
- Never guess at API shapes or configuration — look it up.
- For Next.js work, read the relevant guide in `node_modules/next/dist/docs/` before writing code. This project may use a Next.js version with breaking changes from older conventions.

**MCPs available for this project:**
- MCP registry search was unavailable during project init.
- No connected MCP resources were reported by the local MCP listing.

## This Project
- **Name:** Untangled
- **What it is:** A free, nonprofit, interactive "learn AI" experience that uses narrative, illustration, and hands-on moments to help non-technical people build a real mental model of AI.
- **Tier:** Public
- **Stack:** Next.js App Router, TypeScript, MDX, Tailwind CSS, Framer Motion, Rough.js, Vercel, PWA

## Content Structure
The content hierarchy is: **module → concept → slide**.

In everyday conversation, the user may say:
- **"module"** → maps to a top-level directory like `01-the-machine`
- **"chapter"** → maps to a concept directory within a module, like `02-logic-and-circuits`
- **"lesson"** or **"slide"** → maps to an individual `.mdx` file within a concept

Content lives in `content/<module-slug>/<concept-slug>/[<subconcept-slug>/]<NN>-slide-name.mdx`.
