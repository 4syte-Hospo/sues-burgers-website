import type { CareersLocation, CareersRole } from "../types/careers";

export const careersHero = {
  headline: "Join the Sue's Team!",
  intro:
    "Are you passionate about delivering exceptional dining experiences and being part of a fun team? Sue's Burgers is on the lookout for our next superstar — whether you're a culinary maestro ready to conquer the kitchen or a hospitality enthusiast eager to shine up front.",
  cta: "Apply below and tell us where you'd like to make your mark.",
} as const;

export const careersSuccessMessage =
  "Thanks for applying! We've received your application and will be in touch if we're moving forward.";

export const careerRoles: { id: CareersRole; label: string }[] = [
  { id: "foh-team-member", label: "Front of House - Team Member" },
  { id: "foh-shift-leader", label: "Front of House - Shift Leader" },
  { id: "kitchen-team-member", label: "Kitchen - Team Member" },
  { id: "kitchen-supervisor", label: "Kitchen - Supervisor" },
];

export const careerLocations: { id: CareersLocation; label: string }[] = [
  { id: "carindale", label: "Carindale" },
  { id: "woolloongabba", label: "Woolloongabba" },
  { id: "location-three", label: "Sue's #3 / Coming Soon" },
  { id: "any", label: "Any location" },
];

export const careersResumeAccept = ".pdf,.doc,.docx";
export const careersResumeMaxBytes = 5 * 1024 * 1024;
