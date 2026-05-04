"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type SlideGesturesProps = {
  previousHref?: string;
  nextHref?: string;
  disableNext?: boolean;
};

export function SlideGestures({ previousHref, nextHref, disableNext }: SlideGesturesProps) {
  const router = useRouter();
  const dragStart = useRef<{ x: number; pointerType: string } | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (nextHref && !disableNext) router.push(nextHref, { transitionTypes: ["nav-forward"] });
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (previousHref) router.push(previousHref, { transitionTypes: ["nav-back"] });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previousHref, nextHref, router]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      dragStart.current = { x: e.clientX, pointerType: e.pointerType };
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragStart.current === null) return;
      const { x, pointerType } = dragStart.current;
      dragStart.current = null;

      if (pointerType === "mouse") return;

      const delta = e.clientX - x;
      if (Math.abs(delta) < 60) return;

      if (delta < 0 && nextHref && !disableNext) router.push(nextHref, { transitionTypes: ["nav-forward"] });
      if (delta > 0 && previousHref) router.push(previousHref, { transitionTypes: ["nav-back"] });
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [previousHref, nextHref, router]);

  return null;
}
