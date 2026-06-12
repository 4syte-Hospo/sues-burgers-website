import { menuSections } from "../data/fullMenu";
import type { MenuItem } from "../types/menu";

export function getFanFavouriteItems(): MenuItem[] {
  return menuSections
    .flatMap((section) => section.items)
    .filter((item) => item.fanFavourite);
}
