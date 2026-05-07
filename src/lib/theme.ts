export const THEME_CHANGE_EVENT = "untangled-themechange";

let activeTransition: ViewTransition | null = null;

export function switchTheme(
  theme: "light" | "dark",
  originX = window.innerWidth / 2,
  originY = window.innerHeight / 2,
): void {
  const radius = Math.hypot(
    Math.max(originX, window.innerWidth - originX),
    Math.max(originY, window.innerHeight - originY),
  );

  const apply = () => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  if (!document.startViewTransition) {
    apply();
    return;
  }

  // If a transition is running, cut it short then start a fresh one.
  if (activeTransition) {
    activeTransition.skipTransition();
    activeTransition = null;
  }

  document.documentElement.style.setProperty("--vt-origin-x", `${originX}px`);
  document.documentElement.style.setProperty("--vt-origin-y", `${originY}px`);
  document.documentElement.style.setProperty("--vt-radius", `${radius}px`);
  document.documentElement.dataset.themeTransition = "true";

  activeTransition = document.startViewTransition(apply);

  activeTransition.finished.then(() => {
    activeTransition = null;
    document.documentElement.style.removeProperty("--vt-origin-x");
    document.documentElement.style.removeProperty("--vt-origin-y");
    document.documentElement.style.removeProperty("--vt-radius");
    delete document.documentElement.dataset.themeTransition;
  }).catch(() => {
    activeTransition = null;
    delete document.documentElement.dataset.themeTransition;
  });
}

export function subscribeToThemeChange(callback: () => void): () => void {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

export function getThemeSnapshot(): boolean {
  return document.documentElement.dataset.theme === "light";
}

export function getServerThemeSnapshot(): boolean {
  return false;
}
