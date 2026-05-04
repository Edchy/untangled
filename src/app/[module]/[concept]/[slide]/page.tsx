import { notFound, redirect } from "next/navigation";
import { createElement } from "react";
import { BookSidebar } from "@/components/ui/book-sidebar";
import { RevealAnswer } from "@/components/ui/reveal-answer";
import { SlideTransition } from "@/components/ui/slide-transition";
import {
  getAdjacentSlides,
  getInteractiveComponent,
  getModuleList,
  getSlide,
  getSlideComponent,
  getSlides,
} from "@/lib/content";

const REVEAL_RE = /<reveal-answer data-answer="([^"]*)"><\/reveal-answer>/g;

function renderHtml(html: string) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  REVEAL_RE.lastIndex = 0;
  while ((match = REVEAL_RE.exec(html)) !== null) {
    if (match.index > last) {
      parts.push(<div key={i++} dangerouslySetInnerHTML={{ __html: html.slice(last, match.index) }} />);
    }
    parts.push(<RevealAnswer key={i++} answer={match[1].replace(/&quot;/g, '"')} />);
    last = match.index + match[0].length;
  }
  if (last < html.length) {
    parts.push(<div key={i++} dangerouslySetInnerHTML={{ __html: html.slice(last) }} />);
  }
  return <>{parts}</>;
}

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

  if (current.subConceptSlug?.includes("quiz")) {
    const allSlides = getSlides();
    const conceptSlides = allSlides.filter(
      (s) => s.moduleSlug === current.moduleSlug && s.subConceptSlug === current.subConceptSlug
    );
    const entrySlide = conceptSlides[0];
    if (entrySlide && entrySlide.key !== current.key) {
      redirect(entrySlide.href);
    }
  }

  const SlideContent = getSlideComponent(current.key);

  const modules = getModuleList();
  const InteractiveContent = current.component
    ? getInteractiveComponent(current.component)
    : null;
  const { next } = getAdjacentSlides(current);
  const renderedSlideContent = SlideContent
    ? createElement(SlideContent)
    : renderHtml(current.html);
  const textColumnClassName = "relative z-10";

  const interactiveProps: Record<string, unknown> = {};
  if (current.questionId) interactiveProps.questionId = current.questionId;
  if (next) interactiveProps.nextHref = next.href;
  if (current.component === "free-form-question") interactiveProps.bodyHtml = current.html;
  if (current.skipHref) interactiveProps.skipHref = current.skipHref;
  if (current.redirectHref) interactiveProps.redirectHref = current.redirectHref;

  const slideBody = current.cols === 1 ? (
    <div className={`flex w-full flex-col items-center ${InteractiveContent ? "max-w-5xl" : "max-w-2xl"}`}>
      {InteractiveContent ? (
        createElement(InteractiveContent, interactiveProps)
      ) : (
        <div className={textColumnClassName}>
          {!current.hideTitle && (
            <h1 className="mb-4 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-foreground/68 [text-wrap:balance]">
              {current.title}
            </h1>
          )}
          {renderedSlideContent}
        </div>
      )}
    </div>
  ) : (
    <div className="grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_1fr]">
      {current.flipCols ? (
        <>
          <div className={textColumnClassName}>
            {!current.hideTitle && (
              <h1 className="mb-4 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-foreground/68 [text-wrap:balance]">
                {current.title}
              </h1>
            )}
            {renderedSlideContent}
          </div>
          <div className="flex items-center justify-center">
            {InteractiveContent && createElement(InteractiveContent, interactiveProps)}
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center">
            {InteractiveContent && createElement(InteractiveContent, interactiveProps)}
          </div>
          <div className={textColumnClassName}>
            {!current.hideTitle && (
              <h1 className="mb-4 font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-semibold leading-[1.2] text-foreground/68 [text-wrap:balance]">
                {current.title}
              </h1>
            )}
            {renderedSlideContent}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-8 py-16 sm:px-16 sm:py-24">
      <BookSidebar modules={modules} currentSlideKey={current.key} />
      <SlideTransition>{slideBody}</SlideTransition>
    </div>
  );
}
