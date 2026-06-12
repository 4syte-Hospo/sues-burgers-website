import { ORDER_URL } from "../data/site";
import "./SodaBarSection.css";

export function SodaBarSection() {
  return (
    <section className="soda-bar section" aria-labelledby="soda-bar-heading">
      <div className="soda-bar__inner container">
        <div className="soda-bar__copy">
          <p className="soda-bar__eyebrow">Dirty</p>
          <p className="soda-bar__tagline">Creamy • Fizzy • Flavoured</p>
          <h2 id="soda-bar-heading" className="soda-bar__title">
            Dirty soda bar
          </h2>
          <p className="soda-bar__subtitle">
            Brisbane&apos;s specialty dirty sodas — creamy, fizzy and flavoured American-style drinks
          </p>
          <a
            href={ORDER_URL}
            className="btn btn--primary soda-bar__cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Online
          </a>
        </div>

        <div className="soda-bar__media">
          <img
            src="/images/hero/heroimg1-web.png"
            alt="Three colourful dirty sodas"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
