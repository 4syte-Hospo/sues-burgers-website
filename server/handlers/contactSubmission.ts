import { emailEnv, isPostmarkConfigured } from "../config/env.js";
import { sendEmail } from "../email/emailService.js";
import { buildContactEmail } from "../email/templates/contact.js";
import type { UploadedFile } from "../types/uploadedFile.js";
import { toEmailAttachment } from "../utils/fileAttachment.js";
import { getSubmissionTimestamp } from "../utils/requestMeta.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ATTACHMENT_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "pdf", "doc", "docx"];
const FIVE_MB = 5 * 1024 * 1024;

export type ContactSubmissionInput = {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  attachment?: UploadedFile;
  ipAddress: string;
  userAgent: string;
};

export type FormHandlerResult =
  | { ok: true; status: 200; body: { success: true } }
  | { ok: false; status: number; body: { error: string } };

export async function handleContactSubmission(
  input: ContactSubmissionInput,
): Promise<FormHandlerResult> {
  const firstName = input.firstName.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const message = input.message.trim();

  if (!firstName) {
    return { ok: false, status: 400, body: { error: "Please enter your first name." } };
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, body: { error: "Please enter a valid email address." } };
  }

  if (!message) {
    return { ok: false, status: 400, body: { error: "Please enter your message." } };
  }

  if (message.length > 180) {
    return {
      ok: false,
      status: 400,
      body: { error: "Message must be 180 characters or fewer." },
    };
  }

  if (input.attachment) {
    if (input.attachment.size > FIVE_MB) {
      return { ok: false, status: 413, body: { error: "File must be 5 MB or smaller." } };
    }

    const extension =
      input.attachment.originalname.split(".").pop()?.toLowerCase() ?? "";
    if (!CONTACT_ATTACHMENT_EXTENSIONS.includes(extension)) {
      return {
        ok: false,
        status: 400,
        body: { error: "Please upload an image, PDF, DOC, or DOCX file." },
      };
    }
  }

  if (isPostmarkConfigured() && !emailEnv.contactToEmail) {
    return {
      ok: false,
      status: 503,
      body: { error: "Contact form is not configured. Please try again later." },
    };
  }

  const destination = emailEnv.contactToEmail ?? "mock-contact@localhost";

  const submission = {
    firstName,
    email,
    phone,
    message,
    submittedAt: getSubmissionTimestamp(),
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    attachment: input.attachment ? toEmailAttachment(input.attachment) : undefined,
  };

  const emailContent = buildContactEmail(submission);

  try {
    await sendEmail({
      to: destination,
      replyTo: email,
      subject: emailContent.subject,
      textBody: emailContent.textBody,
      htmlBody: emailContent.htmlBody,
      tag: "contact-form",
      attachments: emailContent.attachments,
    });
  } catch (error) {
    console.error("[contact] submission failed:", error);
    return {
      ok: false,
      status: 500,
      body: { error: "Something went wrong. Please try again in a moment." },
    };
  }

  return { ok: true, status: 200, body: { success: true } };
}
