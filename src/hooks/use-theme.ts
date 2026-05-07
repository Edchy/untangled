"use client";

import { useEffect, useState } from "react";

// Returns the current data-theme attribute value ("dark" | "light" | "").
// Re-renders consumers whenever the theme changes, so canvas illustrations
// can include this in their useEffect dependency array to redraw on switch.
export function useTheme(): string {
  const [theme, setTheme] = useState(() =>
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") ?? ""
      : ""
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute("data-theme") ?? "");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  return theme;
}
