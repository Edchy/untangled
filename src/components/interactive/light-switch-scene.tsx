"use client";

import { useSyncExternalStore } from "react";
import { LightSwitch } from "./light-switch";

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

export function LightSwitchScene() {
  const on = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function handleToggle(nextOn: boolean) {
    const theme = nextOn ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <div className="flex flex-col items-center">
      <LightSwitch on={on} onToggle={handleToggle} />
    </div>
  );
}
