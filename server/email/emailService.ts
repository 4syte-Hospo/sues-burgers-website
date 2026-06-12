import { emailEnv, isPostmarkConfigured } from "../config/env.js";
import { MockEmailProvider } from "./MockEmailProvider.js";
import { PostmarkEmailProvider } from "./PostmarkEmailProvider.js";
import type { EmailProvider, SendEmailPayload } from "./types.js";

let provider: EmailProvider | null = null;

export function getEmailProvider(): EmailProvider {
  if (provider) return provider;

  if (isPostmarkConfigured()) {
    provider = new PostmarkEmailProvider(
      emailEnv.postmarkApiToken!,
      emailEnv.fromEmail!,
    );
    console.info("[email] Using Postmark provider");
    return provider;
  }

  provider = new MockEmailProvider();
  console.warn(
    "[email] Postmark credentials missing — using mock provider (emails logged to console)",
  );
  return provider;
}

export async function sendEmail(payload: SendEmailPayload): Promise<void> {
  await getEmailProvider().send(payload);
}

export function getEmailProviderName(): string {
  return getEmailProvider().name;
}
