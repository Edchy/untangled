import { SlideNav } from "@/components/ui/slide-nav";
import { SlideGestures } from "@/components/ui/slide-gestures";
import { getAdjacentSlides, getSlide } from "@/lib/content";

type SlideLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ module: string; concept: string; slide: string }>;
};

export default async function SlideLayout({ children, params }: SlideLayoutProps) {
  const { module, concept, slide } = await params;
  const current = getSlide(module, concept, slide);
  const { previous, next } = current ? getAdjacentSlides(current) : { previous: undefined, next: undefined };
  const isQuizQuestion = current?.component === "free-form-question";
  const nextHref = isQuizQuestion
    ? current?.skipHref ?? next?.href
    : current?.hideNavNext
      ? current?.skipHref ?? undefined
      : next?.href;
  const nextLabel = isQuizQuestion
    ? "skip question"
    : current?.hideNavNext && current?.skipHref
      ? "skip quiz"
      : undefined;

  return (
    <>
      {children}
      <SlideGestures
        previousHref={current?.backHref ?? previous?.href}
        nextHref={nextHref}
        disableNext={!isQuizQuestion && current?.hideNavNext && !!current?.skipHref}
      />
      <SlideNav
        previousHref={current?.backHref ?? previous?.href}
        nextHref={nextHref}
        nextLabel={nextLabel}
      />
    </>
  );
}
