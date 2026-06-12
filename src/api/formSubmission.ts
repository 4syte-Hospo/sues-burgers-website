import { stagingFormsUnavailableMessage } from "../config/staging";

export class FormSubmissionError extends Error {
  readonly status: number;

  constructor(message: string, status = 500) {
    super(message);
    this.name = "FormSubmissionError";
    this.status = status;
  }
}

type ApiErrorBody = {
  error?: string;
};

export async function postFormData(endpoint: string, formData: FormData): Promise<void> {
  const response = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (response.ok) return;

  let message = "Something went wrong. Please try again in a moment.";

  try {
    const body = (await response.json()) as ApiErrorBody;
    if (body.error) message = body.error;
  } catch {
    // Non-JSON error response — keep default message.
  }

  throw new FormSubmissionError(message, response.status);
}

/** Maps API/network failures to a user-facing message (e.g. static staging with no backend). */
export function resolveFormSubmissionError(error: unknown): string {
  if (error instanceof FormSubmissionError && error.status === 404) {
    return stagingFormsUnavailableMessage;
  }

  if (error instanceof TypeError) {
    return stagingFormsUnavailableMessage;
  }

  if (error instanceof FormSubmissionError) {
    return error.message;
  }

  return "Something went wrong. Please try again in a moment.";
}
