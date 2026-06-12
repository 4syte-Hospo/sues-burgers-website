import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LOGO_SRC, navLinks, ORDER_URL } from "../data/site";
import "./Header.css";

function HeaderNavItem({
  href,
  label,
  onNavigate,
  linkClassName,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
  linkClassName: "header__link" | "header__drawer-link";
}) {
  if (href.startsWith("/")) {
    return (
      <NavLink
        to={href}
        className={({ isActive }) =>
          `${linkClassName}${isActive ? ` ${linkClassName}--active` : ""}`
        }
        onClick={onNavigate}
        end={href === "/"}
      >
        {label}
      </NavLink>
    );
  }

  return (
    <a href={href} className={linkClassName} onClick={onNavigate}>
      {label}
    </a>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header">
      <div className="header__bar">
        <div className="header__inner container">
          <Link to="/" className="header__logo" aria-label="Sue's Burgers home">
            <img src={LOGO_SRC} alt="Sue's" width={160} height={64} />
          </Link>

          <div className="header__actions">
            <nav className="header__nav" aria-label="Main navigation">
              <ul className="header__links">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <HeaderNavItem
                      href={link.href}
                      label={link.label}
                      linkClassName="header__link"
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <a
              href={ORDER_URL}
              className="btn btn--primary header__order"
              target="_blank"
              rel="noopener noreferrer"
            >
              Order Now
            </a>

            <button
              type="button"
              className={`header__toggle ${menuOpen ? "header__toggle--open" : ""}`}
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </div>

      <nav
        className={`header__drawer ${menuOpen ? "header__drawer--open" : ""}`}
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul className="header__drawer-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <HeaderNavItem
                href={link.href}
                label={link.label}
                linkClassName="header__drawer-link"
                onNavigate={closeMenu}
              />
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
