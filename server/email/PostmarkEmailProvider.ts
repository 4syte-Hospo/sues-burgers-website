import { ServerClient } from "postmark";
import type { EmailProvider, SendEmailPayload } from "./types.js";

export class PostmarkEmailProvider implements EmailProvider {
  readonly name = "postmark";
  private readonly client: ServerClient;
  private readonly fromEmail: string;

  constructor(apiToken: string, fromEmail: string) {
    this.client = new ServerClient(apiToken);
    this.fromEmail = fromEmail;
  }

  async send(payload: SendEmailPayload): Promise<void> {
    await this.client.sendEmail({
      From: this.fromEmail,
      To: payload.to,
      ReplyTo: payload.replyTo,
      Subject: payload.subject,
      TextBody: payload.textBody,
      HtmlBody: payload.htmlBody,
      Tag: payload.tag,
      Attachments: payload.attachments?.map((file) => ({
        Name: file.name,
        Content: file.content.toString("base64"),
        ContentType: file.contentType,
        ContentID: null,
      })),
    });
  }
}
