import { aboutContent } from "../data/aboutContent";
import "./AboutSection.css";

export function AboutSection() {
  const [backPhoto, frontPhoto] = aboutContent.photos;

  return (
    <section id="about" className="about section">
      <div className="about__inner container">
        <div className="about__copy">
          <p className="about__eyebrow">{aboutContent.eyebrow}</p>
          <h1 className="about__headline">{aboutContent.headline}</h1>
          {aboutContent.body.map((paragraph) => (
            <p key={paragraph} className="about__body">
              {paragraph}
            </p>
          ))}
          <a href={aboutContent.cta.href} className="btn btn--outline about__cta">
            {aboutContent.cta.label}
          </a>
        </div>

        <div className="about__collage">
          <figure className="about__photo about__photo--back">
            <img src={backPhoto.src} alt={backPhoto.alt} loading="lazy" />
          </figure>
          <figure className="about__photo about__photo--front">
            <img src={frontPhoto.src} alt={frontPhoto.alt} loading="lazy" />
          </figure>
        </div>
      </div>
    </section>
  );
}
