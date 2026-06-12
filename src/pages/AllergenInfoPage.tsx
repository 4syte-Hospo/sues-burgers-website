import { AllergenKey } from "../components/allergens/AllergenKey";
import { AllergenSearch } from "../components/allergens/AllergenSearch";
import { AllergenTable } from "../components/allergens/AllergenTable";
import { allergenPage, allergenSections } from "../data/allergens";
import "./AllergenInfoPage.css";

export function AllergenInfoPage() {
  return (
    <section className="allergen-page section" aria-labelledby="allergen-page-title">
      <div className="container allergen-page__inner">
        <header className="allergen-page__header">
          <p className="allergen-page__eyebrow">{allergenPage.eyebrow}</p>
          <h1 id="allergen-page-title" className="allergen-page__title">
            {allergenPage.title}
          </h1>
          <p className="allergen-page__rule" aria-hidden="true" />
          <p className="allergen-page__intro">{allergenPage.intro}</p>
        </header>

        <AllergenSearch />

        <AllergenKey />

        <div className="allergen-page__tables">
          {allergenSections.map((section) => (
            <AllergenTable key={section.id} section={section} />
          ))}
        </div>

        <footer className="allergen-page__footer">
          <p className="allergen-page__disclaimer">{allergenPage.disclaimer}</p>
          <p className="allergen-page__updated">Last updated {allergenPage.lastUpdated}</p>
          <a href={allergenPage.pdfHref} className="allergen-page__pdf-link" download>
            Download PDF version
          </a>
        </footer>
      </div>
    </section>
  );
}
