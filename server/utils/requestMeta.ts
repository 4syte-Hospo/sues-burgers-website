import type { Request } from "express";

export function getClientIpFromForwarded(forwarded: string | string[] | undefined): string {
  if (typeof forwarded === "string" && forwarded.length > 0) {
    return forwarded.split(",")[0]?.trim() ?? "Unknown";
  }

  if (Array.isArray(forwarded) && forwarded[0]) {
    return forwarded[0].split(",")[0]?.trim() ?? "Unknown";
  }

  return "Unknown";
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const fromHeader = getClientIpFromForwarded(forwarded);
  if (fromHeader !== "Unknown") return fromHeader;

  return req.socket.remoteAddress ?? "Unknown";
}

export function getClientIpFromHeaders(
  headers: Record<string, string | undefined>,
): string {
  const fromHeader = getClientIpFromForwarded(
    headers["x-forwarded-for"] ?? headers["X-Forwarded-For"],
  );
  if (fromHeader !== "Unknown") return fromHeader;

  return headers["client-ip"] ?? headers["x-nf-client-connection-ip"] ?? "Unknown";
}

export function getUserAgent(req: Request): string {
  return req.get("user-agent") ?? "Unknown";
}

export function getUserAgentFromHeaders(
  headers: Record<string, string | undefined>,
): string {
  return headers["user-agent"] ?? headers["User-Agent"] ?? "Unknown";
}

export function getSubmissionTimestamp(): string {
  return new Date().toLocaleString("en-AU", {
    timeZone: "Australia/Brisbane",
    dateStyle: "medium",
    timeStyle: "short",
  });
}
