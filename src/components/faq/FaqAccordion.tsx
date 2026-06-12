import { faqItems } from "../../data/faq";
import { FaqAnswer } from "./FaqAnswer";
import "./FaqAccordion.css";

export function FaqAccordion() {
  return (
    <div className="faq-accordion">
      {faqItems.map((item) => (
        <details key={item.id} id={item.id} className="faq-accordion__item">
          <summary className="faq-accordion__question">{item.question}</summary>
          <div className="faq-accordion__answer">
            <FaqAnswer blocks={item.answer} showAllergenLink={item.dietRelated} />
          </div>
        </details>
      ))}
    </div>
  );
}
