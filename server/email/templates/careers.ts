import type { EmailAttachment } from "../types.js";

export type CareersSubmission = {
  name: string;
  email: string;
  phone: string;
  roles: string;
  locations: string;
  submittedAt: string;
  ipAddress: string;
  userAgent: string;
  resume: EmailAttachment;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildCareersEmail(submission: CareersSubmission) {
  const lines = [
    "New careers application — Sue's Burgers & Shakes",
    "",
    `Submitted: ${submission.submittedAt}`,
    `Name: ${submission.name}`,
    `Email: ${submission.email}`,
    `Phone: ${submission.phone || "Not provided"}`,
    `Roles: ${submission.roles}`,
    `Locations: ${submission.locations}`,
    `IP address: ${submission.ipAddress}`,
    `User agent: ${submission.userAgent}`,
    "",
    `Resume: ${submission.resume.name}`,
  ];

  const html = `
    <h2>New careers application</h2>
    <p><strong>Submitted:</strong> ${escapeHtml(submission.submittedAt)}</p>
    <p><strong>Name:</strong> ${escapeHtml(submission.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(submission.email)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(submission.phone || "Not provided")}</p>
    <p><strong>Roles:</strong> ${escapeHtml(submission.roles)}</p>
    <p><strong>Locations:</strong> ${escapeHtml(submission.locations)}</p>
    <p><strong>IP address:</strong> ${escapeHtml(submission.ipAddress)}</p>
    <p><strong>User agent:</strong> ${escapeHtml(submission.userAgent)}</p>
    <p><strong>Resume:</strong> ${escapeHtml(submission.resume.name)} (attached)</p>
  `.trim();

  return {
    subject: `Careers application — ${submission.name}`,
    textBody: lines.join("\n"),
    htmlBody: html,
    attachments: [submission.resume],
  };
}
