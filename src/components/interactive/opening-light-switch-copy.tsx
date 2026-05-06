"use client";

import { useSyncExternalStore } from "react";
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
  const on = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  return (
    <p className={proseParagraphClassName} aria-live="polite">
      {on
        ? "Flip it back again if you prefer the dark."
        : "Flip the switch to turn on the light."}
    </p>
  );
}
