"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

type SlideGesturesProps = {
  previousHref?: string;
  nextHref?: string;
};

export function SlideGestures({ previousHref, nextHref }: SlideGesturesProps) {
  const router = useRouter();
  const dragStart = useRef<number | null>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        if (nextHref) router.push(nextHref);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        if (previousHref) router.push(previousHref);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previousHref, nextHref, router]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      dragStart.current = e.clientX;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (dragStart.current === null) return;
      const delta = e.clientX - dragStart.current;
      dragStart.current = null;

      if (Math.abs(delta) < 60) return;

      if (delta < 0 && nextHref) router.push(nextHref);
      if (delta > 0 && previousHref) router.push(previousHref);
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
