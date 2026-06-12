import { useId, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  contactAttachmentAccept,
  contactMessageMaxLength,
  contactSuccessMessage,
} from "../../data/contact";
import type { ContactFormErrors, ContactMessage } from "../../types/contact";
import { resolveFormSubmissionError } from "../../api/formSubmission";
import { isStagingDeploy, stagingFormsUnavailableMessage } from "../../config/staging";
import { StagingFormNotice } from "../forms/StagingFormNotice";
import {
  emptyContactMessage,
  submitContactMessage,
  validateContactMessage,
} from "../../utils/contactForm";
import "./ContactForm.css";

export function ContactForm() {
  const formId = useId();
  const attachmentInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<ContactMessage>(emptyContactMessage());
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = <K extends keyof ContactMessage>(
    key: K,
    value: ContactMessage[K],
  ) => {
    setMessage((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const handleAttachmentChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    updateField("attachment", file);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationErrors = validateContactMessage(message);
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
      await submitContactMessage(message);
      setIsSubmitted(true);
      setMessage(emptyContactMessage());
      if (attachmentInputRef.current) {
        attachmentInputRef.current.value = "";
      }
    } catch (error) {
      setErrors({ form: resolveFormSubmissionError(error) });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="contact-form__success" role="status" aria-live="polite">
        <p className="contact-form__success-title">Message sent</p>
        <p className="contact-form__success-body">{contactSuccessMessage}</p>
      </div>
    );
  }

  const messageLength = message.message.length;

  return (
    <form
      id={formId}
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <StagingFormNotice />

      {errors.form && (
        <p className="contact-form__error contact-form__error--banner" role="alert">
          {errors.form}
        </p>
      )}

      <div className="contact-form__grid">
        <div className="contact-form__field">
          <label htmlFor={`${formId}-firstName`} className="contact-form__label">
            First Name <span className="contact-form__required">*</span>
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            autoComplete="given-name"
            className={`contact-form__input${errors.firstName ? " contact-form__input--error" : ""}`}
            value={message.firstName}
            onChange={(event) => updateField("firstName", event.target.value)}
            required
          />
          {errors.firstName && (
            <p className="contact-form__error">{errors.firstName}</p>
          )}
        </div>

        <div className="contact-form__field">
          <label htmlFor={`${formId}-email`} className="contact-form__label">
            Email Address <span className="contact-form__required">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            className={`contact-form__input${errors.email ? " contact-form__input--error" : ""}`}
            value={message.email}
            onChange={(event) => updateField("email", event.target.value)}
            required
          />
          {errors.email && <p className="contact-form__error">{errors.email}</p>}
        </div>

        <div className="contact-form__field contact-form__field--full">
          <label htmlFor={`${formId}-phone`} className="contact-form__label">
            Phone Number
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            className={`contact-form__input${errors.phone ? " contact-form__input--error" : ""}`}
            value={message.phone}
            onChange={(event) => updateField("phone", event.target.value)}
          />
          {errors.phone && <p className="contact-form__error">{errors.phone}</p>}
        </div>
      </div>

      <div className="contact-form__field">
        <label htmlFor={`${formId}-attachment`} className="contact-form__label">
          Attachment
        </label>
        <div
          className={`contact-form__upload${errors.attachment ? " contact-form__upload--error" : ""}`}
        >
          <input
            ref={attachmentInputRef}
            id={`${formId}-attachment`}
            name="attachment"
            type="file"
            accept={contactAttachmentAccept}
            className="contact-form__file"
            onChange={handleAttachmentChange}
          />
          <div className="contact-form__upload-copy">
            <p className="contact-form__upload-title">
              {message.attachment
                ? message.attachment.name
                : "Drag and drop or choose a file"}
            </p>
            <p className="contact-form__upload-meta">
              Image, PDF, DOC, or DOCX · Max 5 MB · Optional
            </p>
          </div>
        </div>
        {errors.attachment && (
          <p className="contact-form__error">{errors.attachment}</p>
        )}
      </div>

      <div className="contact-form__field">
        <div className="contact-form__label-row">
          <label htmlFor={`${formId}-message`} className="contact-form__label">
            Message <span className="contact-form__required">*</span>
          </label>
          <span
            className={`contact-form__counter${messageLength > contactMessageMaxLength ? " contact-form__counter--over" : ""}`}
            aria-live="polite"
          >
            {messageLength} / {contactMessageMaxLength}
          </span>
        </div>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={5}
          maxLength={contactMessageMaxLength}
          placeholder="Enter your message..."
          className={`contact-form__textarea${errors.message ? " contact-form__textarea--error" : ""}`}
          value={message.message}
          onChange={(event) => updateField("message", event.target.value)}
          required
        />
        {errors.message && <p className="contact-form__error">{errors.message}</p>}
      </div>

      <div className="contact-form__actions">
        <button
          type="submit"
          className="btn btn--primary contact-form__submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
