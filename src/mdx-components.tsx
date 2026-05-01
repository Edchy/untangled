import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/ui/callout";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => (
      <h2 className="mt-8 text-base font-semibold leading-snug text-foreground first:mt-0">
        {children}
      </h2>
    ),
    p: ({ children }) => (
      <p className="mt-4 text-sm leading-7 text-foreground/68">
        {children}
      </p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground/90">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="mt-4 space-y-2 text-sm leading-7 text-foreground/68">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="flex gap-2.5">
        <span className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-foreground/28" aria-hidden />
        <span>{children}</span>
      </li>
    ),
    Callout,
    ...components,
  };
}
