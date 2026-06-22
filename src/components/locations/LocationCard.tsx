import { Link } from "react-router-dom";
import type { LocationStore } from "../../data/locations";
import {
  LocationCarIcon,
  LocationClockIcon,
  LocationPhoneIcon,
  LocationPinIcon,
} from "./LocationIcons";
import { LocationImage } from "./LocationImage";
import "./LocationCard.css";

type Props = {
  location: LocationStore;
};

export function LocationCard({ location }: Props) {
  const details = [
    { icon: LocationPinIcon, text: location.address },
    { icon: LocationCarIcon, text: location.locationNote },
    { icon: LocationClockIcon, text: location.hours },
    {
      icon: LocationPhoneIcon,
      text: location.phone,
      href: location.phoneHref,
    },
  ];

  return (
    <article className="location-card">
      <div className="location-card__media">
        <LocationImage
          src={location.image}
          alt={location.imageAlt}
          className="location-card__image"
        />
      </div>

      <div className="location-card__body">
        <header className="location-card__header">
          <p className="location-card__brand">{location.name}</p>
          <h2 className="location-card__suburb">{location.suburb}</h2>
        </header>

        <ul className="location-card__details">
          {details.map((detail) => (
            <li key={detail.text} className="location-card__detail">
              <span className="location-card__detail-icon">
                <detail.icon />
              </span>
              {"href" in detail && detail.href ? (
                <a
                  href={detail.href}
                  className="location-card__detail-text location-card__detail-link"
                >
                  {detail.text}
                </a>
              ) : (
                <span className="location-card__detail-text">{detail.text}</span>
              )}
            </li>
          ))}
        </ul>

        <p className="location-card__maps">
          <a
            href={location.mapsUrl}
            className="location-card__maps-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            {location.mapsLabel}
          </a>
        </p>

        <div className="location-card__actions">
          <a
            href={location.orderUrl}
            className="btn btn--primary btn--compact location-card__btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order Now
          </a>
          <Link to={location.menuUrl} className="btn btn--outline btn--compact location-card__btn">
            See Our Menu
          </Link>
          <a
            href={location.uberUrl}
            className="btn btn--dark btn--compact location-card__btn location-card__btn--uber"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="location-card__uber-mark">Uber</span>
            Delivery
          </a>
        </div>
      </div>
    </article>
  );
}
