import type { ReactNode } from "react";
import { cn } from "@/lib/ui";

type SlideShellProps = {
  children: ReactNode;
  className?: string;
};

export function SlideShell({ children, className }: SlideShellProps) {
  return (
    <div className={cn("flex min-h-svh flex-col items-center justify-center px-8 py-16 sm:px-16 sm:py-24", className)}>
      {children}
    </div>
  );
}

export function SlideColumns({ children, className }: SlideShellProps) {
  return (
    <div className={cn("grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_1fr]", className)}>
      {children}
    </div>
  );
}
