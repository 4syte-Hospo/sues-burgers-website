import { Router } from "express";
import { handleContactSubmission } from "../handlers/contactSubmission.js";
import { runUpload } from "../middleware/runUpload.js";
import { handleUploadError } from "../middleware/upload.js";
import {
  getClientIp,
  getUserAgent,
} from "../utils/requestMeta.js";

export const contactRouter = Router();

contactRouter.post("/", runUpload("attachment"), async (req, res) => {
  try {
    const result = await handleContactSubmission({
      firstName: String(req.body.firstName ?? ""),
      email: String(req.body.email ?? ""),
      phone: String(req.body.phone ?? ""),
      message: String(req.body.message ?? ""),
      attachment: req.file
        ? {
            originalname: req.file.originalname,
            buffer: req.file.buffer,
            mimetype: req.file.mimetype,
            size: req.file.size,
          }
        : undefined,
      ipAddress: getClientIp(req),
      userAgent: getUserAgent(req),
    });

    res.status(result.status).json(result.body);
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
});
