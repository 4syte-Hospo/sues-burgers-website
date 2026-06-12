import { menuCategoryNav } from "../../data/fullMenu";
import "./MenuCategoryNav.css";

export function MenuCategoryNav() {
  return (
    <nav className="menu-cat-nav" aria-label="Menu categories">
      <div className="menu-cat-nav__scroll container">
        <ul className="menu-cat-nav__list">
          {menuCategoryNav.map((cat, index) => (
            <li key={cat.id}>
              <a
                href={`#${cat.id}`}
                className={`menu-cat-nav__pill ${index === 0 ? "menu-cat-nav__pill--active" : ""}`}
              >
                {cat.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
