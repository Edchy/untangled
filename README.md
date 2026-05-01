# Untangled

A free, nonprofit, interactive "learn AI" experience that helps people with no technical background build a real mental model of how AI works.

## What It Is

Untangled is a linear narrative learning experience: closer to a beautifully illustrated book than a course platform. It starts with the earliest computers and builds toward modern large language models through short, clear units, warm illustration, and interactive demos.

## How To Run

```bash
npm run dev
```

Open `http://localhost:3000`.

## Tech Stack

- Next.js App Router
- TypeScript
- MDX for slide content
- Tailwind CSS
- Framer Motion
- Rough.js for hand-drawn interactive diagrams
- PWA web target

## Deployment

- Deployment target: Vercel
- CI/CD approach: Not defined yet
- Branch rule: Never commit directly to main

## Content Direction

The learning path is organized chronologically across ten modules:

1. The Machine
2. Can Machines Think?
3. The Long Winter
4. Learning from Data
5. Going Deeper
6. The Meaning of Words
7. Paying Attention
8. Scale
9. What It Actually Does
10. The Honest Questions

Each slide maps to one MDX file with frontmatter. Interactive slides can import React components directly.
