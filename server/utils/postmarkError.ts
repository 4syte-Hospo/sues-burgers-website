type PostmarkApiError = {
  statusCode?: number;
  message?: string;
  code?: number;
};

export function getPostmarkErrorMessage(error: unknown): string | undefined {
  if (!error || typeof error !== "object") return undefined;

  const postmarkError = error as PostmarkApiError;
  if (typeof postmarkError.message === "string" && postmarkError.message.trim()) {
    return postmarkError.message.trim();
  }

  return undefined;
}

export function getEmailDeliveryErrorMessage(error: unknown): string {
  const postmarkMessage = getPostmarkErrorMessage(error);
  const normalized = postmarkMessage?.toLowerCase() ?? "";

  if (
    normalized.includes("sender signature") ||
    normalized.includes("not a sender") ||
    normalized.includes("pending approval")
  ) {
    return "Email delivery is still being set up. Please try again shortly or email info@suesburgers.com.au directly.";
  }

  if (postmarkMessage) {
    console.error("[email] Postmark error:", postmarkMessage);
  }

  return "Something went wrong. Please try again in a moment.";
}
