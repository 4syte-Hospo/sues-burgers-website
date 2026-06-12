export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price?: number;
  /** Display when price isn’t a single number (e.g. "SNACK $5 | REG $6") */
  priceLabel?: string;
  image?: string;
  badge?: string;
  orderLink?: string;
  fanFavourite?: boolean;
};

export type MenuCategorySection = {
  id: string;
  navLabel: string;
  eyebrow?: string;
  title: string;
  description: string;
  items: MenuItem[];
};

export type MenuCategoryNavItem = {
  id: string;
  label: string;
};
