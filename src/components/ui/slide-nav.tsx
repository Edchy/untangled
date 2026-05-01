import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SlideNavProps = {
  previousHref?: string;
  nextHref?: string;
};

export function SlideNav({ previousHref, nextHref }: SlideNavProps) {
  return (
    <nav
      aria-label="Slide navigation"
      className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-6"
    >
      {previousHref ? (
        <Link
          href={previousHref}
          aria-label="Previous slide"
          className="text-foreground/36 transition-colors duration-150 hover:text-foreground"
        >
          <ArrowLeft size={16} />
        </Link>
      ) : (
        <div className="w-4" />
      )}
      {nextHref ? (
        <Link
          href={nextHref}
          aria-label="Next slide"
          className="text-foreground/36 transition-colors duration-150 hover:text-foreground"
        >
          <ArrowRight size={16} />
        </Link>
      ) : null}
    </nav>
  );
}
