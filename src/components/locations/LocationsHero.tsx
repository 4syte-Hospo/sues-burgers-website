import { locationsHero } from "../../data/locations";
import "./LocationsHero.css";

export function LocationsHero() {
  return (
    <section className="locations-hero">
      <div className="locations-hero__inner container">
        <div className="locations-hero__copy">
          <p className="locations-hero__eyebrow">{locationsHero.eyebrow}</p>
          <h1 className="locations-hero__title">{locationsHero.title}</h1>
          <p className="locations-hero__rule" aria-hidden="true" />
          <p className="locations-hero__body">{locationsHero.body}</p>
        </div>
      </div>
    </section>
  );
}
