import { comingSoonLocation } from "../../data/locations";
import { LocationImage } from "./LocationImage";
import "./LocationComingSoon.css";

export function LocationComingSoon() {
  return (
    <article className="location-soon" aria-labelledby="location-soon-title">
      <div className="location-soon__media">
        <LocationImage
          src={comingSoonLocation.image}
          alt={comingSoonLocation.imageAlt}
          className="location-soon__image"
        />
      </div>

      <div className="location-soon__body">
        <header className="location-soon__header">
          <p className="location-soon__brand" id="location-soon-title">
            {comingSoonLocation.title}
          </p>
          <h2 className="location-soon__subtitle">{comingSoonLocation.subtitle}</h2>
        </header>

        <p className="location-soon__teaser">{comingSoonLocation.teaser}</p>

        <div className="location-soon__actions">
          <span className="btn btn--disabled btn--compact location-soon__btn" aria-disabled="true">
            Coming Soon
          </span>
          <a
            href={comingSoonLocation.followUrl}
            className="btn btn--outline btn--compact location-soon__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Follow Us
          </a>
        </div>
      </div>
    </article>
  );
}
