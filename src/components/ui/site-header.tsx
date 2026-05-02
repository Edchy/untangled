import Link from "next/link";

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
        <nav className="flex items-center gap-5 text-sm text-foreground/70">
          <Link className="transition hover:text-foreground" href="/modules">
            Modules
          </Link>
          <Link className="transition hover:text-foreground" href="/learn/01-the-machine/01-what-is-a-computer/01-try-it">
            Start
          </Link>
        </nav>
      </div>
    </header>
  );
}
