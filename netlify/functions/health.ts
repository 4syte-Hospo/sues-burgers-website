import type { Handler } from "@netlify/functions";
import { isPostmarkConfigured } from "../../server/config/env.js";
import { getEmailProviderName } from "../../server/email/emailService.js";
import { jsonResponse } from "../lib/functionResponse.js";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  return jsonResponse(200, {
    ok: true,
    emailProvider: getEmailProviderName(),
    postmarkConfigured: isPostmarkConfigured(),
  });
};
