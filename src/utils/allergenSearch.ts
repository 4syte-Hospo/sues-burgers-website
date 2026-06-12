import { allergenSections } from "../data/allergens";

export type AllergenSearchResult = {
  id: string;
  name: string;
  sectionId: string;
  sectionTitle: string;
};

export function getAllergenItemId(sectionId: string, itemName: string): string {
  const slug = itemName
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return `allergen-item-${sectionId}-${slug}`;
}

export const allergenSearchIndex: AllergenSearchResult[] = allergenSections.flatMap(
  (section) =>
    section.rows.map((row) => ({
      id: getAllergenItemId(section.id, row.name),
      name: row.name,
      sectionId: section.id,
      sectionTitle: section.title,
    })),
);

export function searchAllergenItems(query: string, limit = 8): AllergenSearchResult[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const scored = allergenSearchIndex
    .map((item) => {
      const name = item.name.toLowerCase();
      const section = item.sectionTitle.toLowerCase();

      if (name === normalized) return { item, score: 0 };
      if (name.startsWith(normalized)) return { item, score: 1 };
      if (name.includes(normalized)) return { item, score: 2 };
      if (section.includes(normalized)) return { item, score: 3 };
      if (normalized.split(/\s+/).every((word) => name.includes(word))) return { item, score: 4 };
      return null;
    })
    .filter((entry): entry is { item: AllergenSearchResult; score: number } => entry !== null)
    .sort((a, b) => a.score - b.score || a.item.name.localeCompare(b.item.name));

  return scored.slice(0, limit).map(({ item }) => item);
}

/** Resolves the visible allergen row/card — mobile and desktop share the same logical id. */
export function getAllergenItemElement(id: string): HTMLElement | null {
  const escaped = CSS.escape(id);
  const candidates = document.querySelectorAll<HTMLElement>(
    `[data-allergen-item-id="${escaped}"]`,
  );

  for (const candidate of candidates) {
    if (candidate.getClientRects().length > 0) {
      return candidate;
    }
  }

  return document.getElementById(id);
}

export function scrollToAllergenItem(id: string): boolean {
  const target = getAllergenItemElement(id);
  if (!target) return false;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.classList.add("allergen-item-target--flash");

  window.setTimeout(() => {
    target.classList.remove("allergen-item-target--flash");
  }, 2200);

  if (window.location.hash !== `#${id}`) {
    history.replaceState(null, "", `#${id}`);
  }

  return true;
}
