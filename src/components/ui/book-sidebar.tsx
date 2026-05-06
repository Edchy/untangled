"use client";

import Link from "next/link";
import { useState, useEffect, useSyncExternalStore } from "react";
import { X, Check, Moon, Sun } from "lucide-react";
import type { Module, Slide } from "@/lib/content";
import { useProgress, isChapterComplete } from "@/lib/progress";

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

function chapterSlugToTitle(slug: string): string {
  const withoutNumber = slug.replace(/^\d+-/, "");
  return withoutNumber.charAt(0).toUpperCase() + withoutNumber.slice(1).replace(/-/g, " ");
}

type Chapter = {
  slug: string;
  title: string;
  slides: Slide[];
};

type BookNavProps = {
  modules: Module[];
  currentSlideKey: string;
};

function getChapters(mod: Module): Chapter[] {
  const chapters: Chapter[] = [];
  const seen = new Set<string>();
  for (const slide of mod.slides) {
    if (!seen.has(slide.conceptSlug)) {
      seen.add(slide.conceptSlug);
      chapters.push({
        slug: slide.conceptSlug,
        title: chapterSlugToTitle(slide.conceptSlug),
        slides: mod.slides.filter((s) => s.conceptSlug === slide.conceptSlug),
      });
    }
  }
  return chapters;
}

function ThemeToggle() {
  const isLight = useSyncExternalStore(
    subscribeToThemeChange,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  function handleToggle() {
    const theme = isLight ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  }

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={handleToggle}
      className="relative flex w-10 shrink-0 items-center justify-center text-foreground/42 transition-colors duration-150 hover:bg-foreground/6 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
    >
      <span
        aria-hidden
        className={[
          "absolute transition-[opacity,scale,filter] duration-150 ease-out",
          isLight ? "scale-100 opacity-100 blur-0" : "scale-[0.25] opacity-0 blur-[4px]",
        ].join(" ")}
      >
        <Sun size={14} />
      </span>
      <span
        aria-hidden
        className={[
          "absolute transition-[opacity,scale,filter] duration-150 ease-out",
          isLight ? "scale-[0.25] opacity-0 blur-[4px]" : "scale-100 opacity-100 blur-0",
        ].join(" ")}
      >
        <Moon size={14} />
      </span>
    </button>
  );
}

