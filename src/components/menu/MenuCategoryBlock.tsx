import type { MenuCategorySection } from "../../types/menu";
import { ORDER_URL } from "../../data/site";
import { MenuCard } from "./MenuCard";
import "./MenuCategoryBlock.css";

type Props = {
  section: MenuCategorySection;
};

export function MenuCategoryBlock({ section }: Props) {
  return (
    <section
      className="menu-category section"
      aria-labelledby={section.id}
    >
      <div className="container">
        <header className="menu-category__header">
          <div className="menu-category__titles">
            {section.eyebrow && (
              <p className="menu-category__eyebrow">{section.eyebrow}</p>
            )}
            <h2 id={section.id} className="menu-category__title">
              {section.title}
            </h2>
          </div>
          <p className="menu-category__description">{section.description}</p>
        </header>

        <div className="menu-category__grid">
          {section.items.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>

        <div className="menu-category__footer">
          <a
            href={ORDER_URL}
            className="btn btn--outline menu-category__view-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            View all {section.title}
          </a>
        </div>
      </div>
    </section>
  );
}
