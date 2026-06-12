import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  careerLocations,
  careerRoles,
  careersResumeAccept,
  careersSuccessMessage,
} from "../../data/careers";
import type { CareersApplication, CareersFormErrors } from "../../types/careers";
import { resolveFormSubmissionError } from "../../api/formSubmission";
import { isStagingDeploy, stagingFormsUnavailableMessage } from "../../config/staging";
import { StagingFormNotice } from "../forms/StagingFormNotice";
import {
  emptyCareersApplication,
  submitCareersApplication,
  validateCareersApplication,
} from "../../utils/careersForm";
import "./CareersApplicationForm.css";

export function CareersApplicationForm() {
  const formId = useId();
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const [application, setApplication] = useState<CareersApplication>(
    emptyCareersApplication,
  );
  const [errors, setErrors] = useState<CareersFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <K extends keyof CareersApplication>(
    key: K,
    value: CareersApplication[K],
  ) => {
    setApplication((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const toggleRole = (value: CareersApplication["roles"][number]) => {
    setApplication((current) => {
      const next = current.roles.includes(value)
        ? current.roles.filter((item) => item !== value)
        : [...current.roles, value];

      return { ...current, roles: next };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next.roles;
      return next;
    });
  };

  const toggleLocation = (value: CareersApplication["locations"][number]) => {
    setApplication((current) => {
      const next = current.locations.includes(value)
        ? current.locations.filter((item) => item !== value)
        : [...current.locations, value];

      return { ...current, locations: next };
    });
    setErrors((current) => {
      const next = { ...current };
      delete next.locations;
      return next;
    });
  };

  const handleResumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    updateField("resume", file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateCareersApplication(application);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isStagingDeploy) {
      setErrors({ form: stagingFormsUnavailableMessage });
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await submitCareersApplication(application);
      setIsSubmitted(true);
      setApplication(emptyCareersApplication());
      if (resumeInputRef.current) {
        resumeInputRef.current.value = "";
      }
    } catch (error) {
      setErrors({ form: resolveFormSubmissionError(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="careers-form__success" role="status" aria-live="polite">
        <p className="careers-form__success-title">Application received</p>
        <p className="careers-form__success-body">{careersSuccessMessage}</p>
      </div>
    );
  }

  return (
    <form
      id={formId}
      className="careers-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <StagingFormNotice />

      {errors.form && (
        <p className="careers-form__error careers-form__error--banner" role="alert">
          {errors.form}
        </p>
      )}

      <div className="careers-form__grid">
        <div className="careers-form__field">
          <label htmlFor={`${formId}-name`} className="careers-form__label">
            Name <span className="careers-form__required">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            autoComplete="name"
            className={`careers-form__input${errors.name ? " careers-form__input--error" : ""}`}
            value={application.name}
            onChange={(event) => updateField("name", event.target.value)}
            required
          />
          {errors.name && <p className="careers-form__error">{errors.name}</p>}
        </div>

        <div className="careers-form__field">
          <label htmlFor={`${formId}-email`} className="careers-form__label">
            Email Address <span className="careers-form__required">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={`careers-form__input${errors.email ? " careers-form__input--error" : ""}`}
            value={application.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
          {errors.email && <p className="careers-form__error">{errors.email}</p>}
        </div>

        <div className="careers-form__field careers-form__field--full">
          <label htmlFor={`${formId}-phone`} className="careers-form__label">
            Phone
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`careers-form__input${errors.phone ? " careers-form__input--error" : ""}`}
            value={application.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          {errors.phone && <p className="careers-form__error">{errors.phone}</p>}
        </div>
      </div>

      <fieldset className="careers-form__fieldset">
        <legend className="careers-form__legend">
          Role interested in <span className="careers-form__required">*</span>
        </legend>
        <div className="careers-form__choices">
          {careerRoles.map((role) => (
            <label key={role.id} className="careers-form__choice">
              <input
                type="checkbox"
                name="roles"
                value={role.id}
                checked={application.roles.includes(role.id)}
                onChange={() => toggleRole(role.id)}
              />
              <span>{role.label}</span>
            </label>
          ))}
        </div>
        {errors.roles && <p className="careers-form__error">{errors.roles}</p>}
      </fieldset>

      <fieldset className="careers-form__fieldset">
        <legend className="careers-form__legend">
          Preferred location <span className="careers-form__required">*</span>
        </legend>
        <p className="careers-form__hint">
          Select all locations you&apos;re open to — choose both if you don&apos;t mind either.
        </p>
        <div className="careers-form__choices">
          {careerLocations.map((location) => (
            <label key={location.id} className="careers-form__choice">
              <input
                type="checkbox"
                name="locations"
                value={location.id}
                checked={application.locations.includes(location.id)}
                onChange={() => toggleLocation(location.id)}
              />
              <span>{location.label}</span>
            </label>
          ))}
        </div>
        {errors.locations && (
          <p className="careers-form__error">{errors.locations}</p>
        )}
      </fieldset>

      <div className="careers-form__field">
        <label htmlFor={`${formId}-resume`} className="careers-form__label">
          Resume <span className="careers-form__required">*</span>
        </label>
        <div
          className={`careers-form__upload${errors.resume ? " careers-form__upload--error" : ""}`}
        >
          <input
            ref={resumeInputRef}
            id={`${formId}-resume`}
            name="resume"
            type="file"
            accept={careersResumeAccept}
            className="careers-form__file"
            onChange={handleResumeChange}
          />
          <div className="careers-form__upload-copy">
            <p className="careers-form__upload-title">
              {application.resume ? application.resume.name : "Drag and drop or choose a file"}
            </p>
            <p className="careers-form__upload-meta">PDF, DOC, or DOCX · Max 5 MB</p>
          </div>
        </div>
        {errors.resume && <p className="careers-form__error">{errors.resume}</p>}
      </div>

      <div className="careers-form__actions">
        <button
          type="submit"
          className="btn btn--primary careers-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Apply Now"}
        </button>
      </div>
    </form>
  );
}
