"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

export function RevealAnswer({ answer }: { answer: string }) {
  const [visible, setVisible] = useState(false);

  if (!visible) {
    return (
      <Button
        onClick={() => setVisible(true)}
        variant="quiet"
        size="sm"
        className="mt-prose-block px-0 text-body font-normal leading-[var(--ds-leading-body)] text-foreground/30 hover:text-foreground/60"
      >
        Show answer
      </Button>
    );
  }

  return (
    <Text className="mt-prose-block">
      {answer}
    </Text>
  );
}
