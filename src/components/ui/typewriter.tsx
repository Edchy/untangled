"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "dots" | "typing" | "done";

type TypewriterProps = {
  text: string;
  html: string;
  slideKey: string;
};

const SEEN = new Set<string>();

export function Typewriter({ text, html, slideKey }: TypewriterProps) {
  const [phase, setPhase] = useState<Phase>(SEEN.has(slideKey) ? "done" : "dots");
  const [count, setCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (SEEN.has(slideKey)) {
      setPhase("done");
      setCount(0);
      return;
    }

    setPhase("dots");
    setCount(0);

    // ms per character — faster for longer text
    const ms = Math.max(10, 38 - text.length / 20);

    timeoutRef.current = setTimeout(() => {
      setPhase("typing");
      SEEN.add(slideKey);

      let i = 0;
      intervalRef.current = setInterval(() => {
        i += 1;
        setCount(i);
        if (i >= text.length) {
          clearInterval(intervalRef.current!);
          setPhase("done");
        }
      }, ms);
    }, 500);

    return () => {
      clearTimeout(timeoutRef.current!);
      clearInterval(intervalRef.current!);
    };
  }, [slideKey, text]);

  if (phase === "dots") {
    return (
      <span className="inline-flex gap-1 text-foreground/36">
        <span className="animate-bounce [animation-delay:0ms]">·</span>
        <span className="animate-bounce [animation-delay:150ms]">·</span>
        <span className="animate-bounce [animation-delay:300ms]">·</span>
      </span>
    );
  }

  if (phase === "typing") {
    const partial = text.slice(0, count);
    const paras = partial.split(/\n\n/);
    return (
      <div>
        {paras.map((para, i) => (
          <p key={i} className="mt-5 text-[1.0625rem] leading-[1.85] text-foreground/68 [text-wrap:pretty] first:mt-0">
            {para}{i === paras.length - 1 && <span className="animate-pulse">▍</span>}
          </p>
        ))}
      </div>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
