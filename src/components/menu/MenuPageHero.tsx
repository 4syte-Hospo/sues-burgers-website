import { Link } from "react-router-dom";
import { menuHero } from "../../data/fullMenu";
import { ORDER_URL } from "../../data/site";
import { trackOrderNowClick } from "../../utils/analytics";
import { getActiveSlides } from "../../utils/data";
import { MenuHeroCarousel } from "./MenuHeroCarousel";
import "./MenuPageHero.css";

export function MenuPageHero() {
  const heroSlides = getActiveSlides();

  return (
    <section className="menu-hero">
      <div className="menu-hero__inner container">
        <div className="menu-hero__copy">
          <p className="menu-hero__eyebrow">{menuHero.eyebrow}</p>
          <h1 className="menu-hero__title">{menuHero.title}</h1>
          <p className="menu-hero__body">{menuHero.body}</p>
          <div className="menu-hero__actions">
            <a
              href={ORDER_URL}
              className="btn btn--primary"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackOrderNowClick("menu_hero")}
            >
              Order Now
            </a>
            <Link to={menuHero.allergenHref} className="btn btn--outline menu-hero__btn-alt">
              Allergen Info
            </Link>
            <a href={menuHero.pdfHref} className="btn btn--outline menu-hero__btn-alt">
              PDF Menu
            </a>
          </div>
        </div>
        <div className="menu-hero__media">
          <MenuHeroCarousel slides={heroSlides} />
        </div>
      </div>
    </section>
  );
}
