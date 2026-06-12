export const contactPage = {
  title: "Get in Touch",
  paragraphs: [
    "We recommend reviewing our FAQ page first, where we've addressed many common inquiries.",
    "If you still need assistance, please complete the form below, and a member of our team will get back to you as soon as possible.",
    "Please do not send booking inquiries through this form.",
  ],
  formEyebrow: "Send a message",
  formTitle: "Contact form",
  formIntro: "Tell us how we can help and we'll get back to you shortly.",
} as const;

export const contactSuccessMessage =
  "Thanks for reaching out! We've received your message and will be in touch as soon as possible.";

export const contactMessageMaxLength = 180;

export const contactAttachmentAccept =
  ".jpg,.jpeg,.png,.gif,.webp,.pdf,.doc,.docx";

export const contactAttachmentMaxBytes = 5 * 1024 * 1024;
