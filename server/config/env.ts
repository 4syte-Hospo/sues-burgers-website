import "dotenv/config";

export type EmailEnvConfig = {
  postmarkApiToken: string | undefined;
  fromEmail: string | undefined;
  contactToEmail: string | undefined;
  careersToEmail: string | undefined;
};

export const emailEnv: EmailEnvConfig = {
  postmarkApiToken: process.env.POSTMARK_API_TOKEN?.trim() || undefined,
  fromEmail: process.env.POSTMARK_FROM_EMAIL?.trim() || undefined,
  contactToEmail: process.env.POSTMARK_CONTACT_TO_EMAIL?.trim() || undefined,
  careersToEmail: process.env.POSTMARK_CAREERS_TO_EMAIL?.trim() || undefined,
};

export function isPostmarkConfigured(): boolean {
  return Boolean(
    emailEnv.postmarkApiToken &&
      emailEnv.fromEmail &&
      emailEnv.contactToEmail &&
      emailEnv.careersToEmail,
  );
}

export const serverEnv = {
  port: Number(process.env.PORT ?? 3001),
  nodeEnv: process.env.NODE_ENV ?? "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;
