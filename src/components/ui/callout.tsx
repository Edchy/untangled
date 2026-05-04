import type { ReactNode } from "react";
import { Text } from "@/components/ui/typography";

type CalloutProps = {
  children: ReactNode;
  label?: string;
};

export function Callout({ children, label = "Hold onto this" }: CalloutProps) {
  return (
    <aside className="my-8 border-l-2 border-accent/40 bg-foreground/[0.04] px-5 py-4 dark:bg-foreground/[0.07]">
      <Text variant="label" className="mb-2 text-[11px]">
        {label}
      </Text>
      <div className="text-[1.0625rem] leading-[1.85] text-foreground/72">{children}</div>
    </aside>
  );
}
