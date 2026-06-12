import { getEmailEnv, isPostmarkConfigured } from "../config/env.js";
import { MockEmailProvider } from "./MockEmailProvider.js";
import { PostmarkEmailProvider } from "./PostmarkEmailProvider.js";
import type { EmailProvider, SendEmailPayload } from "./types.js";

export function getEmailProvider(): EmailProvider {
  if (isPostmarkConfigured()) {
    const env = getEmailEnv();
    return new PostmarkEmailProvider(env.postmarkApiToken!, env.fromEmail!);
  }

  return new MockEmailProvider();
}

export async function sendEmail(payload: SendEmailPayload): Promise<void> {
  const provider = getEmailProvider();

  if (provider.name === "mock") {
    console.warn(
      "[email] Postmark credentials missing — using mock provider (emails logged to console)",
    );
  } else {
    console.info("[email] Using Postmark provider");
  }

  await provider.send(payload);
}

export function getEmailProviderName(): string {
  return getEmailProvider().name;
}
