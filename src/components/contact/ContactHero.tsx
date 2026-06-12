import { Link } from "react-router-dom";
import { contactPage } from "../../data/contact";
import "./ContactHero.css";

export function ContactHero() {
  return (
    <section className="contact-intro" aria-labelledby="contact-intro-title">
      <div className="container contact-intro__inner">
        <h1 id="contact-intro-title" className="contact-intro__headline">
          {contactPage.title}
        </h1>
        <div className="contact-intro__copy">
          <p className="contact-intro__body">
            {contactPage.paragraphs[0]}{" "}
            <Link to="/faq" className="contact-intro__link">
              Visit our FAQ
            </Link>
            .
          </p>
          <p className="contact-intro__body">{contactPage.paragraphs[1]}</p>
          <p className="contact-intro__note">{contactPage.paragraphs[2]}</p>
        </div>
      </div>
    </section>
  );
}
