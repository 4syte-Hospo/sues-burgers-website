import { raisingDavesContent } from "../data/raisingDavesContent";
import { AboutImage } from "./AboutImage";
import "./RaisingDavesSection.css";

export function RaisingDavesSection() {
  const { image, cta } = raisingDavesContent;

  return (
    <section className="raising-daves section" aria-labelledby="raising-daves-title">
      <div className="raising-daves__inner container">
        <div className="raising-daves__copy">
          <p className="raising-daves__eyebrow">{raisingDavesContent.eyebrow}</p>
          <h2 id="raising-daves-title" className="raising-daves__title">
            {raisingDavesContent.title}
          </h2>
          <p className="raising-daves__body">{raisingDavesContent.body}</p>
          <a
            href={cta.href}
            className="btn btn--primary raising-daves__cta"
            {...(cta.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {cta.label}
          </a>
        </div>

        <figure className="raising-daves__media">
          <AboutImage src={image.src} alt={image.alt} />
        </figure>
      </div>
    </section>
  );
}
