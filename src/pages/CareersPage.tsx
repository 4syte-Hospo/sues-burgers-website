import { CareersApplicationForm } from "../components/careers/CareersApplicationForm";
import { CareersHero } from "../components/careers/CareersHero";
import "./CareersPage.css";

export function CareersPage() {
  return (
    <>
      <CareersHero />
      <section className="careers-page section" aria-labelledby="careers-form-heading">
        <div className="container careers-page__inner">
          <header className="careers-page__header">
            <p className="careers-page__eyebrow">Apply now</p>
            <h2 id="careers-form-heading" className="careers-page__title">
              Send your application
            </h2>
            <p className="careers-page__intro">
              Fill out the form below with your details and resume. We&apos;ll review
              every application and reach out if there&apos;s a fit.
            </p>
          </header>

          <div className="careers-page__card">
            <CareersApplicationForm />
          </div>
        </div>
      </section>
    </>
  );
}
