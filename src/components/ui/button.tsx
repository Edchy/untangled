import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { cn } from "@/lib/ui";

type ButtonVariant = "primary" | "ghost" | "quiet" | "toggle" | "icon";
type ButtonSize = "sm" | "md" | "lg";

const baseClassName =
  "inline-flex shrink-0 items-center justify-center rounded-control font-sans font-semibold transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent disabled:cursor-default disabled:opacity-28";

const variantClassNames: Record<ButtonVariant, string> = {
  primary:
    "border border-foreground bg-foreground text-background hover:border-accent hover:bg-accent hover:text-background",
  ghost:
    "border border-foreground bg-transparent text-foreground hover:border-accent hover:text-accent",
  quiet:
    "border border-transparent bg-transparent text-foreground/62 hover:text-foreground",
  toggle:
    "border border-foreground/35 bg-transparent text-foreground/78 hover:border-foreground/70 hover:bg-foreground/6 aria-pressed:border-accent aria-pressed:bg-accent aria-pressed:text-background",
  icon:
    "border border-transparent bg-transparent text-foreground/36 hover:bg-foreground/6 hover:text-foreground",
};

const sizeClassNames: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-5 text-sm",
};

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = "ghost",
  size = "md",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(baseClassName, variantClassNames[variant], sizeClassNames[size], className)}
      {...props}
    />
  );
}

type LinkButtonProps = LinkProps & {
  children: ReactNode;
  className?: string;
  variant?: Exclude<ButtonVariant, "toggle">;
  size?: ButtonSize;
  "aria-label"?: string;
};

export function LinkButton({
  variant = "ghost",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(baseClassName, variantClassNames[variant], sizeClassNames[size], className)}
      {...props}
    >
      {children}
    </Link>
  );
}
