import type { ReactNode } from "react";

type CalloutProps = {
  children: ReactNode;
  label?: string;
};

export function Callout({ children, label = "Hold onto this" }: CalloutProps) {
  return (
    <aside className="my-6 rounded-[8px] bg-foreground/[0.04] px-4 py-4 dark:bg-foreground/[0.07]">
      <p className="mb-2 text-xs font-medium tracking-[0.1em] text-accent uppercase">
        {label}
      </p>
      <div className="text-sm leading-7 text-foreground/72">{children}</div>
    </aside>
  );
}
