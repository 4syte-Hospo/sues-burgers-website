import type { Handler } from "@netlify/functions";
import { handleContactSubmission } from "../../server/handlers/contactSubmission.js";
import { jsonResponse } from "../lib/functionResponse.js";
import { parseMultipart } from "../lib/parseMultipart.js";
import {
  getClientIpFromHeaders,
  getUserAgentFromHeaders,
} from "../../server/utils/requestMeta.js";

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return jsonResponse(405, { error: "Method not allowed" });
  }

  const contentType = event.headers["content-type"] ?? event.headers["Content-Type"];
  if (!contentType?.includes("multipart/form-data")) {
    return jsonResponse(400, { error: "Invalid form submission." });
  }

  if (!event.body) {
    return jsonResponse(400, { error: "Invalid form submission." });
  }

  try {
    const { fields, files } = await parseMultipart(
      event.body,
      contentType,
      event.isBase64Encoded,
    );

    const result = await handleContactSubmission({
      firstName: fields.firstName ?? "",
      email: fields.email ?? "",
      phone: fields.phone ?? "",
      message: fields.message ?? "",
      attachment: files.attachment,
      ipAddress: getClientIpFromHeaders(event.headers),
      userAgent: getUserAgentFromHeaders(event.headers),
    });

    return jsonResponse(result.status, result.body);
  } catch (error) {
    if (error instanceof Error && error.message === "LIMIT_FILE_SIZE") {
      return jsonResponse(413, { error: "File must be 5 MB or smaller." });
    }

    console.error("[contact] function failed:", error);
    return jsonResponse(500, {
      error: "Something went wrong. Please try again in a moment.",
    });
  }
};
