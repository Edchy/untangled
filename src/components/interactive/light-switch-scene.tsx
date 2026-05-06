"use client";

import { useSyncExternalStore } from "react";
import { LightSwitch } from "./light-switch";
import { switchTheme, subscribeToThemeChange, getThemeSnapshot, getServerThemeSnapshot } from "@/lib/theme";

export function LightSwitchScene() {
  const on = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function handleToggle(nextOn: boolean, originX?: number, originY?: number) {
    switchTheme(nextOn ? "light" : "dark", originX, originY);
  }

  return <LightSwitch on={on} onToggle={handleToggle} />;
}
