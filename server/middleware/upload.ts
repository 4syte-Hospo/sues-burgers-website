import multer from "multer";

const FIVE_MB = 5 * 1024 * 1024;

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: FIVE_MB,
    files: 1,
  },
});

export function handleUploadError(
  error: unknown,
): { status: number; message: string } | null {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return { status: 413, message: "File must be 5 MB or smaller." };
    }
    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return { status: 400, message: "Unexpected file upload." };
    }
    return { status: 400, message: "Invalid file upload." };
  }

  return null;
}
