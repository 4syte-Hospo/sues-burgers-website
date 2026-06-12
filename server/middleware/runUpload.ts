import type { NextFunction, Request, Response } from "express";
import { handleUploadError, upload } from "./upload.js";

export function runUpload(fieldName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.single(fieldName)(req, res, (error) => {
      if (error) {
        const uploadError = handleUploadError(error);
        if (uploadError) {
          res.status(uploadError.status).json({ error: uploadError.message });
          return;
        }
        next(error);
        return;
      }
      next();
    });
  };
}
