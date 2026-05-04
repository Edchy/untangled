"use client";

import { useEffect, useState } from "react";

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
      <button
        type="button"
        onClick={handleShow}
        className="mt-5 cursor-pointer border-0 bg-transparent p-0 text-[1.0625rem] leading-[1.85] text-foreground/30 transition-colors hover:text-foreground/60"
      >
        Show answer
      </button>
    );
  }

  return (
    <p className="mt-5 max-w-[60ch] text-[1.0625rem] leading-[1.85] text-foreground/68">
      {displayed}
      <span className={state === "typing" ? "animate-pulse" : "invisible"}>▎</span>
    </p>
  );
}
