import { useCallback, useSyncExternalStore } from "react";

const STORAGE_KEY = "untangled-progress";
const emptySet: Set<string> = new Set();
const getEmptySet = () => emptySet;

// Cached snapshot so useSyncExternalStore gets a stable reference between renders
let cachedVisited: Set<string> | null = null;

function readVisited(): Set<string> {
  if (typeof window === "undefined") return emptySet;
  if (cachedVisited !== null) return cachedVisited;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    cachedVisited = raw ? new Set(JSON.parse(raw) as string[]) : new Set();
  } catch {
    cachedVisited = new Set();
  }
  return cachedVisited;
}

function invalidateCache() {
  cachedVisited = null;
}

function subscribe(cb: () => void) {
  const handler = () => { invalidateCache(); cb(); };
  window.addEventListener("storage", handler);
  window.addEventListener("untangled-progress", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("untangled-progress", handler);
  };
}

export function useProgress() {
  const visited = useSyncExternalStore(
    subscribe,
    readVisited,
    getEmptySet
  );

  const markVisited = useCallback((key: string) => {
    const current = readVisited();
    if (current.has(key)) return;
    const next = new Set(current);
    next.add(key);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]));
    invalidateCache();
    window.dispatchEvent(new Event("untangled-progress"));
  }, []);

  const resetProgress = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    invalidateCache();
    window.dispatchEvent(new Event("untangled-progress"));
  }, []);

  return { visited, markVisited, resetProgress };
}

export function isChapterComplete(visited: Set<string>, slideKeys: string[]): boolean {
  return slideKeys.length > 0 && slideKeys.every((k) => visited.has(k));
}
