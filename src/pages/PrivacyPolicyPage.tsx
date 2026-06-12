import { privacyPolicyPage, privacySections } from "../data/privacyPolicy";
import "./PrivacyPolicyPage.css";

export function PrivacyPolicyPage() {
  return (
    <section className="privacy-page section" aria-labelledby="privacy-page-title">
      <div className="container privacy-page__inner">
        <header className="privacy-page__header">
          <p className="privacy-page__eyebrow">{privacyPolicyPage.eyebrow}</p>
          <h1 id="privacy-page-title" className="privacy-page__title">
            {privacyPolicyPage.title}
          </h1>
          <p className="privacy-page__rule" aria-hidden="true" />
          <p className="privacy-page__intro">{privacyPolicyPage.intro}</p>
          <p className="privacy-page__updated">
            Last updated {privacyPolicyPage.lastUpdated}
          </p>
        </header>

        <div className="privacy-page__sections">
          {privacySections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="privacy-page__section"
            >
              <h2 className="privacy-page__section-title">{section.title}</h2>
              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph} className="privacy-page__paragraph">
                  {paragraph}
                </p>
              ))}
              {section.bullets && (
                <ul className="privacy-page__list">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
