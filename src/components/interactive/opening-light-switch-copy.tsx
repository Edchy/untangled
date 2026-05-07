"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { proseParagraphClassName } from "@/components/ui/prose";

const THEME_CHANGE_EVENT = "untangled-themechange";

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "light";
}

function getServerThemeSnapshot() {
  return false;
}

function subscribeToThemeChange(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);

  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function OpeningLightSwitchCopy() {
  const [hasFlipped, setHasFlipped] = useState(false);
  const on = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  useEffect(() => {
    function markFlipped() {
      setHasFlipped(true);
    }

    window.addEventListener(THEME_CHANGE_EVENT, markFlipped);
    return () => {
      window.removeEventListener(THEME_CHANGE_EVENT, markFlipped);
    };
  }, []);

  return (
    <p className={proseParagraphClassName} aria-live="polite">
      {hasFlipped
        ? on
          ? "Flip it again if you prefer the darkness."
          : "Flip it again if you miss the light."
        : on
          ? "Flip the switch to turn off the light."
          : "Flip the switch to turn on the light."}
    </p>
  );
}
