"use client";

import { useEffect } from "react";
import { useProgress } from "@/lib/progress";

export function SlideProgressMarker({ slideKey }: { slideKey: string }) {
  const { markVisited } = useProgress();
  useEffect(() => { markVisited(slideKey); }, [slideKey, markVisited]);
  return null;
}
