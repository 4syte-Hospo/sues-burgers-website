import { Link } from "react-router-dom";
import { aboutContent } from "../data/aboutContent";
import { AboutImage } from "./AboutImage";
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
          <Link to={aboutContent.cta.href} className="btn btn--outline about__cta">
            {aboutContent.cta.label}
          </Link>
        </div>

        <div className="about__collage">
          <figure className="about__photo about__photo--back">
            <AboutImage src={backPhoto.src} alt={backPhoto.alt} />
          </figure>
          <figure className="about__photo about__photo--front">
            <AboutImage src={frontPhoto.src} alt={frontPhoto.alt} />
          </figure>
        </div>
      </div>
    </section>
  );
}
