import { notFound } from "next/navigation";
import { createElement } from "react";
import { BookSidebar } from "@/components/ui/book-sidebar";
import {
  getInteractiveComponent,
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

  const modules = getModuleList();
  const InteractiveContent = current.component
    ? getInteractiveComponent(current.component)
    : null;
  const renderedSlideContent = SlideContent ? (
    createElement(SlideContent)
  ) : (
    <div dangerouslySetInnerHTML={{ __html: current.html }} />
  );
  const textColumnClassName = "relative z-10";

  return (
    <div className="flex min-h-svh flex-col items-center justify-center px-8 py-16 sm:px-16 sm:py-24">
      <BookSidebar modules={modules} currentSlideKey={current.key} />

      {current.cols === 1 ? (
        <div className="flex w-full max-w-2xl flex-col items-center">
          {InteractiveContent ? (
            createElement(InteractiveContent)
          ) : (
            <div className={textColumnClassName}>
              <h1 className="mb-3 text-[1.0625rem] font-semibold leading-[1.85] text-foreground/40">
                {current.title}
              </h1>
              {renderedSlideContent}
            </div>
          )}
        </div>
      ) : (
        <div className="grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_1fr]">
          <div className="flex items-center justify-center">
            {InteractiveContent && createElement(InteractiveContent)}
          </div>

          <div className={textColumnClassName}>
            <h1 className="mb-3 text-[1.0625rem] font-semibold leading-[1.85] text-foreground/40">
              {current.title}
            </h1>
            {renderedSlideContent}
          </div>
        </div>
      )}
    </div>
  );
}
