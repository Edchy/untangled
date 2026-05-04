import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/callout";
import { Heading } from "@/components/ui/typography";
import { proseParagraphClassName } from "@/components/ui/prose";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <Heading as="h2" variant="title" className="mt-10 first:mt-0">
        {children}
      </Heading>
    ),
    p: ({ children }) => (
      <p className={proseParagraphClassName}>
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="max-w-3xl border-y border-foreground/12 py-8 font-serif text-[clamp(2rem,5vw,4rem)] font-semibold leading-[1.05] text-foreground [text-wrap:balance] [&_p]:text-inherit [&_p]:leading-inherit [&_p]:text-inherit [&_p+p]:mt-6 [&_p:last-child]:font-sans [&_p:last-child]:text-xs [&_p:last-child]:font-semibold [&_p:last-child]:uppercase [&_p:last-child]:leading-6 [&_p:last-child]:tracking-[0.18em] [&_p:last-child]:text-accent">
        {children}
      </blockquote>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground/90">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="mt-prose-block space-y-2.5 text-body leading-[var(--ds-leading-body)] text-foreground/68">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex gap-3">
        <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-foreground/28" aria-hidden />
        <span>{children}</span>
      </li>
    ),
    Callout,
    ...components,
  };
}
