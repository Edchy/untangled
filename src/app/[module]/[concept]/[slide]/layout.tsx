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

  return (
    <>
      {children}
      <SlideNav previousHref={previous?.href} nextHref={next?.href} />
      <SlideGestures previousHref={previous?.href} nextHref={next?.href} />
    </>
  );
}
