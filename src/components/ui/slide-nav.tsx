import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

type SlideNavProps = {
  previousHref?: string;
  nextHref?: string;
  nextLabel?: string;
};

export function SlideNav({ previousHref, nextHref, nextLabel }: SlideNavProps) {
  return (
    <nav
      aria-label="Slide navigation"
      className="fixed bottom-8 left-1/2 flex -translate-x-1/2 items-center gap-6"
    >
      {previousHref ? (
        <Link
          href={previousHref}
          transitionTypes={["nav-back"]}
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
          transitionTypes={["nav-forward"]}
          aria-label="Next slide"
          className="flex items-center gap-2 text-foreground/36 transition-colors duration-150 hover:text-foreground"
        >
          <ArrowRight size={16} />
          {nextLabel && <span className="text-xs text-foreground/36">({nextLabel})</span>}
        </Link>
      ) : null}
    </nav>
  );
}
