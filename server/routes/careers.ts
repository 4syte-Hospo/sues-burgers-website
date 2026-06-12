import { Router } from "express";
import { emailEnv, isPostmarkConfigured } from "../config/env.js";
import { sendEmail } from "../email/emailService.js";
import { buildCareersEmail } from "../email/templates/careers.js";
import { runUpload } from "../middleware/runUpload.js";
import { handleUploadError } from "../middleware/upload.js";
import { toEmailAttachment } from "../utils/fileAttachment.js";
import {
  getClientIp,
  getSubmissionTimestamp,
  getUserAgent,
} from "../utils/requestMeta.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RESUME_EXTENSIONS = ["pdf", "doc", "docx"];

export const careersRouter = Router();

careersRouter.post("/", runUpload("resume"), async (req, res) => {
    try {
      const name = String(req.body.name ?? "").trim();
      const email = String(req.body.email ?? "").trim();
      const phone = String(req.body.phone ?? "").trim();
      const roles = String(req.body.roles ?? "").trim();
      const locations = String(req.body.locations ?? "").trim();

      if (!name) {
        res.status(400).json({ error: "Please enter your name." });
        return;
      }

      if (!email || !EMAIL_PATTERN.test(email)) {
        res.status(400).json({ error: "Please enter a valid email address." });
        return;
      }

      if (!roles) {
        res.status(400).json({ error: "Please select at least one role." });
        return;
      }

      if (!locations) {
        res.status(400).json({ error: "Please select at least one location." });
        return;
      }

      if (!req.file) {
        res.status(400).json({ error: "Please upload your resume." });
        return;
      }

      const extension = req.file.originalname.split(".").pop()?.toLowerCase() ?? "";
      if (!RESUME_EXTENSIONS.includes(extension)) {
        res.status(400).json({ error: "Please upload a PDF, DOC, or DOCX file." });
        return;
      }

      if (isPostmarkConfigured() && !emailEnv.careersToEmail) {
        res.status(503).json({
          error: "Careers form is not configured. Please try again later.",
        });
        return;
      }

      const destination = emailEnv.careersToEmail ?? "mock-careers@localhost";

      const submission = {
        name,
        email,
        phone,
        roles,
        locations,
        submittedAt: getSubmissionTimestamp(),
        ipAddress: getClientIp(req),
        userAgent: getUserAgent(req),
        resume: toEmailAttachment(req.file),
      };

      const emailContent = buildCareersEmail(submission);

      await sendEmail({
        to: destination,
        replyTo: email,
        subject: emailContent.subject,
        textBody: emailContent.textBody,
        htmlBody: emailContent.htmlBody,
        tag: "careers-form",
        attachments: emailContent.attachments,
      });

      res.status(200).json({ success: true });
    } catch (error) {
      const uploadError = handleUploadError(error);
      if (uploadError) {
        res.status(uploadError.status).json({ error: uploadError.message });
        return;
      }

      console.error("[careers] submission failed:", error);
      res.status(500).json({
        error: "Something went wrong. Please try again in a moment.",
      });
    }
  },
);
