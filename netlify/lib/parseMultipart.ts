import Busboy from "busboy";
import { Readable } from "node:stream";
import type { UploadedFile } from "../../server/types/uploadedFile.js";

export type ParsedMultipart = {
  fields: Record<string, string>;
  files: Record<string, UploadedFile>;
};

export function parseMultipart(
  body: string,
  contentType: string,
  isBase64Encoded: boolean,
): Promise<ParsedMultipart> {
  return new Promise((resolve, reject) => {
    const fields: Record<string, string> = {};
    const files: Record<string, UploadedFile> = {};
    const pendingFiles: Promise<void>[] = [];

    const busboy = Busboy({
      headers: { "content-type": contentType },
      limits: { fileSize: 5 * 1024 * 1024, files: 1 },
    });

    busboy.on("field", (name, value) => {
      fields[name] = value;
    });

    busboy.on("file", (name, stream, info) => {
      const chunks: Buffer[] = [];

      const filePromise = new Promise<void>((resolveFile, rejectFile) => {
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("limit", () => {
          rejectFile(new Error("LIMIT_FILE_SIZE"));
        });
        stream.on("end", () => {
          const buffer = Buffer.concat(chunks);
          files[name] = {
            originalname: info.filename,
            mimetype: info.mimeType,
            buffer,
            size: buffer.length,
          };
          resolveFile();
        });
        stream.on("error", rejectFile);
      });

      pendingFiles.push(filePromise);
    });

    busboy.on("error", reject);

    busboy.on("finish", async () => {
      try {
        await Promise.all(pendingFiles);
        resolve({ fields, files });
      } catch (error) {
        reject(error);
      }
    });

    const buffer = isBase64Encoded
      ? Buffer.from(body, "base64")
      : Buffer.from(body, "utf8");

    Readable.from(buffer).pipe(busboy);
  });
}
