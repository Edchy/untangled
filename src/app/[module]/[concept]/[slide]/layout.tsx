import { SlideNav } from "@/components/ui/slide-nav";
import { SlideGestures } from "@/components/ui/slide-gestures";
import { ChapterEndNav } from "@/components/interactive/chapter-end-nav";
import { getAdjacentSlides, getSlide, getSlides, modules } from "@/lib/content";

type SlideLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ module: string; concept: string; slide: string }>;
};

export default async function SlideLayout({ children, params }: SlideLayoutProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);
  const slides = getSlides();
  const { previous, next } = current ? getAdjacentSlides(current) : { previous: undefined, next: undefined };
  const isQuizQuestion = current?.component === "free-form-question";
  const isQuizResponse = current?.component === "question-response";
  const showKeyboardHint = current?.key === "01-the-machine/01-the-foundation/01-try-it";

  // A chapter-end slide is the last slide of its chapter: no next slide, or next is a different chapter.
  // If the chapter has a sources slide, the original wrap-up slide should still show the chapter-end choices.
  const isChapterEnd = !!current && (!next || next.conceptSlug !== current.conceptSlug);
  const sourcesSlide = current && next?.type === "sources" ? next : undefined;
  const destinationSlide = sourcesSlide ? getAdjacentSlides(sourcesSlide).next : next;
  const showChapterEndNav = isChapterEnd || !!sourcesSlide;
  const isModuleEnd = !!current && showChapterEndNav && !!destinationSlide && destinationSlide.moduleSlug !== current.moduleSlug;
  const nextModule = isModuleEnd ? modules.find((item) => item.slug === destinationSlide.moduleSlug) : undefined;
  const nextChapter = destinationSlide
    ? slides.find((item) => item.moduleSlug === destinationSlide.moduleSlug && item.conceptSlug === destinationSlide.conceptSlug && item.type === "cover")
    : undefined;
  const nextDestination = !destinationSlide
    ? { kind: "complete" as const }
    : isModuleEnd
      ? {
          kind: "module" as const,
          href: destinationSlide.href,
          moduleTitle: nextModule?.title ?? destinationSlide.module,
          moduleNumber: nextModule?.number,
          chapterTitle: nextChapter?.title ?? destinationSlide.concept,
        }
      : {
          kind: "chapter" as const,
          href: destinationSlide.href,
          chapterTitle: nextChapter?.title ?? destinationSlide.concept,
        };

  const nextHref = isQuizQuestion
    ? current?.skipHref ?? next?.href
    : isQuizResponse
      ? next?.href
    : current?.hideNavNext
      ? current?.skipHref ?? undefined
      : next?.href;

  // For the last quiz question: if the user has no answers to submit, skip past the response slide
  const responseSlide = isQuizQuestion && current?.isLastQuestion
    ? slides.find((s) => s.moduleSlug === current.moduleSlug && s.conceptSlug === current.conceptSlug && s.component === "question-response")
    : undefined;
  const noAnswerSkipHref = responseSlide
    ? getAdjacentSlides(responseSlide).next?.href
    : undefined;
  const nextLabel = isQuizQuestion
    ? "skip question"
    : current?.hideNavNext && current?.skipHref && !isQuizResponse
      ? "skip quiz"
      : undefined;

  const previousHref = current?.backHref ?? previous?.href;
  const chapterStartHref = current
    ? slides.find((item) => item.moduleSlug === current.moduleSlug && item.conceptSlug === current.conceptSlug)?.href
    : undefined;

  return (
    <>
      {children}
      <SlideGestures
        previousHref={previousHref}
        nextHref={showChapterEndNav ? undefined : nextHref}
        disableNext={!showChapterEndNav && !isQuizQuestion && !isQuizResponse && current?.hideNavNext && !!current?.skipHref}
      />
      {showChapterEndNav ? (
        <ChapterEndNav
          previousHref={previousHref}
          nextDestination={nextDestination}
          shareHref={chapterStartHref}
          sourcesHref={sourcesSlide?.href}
        />
      ) : (
        <SlideNav
          previousHref={previousHref}
          nextHref={nextHref}
          nextLabel={nextLabel}
          nextSubmitQuestionId={isQuizQuestion && current?.isLastQuestion ? current.questionId ?? undefined : undefined}
          skipQuestionId={isQuizQuestion ? current.questionId ?? undefined : undefined}
          noAnswerSkipHref={noAnswerSkipHref}
          showKeyboardHint={showKeyboardHint}
        />
      )}
    </>
  );
}
