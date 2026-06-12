import { LocationCard } from "../components/locations/LocationCard";
import { LocationComingSoon } from "../components/locations/LocationComingSoon";
import { LocationsHero } from "../components/locations/LocationsHero";
import { locations } from "../data/locations";
import "./LocationsPage.css";

export function LocationsPage() {
  return (
    <>
      <LocationsHero />
      <section className="locations-list section" aria-label="Sue's store locations">
        <div className="container locations-list__inner">
          {locations.map((location) => (
            <LocationCard key={location.id} location={location} />
          ))}
          <LocationComingSoon />
        </div>
      </section>
    </>
  );
}
