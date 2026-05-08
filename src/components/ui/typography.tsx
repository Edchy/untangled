import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/ui";

type TextVariant = "body" | "muted" | "label" | "caption";
type HeadingVariant = "display" | "headline" | "title";

const textClassNames: Record<TextVariant, string> = {
  body: "max-w-[60ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/68 [text-wrap:pretty]",
  muted: "max-w-[60ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/52 [text-wrap:pretty]",
  label:
    "text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent",
  caption: "text-xs leading-5 text-foreground/52",
};

const headingClassNames: Record<HeadingVariant, string> = {
  display:
    "font-serif text-display font-semibold leading-[var(--ds-leading-display)] text-foreground [text-wrap:balance]",
  headline:
    "font-serif text-headline font-semibold leading-[var(--ds-leading-headline)] text-foreground/68 [text-wrap:balance]",
  title:
    "font-serif text-title font-semibold leading-[var(--ds-leading-title)] text-foreground",
};

type TextProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  children: ReactNode;
  variant?: TextVariant;
};

export function Text({ as: Component = "p", variant = "body", className, children, ...props }: TextProps) {
  return (
    <Component className={cn(textClassNames[variant], className)} {...props}>
      {children}
    </Component>
  );
}

type HeadingProps = HTMLAttributes<HTMLHeadingElement> & {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  variant?: HeadingVariant;
};

export function Heading({
  as: Component = "h1",
  variant = "headline",
  className,
  children,
  ...props
}: HeadingProps) {
  return (
    <Component className={cn(headingClassNames[variant], className)} {...props}>
      {children}
    </Component>
  );
}
