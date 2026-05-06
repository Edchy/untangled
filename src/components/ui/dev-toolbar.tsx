"use client";

import { useRouter } from "next/navigation";

export function DevToolbar({ conceptSlug }: { conceptSlug: string }) {
  if (process.env.NODE_ENV !== "development") return null;

  const router = useRouter();
  const storageKey = `untangled-answers-${conceptSlug}`;

  function resetQuiz() {
    localStorage.removeItem(storageKey);
    router.refresh();
  }

  function resetProgress() {
    localStorage.removeItem("untangled-progress");
    window.dispatchEvent(new Event("untangled-progress"));
    router.refresh();
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-pill bg-foreground/90 px-3 py-1.5 text-[11px] font-medium text-background/70">
      <span className="text-background/40">dev</span>
      <button
        onClick={resetQuiz}
        className="text-background transition-colors hover:text-background/100"
      >
        reset quiz
      </button>
      <span className="text-background/20">·</span>
      <button
        onClick={resetProgress}
        className="text-background transition-colors hover:text-background/100"
      >
        reset progress
      </button>
    </div>
  );
}
