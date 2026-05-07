import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/ui";

type ProseProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export const proseParagraphClassName =
  "mt-prose-block max-w-[60ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/68 [text-wrap:pretty] first:mt-0";

export function Prose({ children, className, ...props }: ProseProps) {
  return (
    <div
      className={cn("[&_p]:mt-prose-block [&_p]:max-w-[60ch] [&_p]:font-body [&_p]:text-body [&_p]:leading-[var(--ds-leading-body)] [&_p]:text-foreground/68 [&_p]:[text-wrap:pretty] [&_p:first-child]:mt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
}
