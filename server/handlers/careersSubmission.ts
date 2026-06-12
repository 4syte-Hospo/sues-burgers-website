import { emailEnv, isPostmarkConfigured } from "../config/env.js";
import { sendEmail } from "../email/emailService.js";
import { buildCareersEmail } from "../email/templates/careers.js";
import type { UploadedFile } from "../types/uploadedFile.js";
import { toEmailAttachment } from "../utils/fileAttachment.js";
import { getSubmissionTimestamp } from "../utils/requestMeta.js";
import type { FormHandlerResult } from "./contactSubmission.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESUME_EXTENSIONS = ["pdf", "doc", "docx"];
const FIVE_MB = 5 * 1024 * 1024;

export type CareersSubmissionInput = {
  name: string;
  email: string;
  phone: string;
  roles: string;
  locations: string;
  resume?: UploadedFile;
  ipAddress: string;
  userAgent: string;
};

export async function handleCareersSubmission(
  input: CareersSubmissionInput,
): Promise<FormHandlerResult> {
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const roles = input.roles.trim();
  const locations = input.locations.trim();

  if (!name) {
    return { ok: false, status: 400, body: { error: "Please enter your name." } };
  }

  if (!email || !EMAIL_PATTERN.test(email)) {
    return { ok: false, status: 400, body: { error: "Please enter a valid email address." } };
  }

  if (!roles) {
    return { ok: false, status: 400, body: { error: "Please select at least one role." } };
  }

  if (!locations) {
    return { ok: false, status: 400, body: { error: "Please select at least one location." } };
  }

  if (!input.resume) {
    return { ok: false, status: 400, body: { error: "Please upload your resume." } };
  }

  if (input.resume.size > FIVE_MB) {
    return { ok: false, status: 413, body: { error: "File must be 5 MB or smaller." } };
  }

  const extension = input.resume.originalname.split(".").pop()?.toLowerCase() ?? "";
  if (!RESUME_EXTENSIONS.includes(extension)) {
    return { ok: false, status: 400, body: { error: "Please upload a PDF, DOC, or DOCX file." } };
  }

  if (isPostmarkConfigured() && !emailEnv.careersToEmail) {
    return {
      ok: false,
      status: 503,
      body: { error: "Careers form is not configured. Please try again later." },
    };
  }

  const destination = emailEnv.careersToEmail ?? "mock-careers@localhost";

  const submission = {
    name,
    email,
    phone,
    roles,
    locations,
    submittedAt: getSubmissionTimestamp(),
    ipAddress: input.ipAddress,
    userAgent: input.userAgent,
    resume: toEmailAttachment(input.resume),
  };

  const emailContent = buildCareersEmail(submission);

  try {
    await sendEmail({
      to: destination,
      replyTo: email,
      subject: emailContent.subject,
      textBody: emailContent.textBody,
      htmlBody: emailContent.htmlBody,
      tag: "careers-form",
      attachments: emailContent.attachments,
    });
  } catch (error) {
    console.error("[careers] submission failed:", error);
    return {
      ok: false,
      status: 500,
      body: { error: "Something went wrong. Please try again in a moment." },
    };
  }

  return { ok: true, status: 200, body: { success: true } };
}
