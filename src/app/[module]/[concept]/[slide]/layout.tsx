import { SlideNav } from "@/components/ui/slide-nav";
import { SlideGestures } from "@/components/ui/slide-gestures";
import { ChapterEndNav } from "@/components/interactive/chapter-end-nav";
import { getAdjacentSlides, getSlide, getSlides } from "@/lib/content";

type SlideLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ module: string; concept: string; slide: string }>;
};

export default async function SlideLayout({ children, params }: SlideLayoutProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);
  const { previous, next } = current ? getAdjacentSlides(current) : { previous: undefined, next: undefined };
  const isQuizQuestion = current?.component === "free-form-question";
  const isQuizResponse = current?.component === "question-response";
  const isQuizGate = current?.component === "quiz-gate";
  const showKeyboardHint = current?.key === "01-the-machine/01-the-foundation/01-try-it";

  // A chapter-end slide is the last slide of its chapter: no next slide, or next is a different chapter
  const isChapterEnd = !!current && (!next || next.conceptSlug !== current.conceptSlug);

  const nextHref = isQuizQuestion
    ? current?.skipHref ?? next?.href
    : isQuizResponse
      ? next?.href
    : current?.hideNavNext
      ? current?.skipHref ?? undefined
      : next?.href;

  // For the last quiz question: if the user has no answers to submit, skip past the response slide
  const responseSlide = isQuizQuestion && current?.isLastQuestion
    ? getSlides().find((s) => s.moduleSlug === current.moduleSlug && s.conceptSlug === current.conceptSlug && s.component === "question-response")
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
    ? getSlides().find((item) => item.moduleSlug === current.moduleSlug && item.conceptSlug === current.conceptSlug)?.href
    : undefined;

  return (
    <>
      {children}
      <SlideGestures
        previousHref={previousHref}
        nextHref={isChapterEnd ? undefined : nextHref}
        disableNext={!isChapterEnd && !isQuizQuestion && !isQuizResponse && current?.hideNavNext && !!current?.skipHref}
      />
      {isChapterEnd ? (
        <ChapterEndNav previousHref={previousHref} nextChapterHref={next?.href} shareHref={chapterStartHref} />
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
