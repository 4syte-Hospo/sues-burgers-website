import type { EmailAttachment } from "../email/types.js";

const MIME_BY_EXTENSION: Record<string, string> = {
  pdf: "application/pdf",
  doc: "application/msword",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
};

export function toEmailAttachment(file: Express.Multer.File): EmailAttachment {
  const extension = file.originalname.split(".").pop()?.toLowerCase() ?? "";
  const contentType =
    file.mimetype || MIME_BY_EXTENSION[extension] || "application/octet-stream";

  return {
    name: file.originalname,
    content: file.buffer,
    contentType,
  };
}
