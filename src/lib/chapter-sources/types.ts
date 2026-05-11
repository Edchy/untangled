export type ChapterSourceKind = "Article" | "Book" | "Paper" | "Report" | "Video" | "Archive";

export type ChapterSource = {
  title: string;
  kind: ChapterSourceKind;
  href: string;
  author?: string;
  year?: string;
  note: string;
};

export type ChapterSourceGroup = {
  title: string;
  items: ChapterSource[];
};
