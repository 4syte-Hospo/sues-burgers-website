import { Router } from "express";
import { emailEnv, isPostmarkConfigured } from "../config/env.js";
import { sendEmail } from "../email/emailService.js";
import { buildContactEmail } from "../email/templates/contact.js";
import { runUpload } from "../middleware/runUpload.js";
import { handleUploadError } from "../middleware/upload.js";
import { toEmailAttachment } from "../utils/fileAttachment.js";
import {
  getClientIp,
  getSubmissionTimestamp,
  getUserAgent,
} from "../utils/requestMeta.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONTACT_ATTACHMENT_EXTENSIONS = ["png", "jpg", "jpeg", "gif", "webp", "pdf", "doc", "docx"];

export const contactRouter = Router();

contactRouter.post("/", runUpload("attachment"), async (req, res) => {
    try {
      const firstName = String(req.body.firstName ?? "").trim();
      const email = String(req.body.email ?? "").trim();
      const phone = String(req.body.phone ?? "").trim();
      const message = String(req.body.message ?? "").trim();

      if (!firstName) {
        res.status(400).json({ error: "Please enter your first name." });
        return;
      }

      if (!email || !EMAIL_PATTERN.test(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }

      if (!message) {
        res.status(400).json({ error: "Please enter your message." });
        return;
      }

      if (message.length > 180) {
        res.status(400).json({ error: "Message must be 180 characters or fewer." });
        return;
      }

      if (req.file) {
        const extension = req.file.originalname.split(".").pop()?.toLowerCase() ?? "";
        if (!CONTACT_ATTACHMENT_EXTENSIONS.includes(extension)) {
          res.status(400).json({
            error: "Please upload an image, PDF, DOC, or DOCX file.",
          });
          return;
        }
      }

      if (isPostmarkConfigured() && !emailEnv.contactToEmail) {
        res.status(503).json({
          error: "Contact form is not configured. Please try again later.",
        });
        return;
      }

      const destination = emailEnv.contactToEmail ?? "mock-contact@localhost";

      const submission = {
        firstName,
        email,
        phone,
        message,
        submittedAt: getSubmissionTimestamp(),
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
        attachment: req.file ? toEmailAttachment(req.file) : undefined,
      };

      const emailContent = buildContactEmail(submission);

      await sendEmail({
        to: destination,
        replyTo: email,
        subject: emailContent.subject,
        textBody: emailContent.textBody,
        htmlBody: emailContent.htmlBody,
        tag: "contact-form",
        attachments: emailContent.attachments,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      const uploadError = handleUploadError(error);
      if (uploadError) {
        res.status(uploadError.status).json({ error: uploadError.message });
        return;
      }

      console.error("[contact] submission failed:", error);
      res.status(500).json({
        error: "Something went wrong. Please try again in a moment.",
      });
    }
  },
);
