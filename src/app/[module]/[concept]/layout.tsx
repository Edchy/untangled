import { ChapterAnswersProvider } from "@/components/interactive/chapter-answers-context";

type ConceptLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ module: string; concept: string }>;
};

export default async function ConceptLayout({ children, params }: ConceptLayoutProps) {
  const { concept } = await params;
  return <ChapterAnswersProvider conceptSlug={concept}>{children}</ChapterAnswersProvider>;
}
