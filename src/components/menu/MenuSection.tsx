import type { MenuItem } from "../../types/menu";
import { MenuCard } from "./MenuCard";
import "./MenuSection.css";

type Props = {
  items: MenuItem[];
};

export function MenuSection({ items }: Props) {
  return (
    <section id="menu" className="menu-section section">
      <div className="container">
        <h2 className="section-title menu-section__title">Fan favourites</h2>
        <div className="menu-section__grid">
          {items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
