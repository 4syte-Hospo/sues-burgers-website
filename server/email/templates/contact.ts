import type { EmailAttachment } from "../types.js";

export type ContactSubmission = {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
  attachment?: EmailAttachment;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildContactEmail(submission: ContactSubmission) {
  const lines = [
    "New contact form submission — Sue's Burgers & Shakes",
    "",
    `Submitted: ${submission.submittedAt}`,
    `Name: ${submission.firstName}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `IP address: ${submission.ipAddress}`,
    `User agent: ${submission.userAgent}`,
    "",
    "Message:",
    submission.message,
  ];

  if (submission.attachment) {
    lines.push("", `Attachment: ${submission.attachment.name}`);
  }

  const html = `
    <h2>New contact form submission</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(submission.submittedAt)}</p>
    <p><strong>Name:</strong> ${escapeHtml(submission.firstName)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone || "Not provided")}</p>
    <p><strong>IP address:</strong> ${escapeHtml(submission.ipAddress)}</p>
    <p><strong>User agent:</strong> ${escapeHtml(submission.userAgent)}</p>
    <h3>Message</h3>
    <p>${escapeHtml(submission.message).replace(/\n/g, "<br />")}</p>
    ${
      submission.attachment
        ? `<p><strong>Attachment:</strong> ${escapeHtml(submission.attachment.name)}</p>`
        : ""
    }
  `.trim();

  return {
    subject: `Contact form — ${submission.firstName}`,
    textBody: lines.join("\n"),
    htmlBody: html,
    attachments: submission.attachment ? [submission.attachment] : undefined,
  };
}
