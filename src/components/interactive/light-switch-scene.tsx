"use client";

import { useState } from "react";
import { LightBulb } from "./light-bulb";
import { LightSwitch } from "./light-switch";

export function LightSwitchScene() {
  const [on, setOn] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.dataset.theme === "light";
  });

  function handleToggle(nextOn: boolean) {
    const theme = nextOn ? "light" : "dark";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    setOn(nextOn);
  }

  return (
    <div className="flex flex-col items-center gap-8">
      <LightBulb on={on} />
      <LightSwitch on={on} onToggle={handleToggle} />
    </div>
  );
}
