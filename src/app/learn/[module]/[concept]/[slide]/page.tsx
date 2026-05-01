import Link from "next/link";
import { notFound } from "next/navigation";
import { createElement } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BookSidebar } from "@/components/ui/book-sidebar";
import {
  getAdjacentSlides,
  getModuleList,
  getSlide,
  getSlideComponent,
  getSlides,
} from "@/lib/content";

type SlidePageProps = {
  params: Promise<{
    module: string;
    concept: string;
    slide: string;
  }>;
};

export function generateStaticParams() {
  return getSlides().map((slide) => ({
    module: slide.moduleSlug,
    concept: slide.conceptSlug,
    slide: slide.slideSlug,
  }));
}

export async function generateMetadata({ params }: SlidePageProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);
  return {
    title: current ? `${current.title} | Untangled` : "Untangled",
  };
}

export default async function SlidePage({ params }: SlidePageProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);

  if (!current) notFound();

  const SlideContent = getSlideComponent(current.key);
  if (!SlideContent) notFound();

  const modules = getModuleList();
  const { previous, next } = getAdjacentSlides(current);

  const currentModule = modules.find((m) => m.slug === current.moduleSlug);
  const lessonIndex = currentModule?.slides.findIndex((s) => s.key === current.key) ?? -1;
  const lessonNumber = lessonIndex >= 0 ? String(lessonIndex + 1).padStart(2, "0") : null;

  return (
    <div>
      <BookSidebar modules={modules} currentSlideKey={current.key} />

      <main className="flex min-h-svh items-center justify-center">
        <article className="w-full max-w-2xl px-8 py-20 sm:px-12">
          {/* Slide heading */}
          <header className="mb-10">
            {lessonNumber && (
              <p className="text-xs font-medium tabular-nums text-foreground/36">
                {lessonNumber}
              </p>
            )}
            <h1 className="mt-3 text-xl font-semibold leading-snug text-foreground">
              {current.title}
            </h1>
          </header>

          {/* Content */}
          <div>{createElement(SlideContent)}</div>

          {/* Navigation */}
          <nav
            aria-label="Slide navigation"
            className="mt-16 flex items-center justify-between gap-4 border-t border-foreground/10 pt-8"
          >
            {previous ? (
              <Link
                href={previous.href}
                className="flex items-center gap-2 rounded-[8px] px-3 py-2 text-xs text-foreground/44 transition-colors hover:bg-foreground/6 hover:text-foreground"
              >
                <ArrowLeft size={13} />
                <span>{previous.title}</span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={next.href}
                className="flex items-center gap-2 rounded-[8px] bg-foreground px-4 py-2 text-xs font-medium text-background transition-colors hover:bg-accent"
              >
                <span>{next.title}</span>
                <ArrowRight size={13} />
              </Link>
            ) : null}
          </nav>
        </article>
      </main>
    </div>
  );

}
