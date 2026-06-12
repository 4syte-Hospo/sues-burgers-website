import { MenuCategoryBlock } from "../components/menu/MenuCategoryBlock";
import { MenuCategoryNav } from "../components/menu/MenuCategoryNav";
import { MenuPageHero } from "../components/menu/MenuPageHero";
import { menuSections } from "../data/fullMenu";

export function MenuPage() {
  return (
    <>
      <MenuPageHero />
      <MenuCategoryNav />
      {menuSections.map((section) => (
        <MenuCategoryBlock key={section.id} section={section} />
      ))}
    </>
  );
}
