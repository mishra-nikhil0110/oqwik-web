// lib/legal/types.ts - the shape of a legal document, rendered by
// components/legal/LegalPage.tsx (table of contents, numbered sections).

export type LegalItem = string | { term: string; text: string };

export type LegalBlock =
  | { type: "p"; text: string; link?: { href: string; label: string } }
  | { type: "ul"; items: LegalItem[] }
  | { type: "contact" };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  eyebrow: string;
  title: string;
  /** Meta description for search results. */
  description: string;
  intro: string;
  /** Plain-language summary shown above the full text. */
  summary: string[];
  sections: LegalSection[];
};
