import { getChapterSources } from "@/lib/chapter-sources";
import { Heading, Text } from "@/components/ui/typography";
import { ChapterSourcesList } from "./chapter-sources-list";

type ChapterSourcesProps = {
  moduleSlug?: string;
  conceptSlug?: string;
};

export function ChapterSources({ moduleSlug = "", conceptSlug = "" }: ChapterSourcesProps) {
  const groups = getChapterSources(moduleSlug, conceptSlug);

  return (
    <section className="w-full max-w-3xl">
      <Text variant="label" className="mb-ds-3">
        Endnotes
      </Text>
      <Heading as="h1" variant="headline" className="mb-heading-after">
        Sources and further reading
      </Heading>
      <Text variant="muted">
        The chapter keeps the story simple. These are the places behind it, plus a few doors for going deeper.
      </Text>

      <div className="mt-ds-10">
        <ChapterSourcesList
          groups={groups}
          moduleSlug={moduleSlug}
          conceptSlug={conceptSlug}
        />
      </div>
    </section>
  );
}
