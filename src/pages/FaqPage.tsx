import { FaqAccordion } from "../components/faq/FaqAccordion";
import { faqPage } from "../data/faq";
import "./FaqPage.css";

export function FaqPage() {
  return (
    <section className="faq-page section" aria-labelledby="faq-page-title">
      <div className="container faq-page__inner">
        <header className="faq-page__header">
          <p className="faq-page__eyebrow">{faqPage.eyebrow}</p>
          <h1 id="faq-page-title" className="faq-page__title">
            {faqPage.title}
          </h1>
          <p className="faq-page__rule" aria-hidden="true" />
          <p className="faq-page__intro">{faqPage.intro}</p>
        </header>

        <FaqAccordion />
      </div>
    </section>
  );
}
