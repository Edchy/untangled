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

const chapterSources: Record<string, ChapterSourceGroup[]> = {
  "01-the-machine/01-the-foundation": [
    {
      title: "Sources",
      items: [
        {
          title: "ENIAC: The First Computer",
          kind: "Archive",
          href: "https://www.seas.upenn.edu/about/history-heritage/eniac/",
          author: "Penn Engineering",
          note: "Background on ENIAC and the early electronic-computing thread in the chapter.",
        },
        {
          title: "A Symbolic Analysis of Relay and Switching Circuits",
          kind: "Paper",
          href: "https://dspace.mit.edu/handle/1721.1/11173",
          author: "Claude E. Shannon",
          year: "1938",
          note: "The bridge from switches to logic, and one of the roots of digital circuit design.",
        },
        {
          title: "The Transistor",
          kind: "Archive",
          href: "https://www.computerhistory.org/siliconengine/invention-of-the-point-contact-transistor/",
          author: "Computer History Museum",
          note: "A concise institutional history of the tiny switch that made modern computers possible.",
        },
      ],
    },
    {
      title: "Further reading",
      items: [
        {
          title: "Computer: A History of the Information Machine",
          kind: "Book",
          href: "https://mitpressbookstore.mit.edu/book/9780813345901",
          author: "Martin Campbell-Kelly, William Aspray, Nathan Ensmenger, and Jeffrey Yost",
          note: "A broad history of computing, useful after the chapter's compressed version.",
        },
      ],
    },
  ],
  "01-the-machine/02-the-logic": [
    {
      title: "Sources",
      items: [
        {
          title: "A Symbolic Analysis of Relay and Switching Circuits",
          kind: "Paper",
          href: "https://dspace.mit.edu/handle/1721.1/11173",
          author: "Claude E. Shannon",
          year: "1938",
          note: "The classic source for treating electrical switches as logic.",
        },
        {
          title: "Code: The Hidden Language of Computer Hardware and Software",
          kind: "Book",
          href: "https://www.microsoftpressstore.com/store/code-the-hidden-language-of-computer-hardware-and-software-9780137909100",
          author: "Charles Petzold",
          note: "A friendly, concrete path from simple signals to real computers.",
        },
      ],
    },
    {
      title: "Further reading",
      items: [
        {
          title: "Nand2Tetris",
          kind: "Video",
          href: "https://www.nand2tetris.org/",
          author: "Noam Nisan and Shimon Schocken",
          note: "For readers who want to build the logic stack themselves, step by step.",
        },
      ],
    },
  ],
  "02-can-machines-think/01-the-question": [
    {
      title: "Sources",
      items: [
        {
          title: "Computing Machinery and Intelligence",
          kind: "Paper",
          href: "https://academic.oup.com/mind/article/LIX/236/433/986238",
          author: "Alan M. Turing",
          year: "1950",
          note: "The paper that introduces the imitation game and reframes the question of machine thought.",
        },
        {
          title: "Alan Turing: The Enigma",
          kind: "Book",
          href: "https://www.turing.org.uk/book/",
          author: "Andrew Hodges",
          note: "Biographical context for Turing's life, work, prosecution, and legacy.",
        },
      ],
    },
  ],
  "02-can-machines-think/02-the-summer-everything-seemed-possible": [
    {
      title: "Sources",
      items: [
        {
          title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence",
          kind: "Archive",
          href: "http://jmc.stanford.edu/articles/dartmouth/dartmouth.pdf",
          author: "John McCarthy, Marvin Minsky, Nathaniel Rochester, and Claude Shannon",
          year: "1955",
          note: "The founding proposal that named artificial intelligence as a research field.",
        },
        {
          title: "The Logic Theory Machine",
          kind: "Paper",
          href: "https://www.rand.org/pubs/papers/P868.html",
          author: "Allen Newell and Herbert A. Simon",
          year: "1956",
          note: "A primary source around one of the early programs that made symbolic AI feel possible.",
        },
      ],
    },
    {
      title: "Further reading",
      items: [
        {
          title: "The Quest for Artificial Intelligence",
          kind: "Book",
          href: "https://www.cambridge.org/core/product/identifier/9780511819346/type/book",
          author: "Nils J. Nilsson",
          note: "A readable history of early AI from someone inside the field.",
        },
      ],
    },
  ],
  "02-can-machines-think/03-what-understanding-actually-is": [
    {
      title: "Sources",
      items: [
        {
          title: "Minds, Brains, and Programs",
          kind: "Paper",
          href: "https://www.cambridge.org/core/journals/behavioral-and-brain-sciences/article/minds-brains-and-programs/DC644B47A4299C637C89772FACC2706A",
          author: "John R. Searle",
          year: "1980",
          note: "The original Chinese room argument, central to the chapter's understanding question.",
        },
        {
          title: "The Society of Mind",
          kind: "Book",
          href: "https://www.simonandschuster.com/books/The-Society-of-Mind/Marvin-Minsky/9780671657130",
          author: "Marvin Minsky",
          note: "A contrasting view of mind as many small processes working together.",
        },
      ],
    },
  ],
  "03-the-long-winter/01-the-promise-and-the-crash": [
    {
      title: "Sources",
      items: [
        {
          title: "ELIZA: A Computer Program for the Study of Natural Language Communication Between Man and Machine",
          kind: "Paper",
          href: "https://dl.acm.org/doi/10.1145/365153.365168",
          author: "Joseph Weizenbaum",
          year: "1966",
          note: "The original ELIZA paper, useful for separating convincing conversation from understanding.",
        },
        {
          title: "Artificial Intelligence: A General Survey",
          kind: "Report",
          href: "https://www.chilton-computing.org.uk/inf/literature/reports/lighthill_report/p001.htm",
          author: "James Lighthill",
          year: "1973",
          note: "The report associated with the first major collapse of UK AI funding.",
        },
      ],
    },
  ],
  "03-the-long-winter/02-the-expert-systems-era": [
    {
      title: "Sources",
      items: [
        {
          title: "Rule-Based Expert Systems: The MYCIN Experiments of the Stanford Heuristic Programming Project",
          kind: "Book",
          href: "https://shortliffe.net/Buchanan-Shortliffe-1984/MYCIN%20Book.htm",
          author: "Bruce G. Buchanan and Edward H. Shortliffe",
          note: "A detailed account of MYCIN and the expert-systems approach.",
        },
        {
          title: "The Fifth Generation: Artificial Intelligence and Japan's Computer Challenge to the World",
          kind: "Book",
          href: "https://openlibrary.org/works/OL2998833W/The_Fifth_Generation",
          author: "Edward A. Feigenbaum and Pamela McCorduck",
          note: "Context for the optimism and pressure around expert systems and dedicated AI hardware.",
        },
      ],
    },
  ],
  "03-the-long-winter/03-what-the-cold-taught-us": [
    {
      title: "Sources",
      items: [
        {
          title: "Perceptrons",
          kind: "Book",
          href: "https://mitpress.mit.edu/9780262631112/perceptrons/",
          author: "Marvin Minsky and Seymour Papert",
          note: "A key text in the story of connectionism's setbacks and later return.",
        },
        {
          title: "Parallel Distributed Processing",
          kind: "Book",
          href: "https://mitpress.mit.edu/9780262680530/parallel-distributed-processing/",
          author: "David E. Rumelhart, James L. McClelland, and the PDP Research Group",
          note: "One of the works that helped revive neural-network thinking after the symbolic era.",
        },
      ],
    },
  ],
};

export function getChapterSources(moduleSlug: string, conceptSlug: string) {
  return chapterSources[`${moduleSlug}/${conceptSlug}`] ?? [];
}
