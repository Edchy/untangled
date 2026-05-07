import Link from "next/link";
import { Text } from "@/components/ui/typography";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-foreground/10 bg-background/88 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link
          href="/"
          className="font-serif text-2xl font-semibold tracking-normal text-foreground"
        >
          Untangled
        </Link>
        <Text as="nav" variant="caption" className="flex items-center gap-5 text-sm text-foreground/70">
          <Link className="hover:text-accent" href="/modules">
            Modules
          </Link>
          <Link className="hover:text-accent" href="/01-the-machine/01-the-foundation/01-try-it">
            Start
          </Link>
        </Text>
      </div>
    </header>
  );
}
