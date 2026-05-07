"use client";

import Link from "next/link";
import { useState, useEffect, useRef, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { Variants } from "motion/react";
import { Check, Moon, Sun } from "lucide-react";
import type { Module, Slide } from "@/lib/content";
import { useProgress, isChapterComplete } from "@/lib/progress";
import { switchTheme, subscribeToThemeChange, getThemeSnapshot, getServerThemeSnapshot } from "@/lib/theme";

const UNTANGLE_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const panelVariants: Variants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    opacity: 0,
    y: -4,
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.28, ease: UNTANGLE_EASE },
  },
};

const reducedPanelVariants: Variants = {
  closed: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 0,
    y: 0,
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.12, ease: "easeOut" },
  },
};

const contentVariants: Variants = {
  closed: {},
  open: {
    transition: {
      delayChildren: 0.03,
      staggerChildren: 0.015,
    },
  },
};

const reducedContentVariants: Variants = {
  closed: {},
  open: {
    transition: {
      delayChildren: 0,
      staggerChildren: 0,
    },
  },
};

const itemVariants: Variants = {
  closed: {
    filter: "blur(3px)",
    opacity: 0,
    y: -5,
  },
  open: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.16, ease: UNTANGLE_EASE },
  },
};

const reducedItemVariants: Variants = {
  closed: {
    filter: "blur(0px)",
    opacity: 0,
    y: 0,
  },
  open: {
    filter: "blur(0px)",
    opacity: 1,
    y: 0,
    transition: { duration: 0.12, ease: "easeOut" },
  },
};

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
      const conceptSlides = mod.slides.filter((s) => s.conceptSlug === slide.conceptSlug);
      const coverSlide = conceptSlides.find((s) => s.type === "cover");
      chapters.push({
        slug: slide.conceptSlug,
        title: coverSlide?.title ?? chapterSlugToTitle(slide.conceptSlug),
        slides: conceptSlides,
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

  function handleToggle(event: React.MouseEvent) {
    switchTheme(isLight ? "dark" : "light", event.clientX, event.clientY);
  }

  return (
    <button
      type="button"
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      aria-pressed={isLight}
      onClick={handleToggle}
      className="relative flex w-11 shrink-0 items-center justify-center text-foreground/42 transition-colors duration-150 hover:bg-foreground/6 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
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
  const reducedMotion = useReducedMotion();
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

  // Return focus to trigger when panel closes
  const prevOpenRef = useRef(false);
  useEffect(() => {
    if (prevOpenRef.current && !open) {
      (document.getElementById("toc-trigger") as HTMLElement | null)?.focus();
    }
    prevOpenRef.current = open;
  }, [open]);

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
      <span className="text-xs font-semibold tracking-wide text-foreground/72">Modules</span>
    );
  } else if (!effectiveOpenChapter) {
    headerLeft = (
      <button
        onClick={() => { setOpenModule(null); setOpenChapter(null); }}
        className="flex items-center gap-1.5 text-xs text-foreground/72 transition-colors hover:text-foreground"
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
        className="flex items-center gap-1.5 text-xs text-foreground/72 transition-colors hover:text-foreground"
      >
        <span aria-hidden>←</span>
        {isSkipped ? "All modules" : "All chapters"}
      </button>
    );
  }

  return (
    <>
      {/* Home + Trigger — fixed top-left */}
      <nav
        id="site-nav"
        aria-label="Site navigation"
        className={[
          "fixed left-4 top-4 z-50 flex h-12 w-72 items-stretch overflow-hidden rounded-control border border-foreground/8 bg-background/94 backdrop-blur transition-colors duration-150 hover:border-foreground/14 hover:bg-background sm:left-8 sm:top-6",
          open ? "border-b-transparent bg-background" : "",
        ].join(" ")}
        style={{
          borderBottomLeftRadius: open ? 0 : undefined,
          borderBottomRightRadius: open ? 0 : undefined,
        }}
      >
        <Link
          href="/"
          aria-label="Go to home"
          className="group flex items-center justify-center px-3 py-2 text-foreground transition-colors duration-150 hover:bg-foreground/6 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
        >
          <svg viewBox="0 0 89 97" className="h-5 w-5 fill-current transition-colors duration-150 group-hover:text-accent" aria-hidden>
            <path d="M56.3745 17.3517C46.3359 17.3517 41.8185 25.5246 41.8185 35.0805V64H24V32.943C24 14.8369 34.666 0 56.3745 0C78.083 0 89 14.7112 89 32.943V64H71.1815V35.0805C71.1815 25.5246 66.5386 17.3517 56.3745 17.3517Z" />
            <path d="M32.627 79.28C42.1161 79.28 46.9257 70.96 46.9257 61.104V31.792H65.384V63.28C65.384 81.84 54.205 96.816 32.627 96.816C11.179 96.816 0 81.84 0 63.28V31.792H18.4583V61.232C18.4583 70.96 23.1379 79.28 32.627 79.28Z" />
          </svg>
        </Link>

        <button
          id="toc-trigger"
          onClick={() => setOpen((o) => !o)}
          aria-label="Open table of contents"
          className="group flex flex-1 flex-col items-start px-3 py-2 text-left transition-colors duration-150 hover:bg-foreground/6 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent"
        >
          <span className="max-w-[160px] truncate text-[10px] font-medium text-foreground/68 transition-colors duration-150 group-hover:text-foreground/78">
            {currentModule
              ? currentChapter
                ? `${currentModule.title.replace(/^\d+:\s*/, "")} · ${currentChapter.title}`
                : currentModule.title.replace(/^\d+:\s*/, "")
              : "Contents"}
          </span>
          <span className="max-w-[160px] truncate text-xs font-medium text-foreground/78 transition-colors duration-150 group-hover:text-foreground">
            {lessonNumber && <span className="tabular-nums text-foreground/84">{lessonNumber} </span>}{currentSlide?.title ?? ""}
          </span>
        </button>

        <ThemeToggle />
      </nav>

      {/* Floating panel */}
      <motion.div
        className={[
          "fixed left-4 top-16 z-50 flex h-[calc(100svh-5rem)] max-h-[70svh] w-72 origin-top flex-col overflow-hidden rounded-surface border border-t-0 border-foreground/8 bg-background pt-4 sm:left-8 sm:top-[72px]",
          open ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
        style={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
        }}
        initial={false}
        animate={open ? "open" : "closed"}
        variants={reducedMotion ? reducedPanelVariants : panelVariants}
        id="toc-panel"
        aria-modal
        aria-hidden={!open}
        role="dialog"
        aria-label="Table of contents"
      >
        <motion.div
          className="flex h-12 shrink-0 items-center border-b border-foreground/10 px-5"
          variants={reducedMotion ? reducedItemVariants : itemVariants}
        >
          {headerLeft}
        </motion.div>

        <motion.nav
          className="flex flex-1 flex-col overflow-hidden"
          variants={reducedMotion ? reducedContentVariants : contentVariants}
        >
          {!openModule ? (
            /* ── Module list ── */
            <motion.ol
              className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3"
              variants={reducedMotion ? reducedContentVariants : contentVariants}
            >
              {modules.map((m) => {
                const hasActive = m.slides.some((s) => s.key === currentSlideKey);
                const moduleChapters = getChapters(m);
                const isDone = moduleChapters.length > 0 && moduleChapters.every((c) =>
                  isChapterComplete(visited, c.slides.map((s) => s.key))
                );
                return (
                  <motion.li key={m.slug} variants={reducedMotion ? reducedItemVariants : itemVariants}>
                    <button
                      onClick={() => { setOpenModule(m.slug); setOpenChapter(null); }}
                      className={[
                        "flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors",
                        hasActive
                          ? "font-semibold text-accent hover:bg-foreground/6"
                          : isDone
                            ? "text-foreground/68 hover:bg-foreground/6 hover:text-foreground"
                            : "text-foreground/76 hover:bg-foreground/6 hover:text-foreground",
                      ].join(" ")}
                    >
                      {isDone && <Check size={11} className="shrink-0 text-foreground/68" />}
                      <span className={["text-xs leading-5", hasActive ? "font-semibold" : "font-medium"].join(" ")}>
                        {m.title}
                      </span>
                    </button>
                  </motion.li>
                );
              })}
            </motion.ol>
          ) : !effectiveOpenChapter ? (
            /* ── Chapter list ── */
            <motion.div
              className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3"
              variants={reducedMotion ? reducedContentVariants : contentVariants}
            >
              <motion.p
                className="px-2.5 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/68"
                variants={reducedMotion ? reducedItemVariants : itemVariants}
              >
                {mod?.title.replace(/^\d+:\s*/, "")}
              </motion.p>
              <ol>
                {chapters.length > 0 ? chapters.map((chapter, i) => {
                  const hasActive = chapter.slides.some((s) => s.key === currentSlideKey);
                  const isDone = isChapterComplete(visited, chapter.slides.map((s) => s.key));
                  return (
                    <motion.li key={chapter.slug} variants={reducedMotion ? reducedItemVariants : itemVariants}>
                      <button
                        onClick={() => setOpenChapter(chapter.slug)}
                        className={[
                          "flex w-full items-center gap-3 rounded-control px-2.5 py-2.5 text-left transition-colors",
                          hasActive
                            ? "font-semibold text-accent hover:bg-foreground/6"
                            : isDone
                              ? "text-foreground/68 hover:bg-foreground/6 hover:text-foreground"
                              : "text-foreground/76 hover:bg-foreground/6 hover:text-foreground",
                        ].join(" ")}
                      >
                        {isDone ? (
                          <Check size={11} className="shrink-0 text-foreground/68" />
                        ) : (
                          <span className={["shrink-0 text-[10px] tabular-nums", hasActive ? "text-accent" : "text-foreground/68"].join(" ")}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        )}
                        <span className={["flex-1 text-xs leading-5", hasActive ? "font-semibold" : "font-medium"].join(" ")}>{chapter.title}</span>
                        <span className={["shrink-0 text-[10px] tabular-nums", hasActive ? "text-accent" : "text-foreground/68"].join(" ")}>
                          {chapter.slides.length}
                        </span>
                      </button>
                    </motion.li>
                  );
                }) : (
                  <motion.li
                    className="px-2.5 py-2 text-xs italic text-foreground/68"
                    variants={reducedMotion ? reducedItemVariants : itemVariants}
                  >
                    Coming soon
                  </motion.li>
                )}
              </ol>
            </motion.div>
          ) : (
            /* ── Slide list ── */
            <motion.div
              className="scrollbar-thin flex-1 overflow-y-auto px-2.5 py-3"
              variants={reducedMotion ? reducedContentVariants : contentVariants}
            >
              <motion.p
                className="px-2.5 pb-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground/68"
                variants={reducedMotion ? reducedItemVariants : itemVariants}
              >
                {activeChapter?.title}
              </motion.p>
              <ol>
                {chapterSlides.length > 0 ? (
                  chapterSlides.map((slide, i) => {
                    const isActive = slide.key === currentSlideKey;
                    const conceptSlides = chapterSlides.filter(
                      (s) => s.subConceptSlug === slide.subConceptSlug && s.subConceptSlug !== null
                    );
                    const isQuizLocked = (slide.subConceptSlug?.includes("quiz") && slide.key !== conceptSlides[0]?.key)
                      || slide.component === "free-form-question"
                      || slide.component === "question-response";
                    return (
                      <motion.li key={slide.key} variants={reducedMotion ? reducedItemVariants : itemVariants}>
                        {isQuizLocked ? (
                          <span className="flex cursor-default items-baseline gap-3 rounded-control px-2.5 py-2 text-xs leading-5 text-foreground/62 select-none">
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
                                ? "font-semibold text-accent hover:bg-foreground/6"
                                : "text-foreground/76 hover:bg-foreground/6 hover:text-foreground",
                            ].join(" ")}
                          >
                            <span className={[
                              "shrink-0 text-[10px] tabular-nums",
                              isActive ? "text-accent" : "text-foreground/68",
                            ].join(" ")}>
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className={isActive ? "text-accent" : ""}>{slide.title}</span>
                          </Link>
                        )}
                      </motion.li>
                    );
                  })
                ) : (
                  <motion.li
                    className="px-2.5 py-2 text-xs italic text-foreground/68"
                    variants={reducedMotion ? reducedItemVariants : itemVariants}
                  >
                    Coming soon
                  </motion.li>
                )}
              </ol>
            </motion.div>
          )}
        </motion.nav>
      </motion.div>
    </>
  );
}
