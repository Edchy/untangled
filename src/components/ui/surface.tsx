import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/ui";

type SurfaceProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export function Surface({ children, className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn("rounded-surface border border-foreground/12 bg-transparent", className)}
      {...props}
    >
      {children}
    </div>
  );
}
