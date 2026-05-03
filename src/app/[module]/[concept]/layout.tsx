import { ChapterAnswersProvider } from "@/components/interactive/chapter-answers-context";

export default function ConceptLayout({ children }: { children: React.ReactNode }) {
  return <ChapterAnswersProvider>{children}</ChapterAnswersProvider>;
}
