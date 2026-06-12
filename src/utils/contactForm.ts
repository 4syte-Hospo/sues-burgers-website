import { postFormData } from "../api/formSubmission";
import {
  contactAttachmentAccept,
  contactAttachmentMaxBytes,
  contactMessageMaxLength,
} from "../data/contact";
import type { ContactFormErrors, ContactMessage } from "../types/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+()-]{8,}$/;

export function validateContactMessage(message: ContactMessage): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!message.firstName.trim()) {
    errors.firstName = "Please enter your first name.";
  }

  if (!message.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(message.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (message.phone.trim() && !PHONE_PATTERN.test(message.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!message.message.trim()) {
    errors.message = "Please enter your message.";
  } else if (message.message.trim().length > contactMessageMaxLength) {
    errors.message = `Message must be ${contactMessageMaxLength} characters or fewer.`;
  }

  if (message.attachment) {
    const extension =
      message.attachment.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = contactAttachmentAccept
      .split(",")
      .map((type) => type.replace(".", ""));

    if (!allowed.includes(extension)) {
      errors.attachment = "Please upload an image, PDF, DOC, or DOCX file.";
    } else if (message.attachment.size > contactAttachmentMaxBytes) {
      errors.attachment = "Attachment must be 5 MB or smaller.";
    }
  }

  return errors;
}

export function buildContactFormData(message: ContactMessage): FormData {
  const formData = new FormData();

  formData.append("firstName", message.firstName.trim());
  formData.append("email", message.email.trim());
  formData.append("phone", message.phone.trim());
  formData.append("message", message.message.trim());

  if (message.attachment) {
    formData.append("attachment", message.attachment, message.attachment.name);
  }

  return formData;
}

export async function submitContactMessage(message: ContactMessage): Promise<void> {
  await postFormData("/api/contact", buildContactFormData(message));
}

export const emptyContactMessage = (): ContactMessage => ({
  firstName: "",
  email: "",
  phone: "",
  message: "",
  attachment: null,
});
