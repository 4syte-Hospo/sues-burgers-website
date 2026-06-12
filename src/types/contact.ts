export type ContactMessage = {
  firstName: string;
  email: string;
  phone: string;
  message: string;
  attachment: File | null;
};

export type ContactFormErrors = Partial<Record<keyof ContactMessage | "form", string>>;
