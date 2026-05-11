import { ExternalLink } from "lucide-react";
import { type ChapterSourceGroup } from "@/lib/chapter-sources";

type ChapterSourcesListProps = {
  groups: ChapterSourceGroup[];
  moduleSlug?: string;
  conceptSlug?: string;
};

export function ChapterSourcesList({
  groups,
  moduleSlug = "",
  conceptSlug = "",
}: ChapterSourcesListProps) {
  if (groups.length === 0) {
    return (
      <p className="max-w-[60ch] font-body text-body leading-[var(--ds-leading-body)] text-foreground/58">
        Sources for this chapter have not been added yet.
      </p>
    );
  }

  return (
    <div className="space-y-ds-10">
      {groups.map((group) => {
        const headingId = `${moduleSlug}-${conceptSlug}-${group.title.toLowerCase().replace(/\s+/g, "-")}`;

        return (
          <section key={group.title} aria-labelledby={headingId}>
            <h2
              id={headingId}
              className="border-b border-foreground/12 pb-ds-3 font-sans text-label font-semibold uppercase leading-[var(--ds-leading-label)] tracking-[var(--ds-tracking-label)] text-accent"
            >
              {group.title}
            </h2>
            <ol className="divide-y divide-foreground/12">
              {group.items.map((item) => (
                <li key={item.href} className="py-ds-5">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex max-w-[60ch] items-baseline gap-2 font-body text-body font-semibold leading-[var(--ds-leading-body)] !text-foreground/78 transition-colors duration-150 hover:!text-accent"
                  >
                    <span>{item.title}</span>
                    <ExternalLink
                      size={14}
                      className="shrink-0 text-foreground/36 transition-colors duration-150 group-hover:text-accent"
                      aria-hidden
                    />
                  </a>
                  <p className="mt-ds-1 font-sans text-xs font-semibold uppercase leading-5 tracking-[var(--ds-tracking-label)] text-foreground/38">
                    {[item.kind, item.author, item.year].filter(Boolean).join(" / ")}
                  </p>
                  <p className="mt-ds-2 max-w-[60ch] font-body text-sm leading-6 text-foreground/58">
                    {item.note}
                  </p>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
