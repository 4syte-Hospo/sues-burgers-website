export type FaqAnswerBlock =
  | { type: "paragraph"; content: string }
  | { type: "heading"; content: string }
  | { type: "list"; items: string[] }
  | { type: "link"; label: string; href: string; external?: boolean };

export type FaqItem = {
  id: string;
  question: string;
  answer: FaqAnswerBlock[];
  /** Show allergen information link at the bottom of the answer. */
  dietRelated?: boolean;
};
