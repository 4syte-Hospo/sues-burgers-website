export type CareersRole =
  | "foh-team-member"
  | "foh-shift-leader"
  | "kitchen-team-member"
  | "kitchen-supervisor";

export type CareersLocation =
  | "carindale"
  | "woolloongabba"
  | "location-three"
  | "any";

export type CareersApplication = {
  name: string;
  email: string;
  phone: string;
  roles: CareersRole[];
  locations: CareersLocation[];
  resume: File | null;
};

export type CareersFormErrors = Partial<
  Record<keyof CareersApplication | "form", string>
>;
