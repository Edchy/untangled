"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/typography";

const SPEED = 28;

function stripTags(html: string) {
  return html.replace(/<[^>]+>/g, "");
}

export function RevealAnswer({ answer }: { answer: string }) {
  const [state, setState] = useState<"hidden" | "typing" | "done">("hidden");
  const [displayed, setDisplayed] = useState("");

  const plain = stripTags(answer);

  useEffect(() => {
    if (state !== "typing") return;
    if (displayed.length >= plain.length) return;

    const t = setTimeout(() => {
      const next = plain.slice(0, displayed.length + 1);
      setDisplayed(next);
      if (next.length >= plain.length) setState("done");
    }, SPEED);

    return () => clearTimeout(t);
  }, [state, displayed, plain]);

  function handleShow() {
    setDisplayed("");
    setState(plain ? "typing" : "done");
  }

  if (state === "hidden") {
    return (
      <Button
        onClick={handleShow}
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
      {displayed}
      <span className={state === "typing" ? "animate-pulse" : "invisible"}>▎</span>
    </Text>
  );
}
