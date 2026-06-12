import type { EmailProvider, SendEmailPayload } from "./types.js";

export class MockEmailProvider implements EmailProvider {
  readonly name = "mock";

  async send(payload: SendEmailPayload): Promise<void> {
    const attachmentSummary = payload.attachments?.map((file) => ({
      name: file.name,
      contentType: file.contentType,
      bytes: file.content.length,
    }));

    console.info("[MockEmailProvider] Email captured (Postmark not configured):");
    console.info(
      JSON.stringify(
        {
          to: payload.to,
          replyTo: payload.replyTo,
          subject: payload.subject,
          tag: payload.tag,
          textBody: payload.textBody,
          attachments: attachmentSummary ?? [],
        },
        null,
        2,
      ),
    );
  }
}
