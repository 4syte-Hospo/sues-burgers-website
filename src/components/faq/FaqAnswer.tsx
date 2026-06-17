import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import type { FaqAnswerBlock } from "../../types/faq";
import "./FaqAnswer.css";

type Props = {
  blocks: FaqAnswerBlock[];
  showAllergenLink?: boolean;
};

function renderFaqText(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function FaqAnswer({ blocks, showAllergenLink }: Props) {
  return (
    <div className="faq-answer">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") {
          return (
            <p key={index} className="faq-answer__paragraph">
              {renderFaqText(block.content)}
            </p>
          );
        }

        if (block.type === "heading") {
          return (
            <p key={index} className="faq-answer__heading">
              {block.content}
            </p>
          );
        }

        if (block.type === "list") {
          return (
            <ul key={index} className="faq-answer__list">
              {block.items.map((item) => (
                <li key={item}>{renderFaqText(item)}</li>
              ))}
            </ul>
          );
        }

        if (block.external || block.href.startsWith("http")) {
          return (
            <a
              key={index}
              href={block.href}
              className="faq-answer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {block.label}
            </a>
          );
        }

        return (
          <Link key={index} to={block.href} className="faq-answer__link">
            {block.label}
          </Link>
        );
      })}

      {showAllergenLink && (
        <p className="faq-answer__paragraph faq-answer__allergen-note">
          For a full breakdown of allergens in our menu, see our{" "}
          <Link to="/allergen-info" className="faq-answer__link">
            Allergen Information
          </Link>{" "}
          page.
        </p>
      )}
    </div>
  );
}
