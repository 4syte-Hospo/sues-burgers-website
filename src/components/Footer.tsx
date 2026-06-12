import { Link } from "react-router-dom";
import {
  footerColumns,
  LOGO_SRC,
  socialLinks,
} from "../data/site";
import "./Footer.css";

type FooterLink = {
  label: string;
  href: string;
  internal?: boolean;
};

function FooterNavLink({ link }: { link: FooterLink }) {
  if (link.internal) {
    return (
      <Link to={link.href} className="footer__link">
        {link.label}
      </Link>
    );
  }

  return (
    <a
      href={link.href}
      className="footer__link"
      {...(link.href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {link.label}
    </a>
  );
}

function SocialIcon({ network }: { network: string }) {
  if (network === "Instagram") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (network === "TikTok") {
    return (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16.5 3c.6 3.1 2.6 5 5.5 5.5v3.8c-2 0-3.8-.6-5.5-1.7v7.2c0 4.2-3.4 7.6-7.6 7.6S1.3 20 1.3 15.8s3.4-7.6 7.6-7.6c.4 0 .8 0 1.2.1v4a3.5 3.5 0 0 0-1.2-.2 3.4 3.4 0 1 0 3.4 3.4V3h3.2z" />
      </svg>
    );
  }

  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 22v-8h3l.5-3.5h-3.5V8.5c0-1 .3-1.7 1.7-1.7H17V3.6c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3.5h2.3V22h3.2z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__checker" aria-hidden="true" />

      <div className="footer__main">
        <div className="footer__inner container">
          <div className="footer__brand">
            <Link to="/" className="footer__logo-link" aria-label="Sue's Burgers home">
              <img src={LOGO_SRC} alt="Sue's" className="footer__logo" width={140} height={56} />
            </Link>
          </div>

          <div className="footer__columns">
            <div className="footer__col">
              <p className="footer__heading">{footerColumns.visit.title}</p>
              <ul className="footer__list">
                {footerColumns.visit.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <p className="footer__heading">{footerColumns.info.title}</p>
              <ul className="footer__list">
                {footerColumns.info.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__col">
              <p className="footer__heading">{footerColumns.joinUs.title}</p>
              <ul className="footer__list">
                {footerColumns.joinUs.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink link={link} />
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer__social">
              <p className="footer__social-label">Follow us</p>
              <ul className="footer__social-list">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="footer__social-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                    >
                      <SocialIcon network={link.label} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Sue&apos;s Burgers &amp; Shakes
          </p>
        </div>
      </div>
    </footer>
  );
}
