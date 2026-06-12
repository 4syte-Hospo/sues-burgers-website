export type EmailAttachment = {
  name: string;
  content: Buffer;
  contentType: string;
};

export type SendEmailPayload = {
  to: string;
  subject: string;
  textBody: string;
  htmlBody: string;
  replyTo?: string;
  tag?: string;
  attachments?: EmailAttachment[];
};

export interface EmailProvider {
  readonly name: string;
  send(payload: SendEmailPayload): Promise<void>;
}
