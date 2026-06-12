import type { AllergenKey, AllergenRow, AllergenSection } from "../types/allergens";

export const allergenPage = {
  eyebrow: "Menu safety",
  title: "Allergen Information",
  intro:
    "Use this guide to check which allergens are present in our menu items. Symbols show whether an allergen is contained in the item or may be present as a trace.",
  lastUpdated: "11 June 2025",
  disclaimer:
    "Please be aware that there is always a risk that traces of allergens may be transferred to items from our menu during processing, storage, or preparation (Trace Levels). Sue's Burgers & Shakes is unable to guarantee that any item sold is free from traces of listed allergens.",
  pdfHref: "/docs/SUES-BURGERS-ALLERGEN-STM-2.pdf",
} as const;

export const allergenColumns: { key: AllergenKey; label: string; abbr: string }[] = [
  { key: "dairy", label: "Dairy", abbr: "D" },
  { key: "egg", label: "Egg", abbr: "E" },
  { key: "gluten", label: "Gluten", abbr: "G" },
  { key: "soy", label: "Soy", abbr: "S" },
  { key: "nuts", label: "Nuts", abbr: "N" },
  { key: "onion", label: "Onion", abbr: "O" },
  { key: "garlic", label: "Garlic", abbr: "Ga" },
  { key: "sesame", label: "Sesame", abbr: "Se" },
  { key: "fish", label: "Fish", abbr: "F" },
];

const ALLERGEN_KEYS = allergenColumns.map((column) => column.key);

function parseAllergenRow(name: string, codes: string): AllergenRow {
  const values = codes.trim().split(/\s+/);

  if (values.length !== ALLERGEN_KEYS.length) {
    throw new Error(`Allergen row "${name}" expected ${ALLERGEN_KEYS.length} codes, got ${values.length}`);
  }

  const allergens = Object.fromEntries(
    ALLERGEN_KEYS.map((key, index) => [
      key,
      values[index] === "X" ? "contains" : "traces",
    ]),
  ) as Record<AllergenKey, AllergenRow["allergens"][AllergenKey]>;

  return { name, allergens };
}

function section(id: string, title: string, rows: [string, string][]): AllergenSection {
  return {
    id,
    title,
    rows: rows.map(([name, codes]) => parseAllergenRow(name, codes)),
  };
}

/** Matrix sourced from SUES-BURGERS-ALLERGEN-STM-2.pdf */
export const allergenSections: AllergenSection[] = [
  section("burgers", "Burgers", [
    ["Sue's Classic", "X X X X O X X O O"],
    ["Truffle Cheeseburger", "X X X X O X O O O"],
    ["Signature Sue", "X X X X O X X O O"],
    ["Oklahoma Sue", "X X X X O X X O O"],
    ["Naked Sue", "X X O O O X X O O"],
    ["Southern Fried Chicken", "X X X X O X X O X"],
    ["Dirty Bird", "X X X X O X X X O"],
    ["Grilled Chicken N' Mozza", "X X X X O O X O O"],
    ["Nashville Fried Chicken", "X X X X O X X X O"],
    ["Dave's Burger", "X X X X O X X O X"],
    ["Vegetarian Sue", "X X X X O O X O O"],
    ["Vegan Sue", "O O X X O O X O O"],
  ]),
  section("burger-extras", "Burger Extras", [
    ["Cheese", "X O O O O O O O O"],
    ["Fried Chicken Breast", "X O X O O X X O O"],
    ["Bacon", "O O O O O O O O O"],
    ["Beef Patty", "O O O O O O O O O"],
    ["Onion Rings", "X O X X O X O O O"],
  ]),
  section("raising-daves", "Raising Dave's", [
    ["Raising Dave's Box", "X X X X O X X X X"],
  ]),
  section("sauces", "Sauces", [
    ["Signature Sauce", "O X O O O X X O X"],
    ["Sriracha Mayo", "O X O O O O X X O"],
    ["3-Cheese Sauce", "X O X X O X X O O"],
    ["Aioli", "O X O X O O X O O"],
    ["Vegan Aioli", "O O O X O O X O O"],
    ["Tomato Sauce", "O O O O O O O O O"],
    ["BBQ Sauce", "O O O O O O O O O"],
    ["Dave's Sauce", "O X X O O O X O X"],
  ]),
  section("sides", "Sides", [
    ["Fries", "O O X O O O O O O"],
    ["Onion Rings", "X O X X O X O O O"],
    ["Not Chilli Mozza Sticks", "X X X O O X O O O"],
    ["Chilli Mozza Sticks", "X X X O O X X O O"],
  ]),
  section("loaded-fries", "Loaded Fries", [
    ["Cheese & Bacon Fries", "X X X X O X X O O"],
    ["Burger Fries", "X X X X O X X O O"],
    ["Maple Loaded Fries", "O X X X O O X X O"],
  ]),
  section("kids", "Kids", [
    ["Cheeseburger & Fries", "X X X X O O O O O"],
    ["Nuggs & Fries", "X X X X O O O O O"],
  ]),
  section("classic-thickshakes", "Classic Thickshakes", [
    ["Chocolate", "X O O X O O O O O"],
    ["Strawberry", "X O O X O O O O O"],
    ["Blue Heaven", "X O O O O O O O O"],
    ["Vanilla", "X O X O O O O O O"],
    ["Banana", "X O O O O O O O O"],
    ["Malt", "X O X X O O O O O"],
  ]),
  section("fancy-thickshakes", "Fancy Thickshakes", [
    ["Oreo Cookies N Creme", "X O X X O O O O O"],
    ["Crunchy Biscoff", "X O X X O O O O O"],
    ["Peanut Butter", "X O O O X O O O O"],
    ["Nutella", "X O O X X O O O O"],
    ["Malteser", "X O X X O O O O O"],
    ["Dulce De Leche", "X O O O O O O O O"],
  ]),
  section("misc", "Misc Individual Items", [
    ["Raising Texas Toast", "X X X X O O X X O"],
    ["Gluten Free Bun", "O O O O O O O O O"],
    ["Potato Bun", "O O X X O O X O O"],
    ["Chicken Tender", "X O X O O X X O O"],
  ]),
];
