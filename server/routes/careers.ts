import { Router } from "express";
import { handleCareersSubmission } from "../handlers/careersSubmission.js";
import { runUpload } from "../middleware/runUpload.js";
import { handleUploadError } from "../middleware/upload.js";
import {
  getClientIp,
  getUserAgent,
} from "../utils/requestMeta.js";

export const careersRouter = Router();

careersRouter.post("/", runUpload("resume"), async (req, res) => {
  try {
    const result = await handleCareersSubmission({
      name: String(req.body.name ?? ""),
      email: String(req.body.email ?? ""),
      phone: String(req.body.phone ?? ""),
      roles: String(req.body.roles ?? ""),
      locations: String(req.body.locations ?? ""),
      resume: req.file
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

    console.error("[careers] submission failed:", error);
    res.status(500).json({
      error: "Something went wrong. Please try again in a moment.",
    });
  }
});