export function BookSidebar({ modules, currentSlideKey }: BookNavProps) {
  const { visited } = useProgress();
  const [open, setOpen] = useState(false);
  const [openModule, setOpenModule] = useState<string | null>(() => {
    const current = modules.find((m) =>
      m.slides.some((s) => s.key === currentSlideKey)
    );
    return current?.slug ?? null;
  });
  const [openChapter, setOpenChapter] = useState<string | null>(() => {
    const current = modules.find((m) =>
      m.slides.some((s) => s.key === currentSlideKey)
    );
    return current?.slides.find((s) => s.key === currentSlideKey)?.conceptSlug ?? null;
  });

  // Close on Escape or click outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onPointer = (e: PointerEvent) => {
      const panel = document.getElementById("toc-panel");
      const siteNav = document.getElementById("site-nav");
      if (panel && !panel.contains(e.target as Node) && siteNav && !siteNav.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const currentModule = modules.find((m) =>
    m.slides.some((s) => s.key === currentSlideKey)
  );
  const currentSlide = currentModule?.slides.find((s) => s.key === currentSlideKey);
  // Chapter-relative slide number
  const currentModuleChapters = currentModule ? getChapters(currentModule) : [];
  const currentChapterIndex = currentModuleChapters.findIndex((c) => c.slug === currentSlide?.conceptSlug);
  const currentChapter = currentModuleChapters[currentChapterIndex];
  const chapterIndex = currentChapter?.slides.findIndex((s) => s.key === currentSlideKey) ?? -1;
  const lessonNumber = chapterIndex >= 0 ? String(chapterIndex + 1).padStart(2, "0") : null;

  // Chapters for the open module
  const mod = modules.find((m) => m.slug === openModule);
  const chapters = mod ? getChapters(mod) : [];
  // Single-chapter modules skip straight to the slide list
  const effectiveOpenChapter = chapters.length === 1 ? chapters[0].slug : openChapter;
  const activeChapter = chapters.find((c) => c.slug === effectiveOpenChapter);
  const chapterSlides = activeChapter?.slides ?? [];

  // Header back-button
  let headerLeft: React.ReactNode;
  if (!openModule) {
    headerLeft = (
      <span className="text-xs font-semibold tracking-wide text-foreground/36">Modules</span>
    );
  } else if (!effectiveOpenChapter) {
    headerLeft = (
      <button
        onClick={() => { setOpenModule(null); setOpenChapter(null); }}
        className="flex items-center gap-1.5 text-xs text-foreground/36 transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        All modules
      </button>
    );
  } else {
    const isSkipped = chapters.length === 1;
    headerLeft = (
      <button
        onClick={() => isSkipped ? setOpenModule(null) : setOpenChapter(null)}
        className="flex items-center gap-1.5 text-xs text-foreground/36 transition-colors hover:text-accent"
      >
        <span aria-hidden>←</span>
        {isSkipped ? "All modules" : "All chapters"}
      </button>
    );
  }

  return (
    <>
      {/* Home + Trigger — fixed top-left */}
      <nav id="site-nav" aria-label="Site navigation" className="fixed left-4 top-4 sm:left-8 sm:top-6 z-40 flex w-72 items-stretch rounded-control border border-foreground/12 overflow-hidden transition-colors hover:border-accent/40">
        <Link
          href="/"
          aria-label="Go to home"
          className="flex items-center justify-center px-3 py-2"
        >
          <svg viewBox="0 0 89 97" className="h-5 w-5 fill-foreground" aria-hidden>
            <path d="M56.3745 17.3517C46.3359 17.3517 41.8185 25.5246 41.8185 35.0805V64H24V32.943C24 14.8369 34.666 0 56.3745 0C78.083 0 89 14.7112 89 32.943V64H71.1815V35.0805C71.1815 25.5246 66.5386 17.3517 56.3745 17.3517Z" />
            <path d="M32.627 79.28C42.1161 79.28 46.9257 70.96 46.9257 61.104V31.792H65.384V63.28C65.384 81.84 54.205 96.816 32.627 96.816C11.179 96.816 0 81.84 0 63.28V31.792H18.4583V61.232C18.4583 70.96 23.1379 79.28 32.627 79.28Z" />
          </svg>
        </Link>

        <div className="w-px self-stretch bg-foreground/10" aria-hidden />

        <button
          id="toc-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open table of contents"
          className="flex flex-1 flex-col items-start px-3 py-2 text-left"
        >
          <span className="truncate max-w-[160px] text-[10px] font-medium text-foreground/36">
            {currentModule
              ? currentChapter
                ? `${currentModule.title.replace(/^\d+:\s*/, "")} · ${currentChapter.title}`
                : currentModule.title.replace(/^\d+:\s*/, "")
              : "Contents"}
          </span>
          <span className="max-w-[160px] truncate text-xs font-medium text-foreground/70">
            {lessonNumber && <span className="tabular-nums text-accent">{lessonNumber} </span>}{currentSlide?.title ?? ""}
          </span>
        </button>

        <div className="w-px self-stretch bg-foreground/10" aria-hidden />

        <ThemeToggle />
      </nav>

      {/* Floating panel */}
      <div
        className={[
          "fixed left-4 sm:left-8 top-1/2 z-50 flex h-[70svh] w-72 -translate-y-1/2 flex-col rounded-surface border border-foreground/12 bg-background overflow-hidden transition-opacity duration-150",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        id="toc-panel"
        aria-modal
        role="dialog"
        aria-label="Table of contents"
      >
        {/* Header */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-foreground/10 pl-5">
          {headerLeft}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-11 w-11 items-center justify-center rounded-control text-foreground/36 transition-colors hover:bg-foreground/6 hover:text-accent"
          >
            <X size={14} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col overflow-hidden">
          {!openModule ? (
            /* ── Module list ── */
            <ol className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3">
              {modules.map((m) => {
                const hasActive = m.slides.some((s) => s.key === currentSlideKey);
                const moduleChapters = getChapters(m);
                const isDone = moduleChapters.length > 0 && moduleChapters.every((c) =>
                  isChapterComplete(visited, c.slides.map((s) => s.key))
                );
                return (
                  <li key={m.slug}>
                    <button
                      onClick={() => { setOpenModule(m.slug); setOpenChapter(null); }}
                      className={[
                        "flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors",
                        hasActive
                          ? "bg-accent/8 text-accent hover:bg-accent/14"
                          : isDone
                            ? "text-foreground/36 hover:bg-foreground/4 hover:text-accent"
                            : "text-foreground/44 hover:bg-foreground/4 hover:text-accent",
                      ].join(" ")}
                    >
                      {isDone && <Check size={11} className="shrink-0 text-foreground/36" />}
                      <span className={["text-xs leading-5", hasActive ? "font-semibold" : "font-medium"].join(" ")}>
                        {m.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          ) : !effectiveOpenChapter ? (
            /* ── Chapter list ── */
            <div className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3">
              <p className="px-2.5 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/30">
                {mod?.title.replace(/^\d+:\s*/, "")}
              </p>
              <ol>
                {chapters.length > 0 ? chapters.map((chapter, i) => {
                  const hasActive = chapter.slides.some((s) => s.key === currentSlideKey);
                  const isDone = isChapterComplete(visited, chapter.slides.map((s) => s.key));
                  return (
                    <li key={chapter.slug}>
                      <button
                        onClick={() => setOpenChapter(chapter.slug)}
                        className={[
                          "flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors",
                          hasActive
                            ? "bg-accent/8 text-accent hover:bg-accent/14"
                            : isDone
                              ? "text-foreground/36 hover:bg-foreground/4 hover:text-accent"
                              : "text-foreground/44 hover:bg-foreground/4 hover:text-accent",
                        ].join(" ")}
                      >
                        {isDone ? (
                          <Check size={11} className="shrink-0 text-foreground/36" />
                        ) : (
                          <span className={["shrink-0 text-[10px] tabular-nums", hasActive ? "text-accent/60" : "text-foreground/28"].join(" ")}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                        <span className={["flex-1 text-xs leading-5", hasActive ? "font-semibold" : "font-medium"].join(" ")}>{chapter.title}</span>
                        <span className={["shrink-0 text-[10px] tabular-nums", hasActive ? "text-accent/50" : "text-foreground/28"].join(" ")}>
                          {chapter.slides.length}
                        </span>
                      </button>
                    </li>
                  );
                }) : (
                  <li className="px-2.5 py-2 text-xs italic text-foreground/24">Coming soon</li>
                )}
              </ol>
            </div>
          ) : (
            /* ── Slide list ── */
            <div className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3">
              <p className="px-2.5 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/30">
                {activeChapter?.title}
              </p>
              <ol>
                {chapterSlides.length > 0 ? (
                  chapterSlides.map((slide, i) => {
                    const isActive = slide.key === currentSlideKey;
                    const conceptSlides = chapterSlides.filter(
                      (s) => s.subConceptSlug === slide.subConceptSlug && s.subConceptSlug !== null
                    );
                    const isQuizLocked = slide.subConceptSlug?.includes("quiz") && slide.key !== conceptSlides[0]?.key;
                    return (
                      <li key={slide.key}>
                        {isQuizLocked ? (
                          <span className="flex cursor-default items-baseline gap-3 rounded-control px-2.5 py-2 text-xs leading-5 text-foreground/30 select-none">
                            <span className="shrink-0 text-[10px] tabular-nums">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {slide.title}
                          </span>
                        ) : (
                          <Link
                            href={slide.href}
                            onClick={() => setOpen(false)}
                            className={[
                              "flex items-baseline gap-3 rounded-control px-2.5 py-2 text-xs leading-5 transition-colors",
                              isActive
                                ? "bg-accent/8 font-semibold text-accent hover:bg-accent/14"
                                : "text-foreground/44 hover:bg-foreground/4 hover:text-accent",
                            ].join(" ")}
                          >
                            <span className={[
                              "shrink-0 text-[10px] tabular-nums",
                              isActive ? "text-accent" : "text-foreground/28",
                            ].join(" ")}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {slide.title}
                          </Link>
                        )}
                      </li>
                    );
                  })
                ) : (
                  <li className="px-2.5 py-2 text-xs italic text-foreground/24">Coming soon</li>
                )}
              </ol>
            </div>
          )}
        </nav>
      </div>
    </>
  );
}
