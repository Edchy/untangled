import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-10 font-serif text-2xl font-semibold leading-snug text-foreground first:mt-0">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mt-5 text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty] first:mt-0">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground/90">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="mt-5 space-y-2.5 text-[1.0625rem] leading-[1.85] text-foreground/68">
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
