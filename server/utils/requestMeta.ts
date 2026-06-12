import type { Request } from "express";

export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? "Unknown";
  }

  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() ?? "Unknown";
  }

  return req.socket.remoteAddress ?? "Unknown";
}

export function getUserAgent(req: Request): string {
  return req.get("user-agent") ?? "Unknown";
}

export function getSubmissionTimestamp(): string {
  return new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    dateStyle: "medium",
    timeStyle: "short",
  });
}
