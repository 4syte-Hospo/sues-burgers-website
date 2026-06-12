import { careersHero } from "../../data/careers";
import "./CareersHero.css";

export function CareersHero() {
  return (
    <section className="careers-intro" aria-labelledby="careers-intro-title">
      <div className="container careers-intro__inner">
        <h1 id="careers-intro-title" className="careers-intro__headline">
          {careersHero.headline}
        </h1>
        <p className="careers-intro__body">{careersHero.intro}</p>
        <p className="careers-intro__cta">{careersHero.cta}</p>
      </div>
    </section>
  );
}
