export type AllergenKey =
  | "dairy"
  | "egg"
  | "gluten"
  | "soy"
  | "nuts"
  | "onion"
  | "garlic"
  | "sesame"
  | "fish";

export type AllergenStatus = "contains" | "traces";

export type AllergenRow = {
  name: string;
  allergens: Record<AllergenKey, AllergenStatus>;
};

export type AllergenSection = {
  id: string;
  title: string;
  rows: AllergenRow[];
};
