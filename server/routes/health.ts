import { Router } from "express";
import { isPostmarkConfigured } from "../config/env.js";
import { getEmailProviderName } from "../email/emailService.js";

export const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({
    ok: true,
    emailProvider: getEmailProviderName(),
    postmarkConfigured: isPostmarkConfigured(),
  });
});
