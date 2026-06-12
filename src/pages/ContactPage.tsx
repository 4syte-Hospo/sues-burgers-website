import { ContactForm } from "../components/contact/ContactForm";
import { ContactHero } from "../components/contact/ContactHero";
import { contactPage } from "../data/contact";
import "./ContactPage.css";

export function ContactPage() {
  return (
    <>
      <ContactHero />
      <section className="contact-page section" aria-labelledby="contact-form-heading">
        <div className="container contact-page__inner">
          <header className="contact-page__header">
            <p className="contact-page__eyebrow">{contactPage.formEyebrow}</p>
            <h2 id="contact-form-heading" className="contact-page__title">
              {contactPage.formTitle}
            </h2>
            <p className="contact-page__intro">{contactPage.formIntro}</p>
          </header>

          <div className="contact-page__card">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
