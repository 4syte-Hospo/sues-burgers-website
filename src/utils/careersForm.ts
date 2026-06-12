import { postFormData } from "../api/formSubmission";
import {
  careerLocations,
  careerRoles,
  careersResumeAccept,
  careersResumeMaxBytes,
} from "../data/careers";
import type { CareersApplication, CareersFormErrors } from "../types/careers";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[\d\s+()-]{8,}$/;

function roleLabel(id: CareersApplication["roles"][number]) {
  return careerRoles.find((role) => role.id === id)?.label ?? id;
}

function locationLabel(id: CareersApplication["locations"][number]) {
  return careerLocations.find((location) => location.id === id)?.label ?? id;
}

export function validateCareersApplication(
  application: CareersApplication,
): CareersFormErrors {
  const errors: CareersFormErrors = {};

  if (!application.name.trim()) {
    errors.name = "Please enter your name.";
  }

  if (!application.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(application.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (application.phone.trim() && !PHONE_PATTERN.test(application.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (application.roles.length === 0) {
    errors.roles = "Please select at least one role.";
  }

  if (application.locations.length === 0) {
    errors.locations = "Please select at least one location.";
  }

  if (!application.resume) {
    errors.resume = "Please upload your resume.";
  } else {
    const extension = application.resume.name.split(".").pop()?.toLowerCase() ?? "";
    const allowed = careersResumeAccept.split(",").map((type) => type.replace(".", ""));

    if (!allowed.includes(extension)) {
      errors.resume = "Please upload a PDF, DOC, or DOCX file.";
    } else if (application.resume.size > careersResumeMaxBytes) {
      errors.resume = "Resume must be 5 MB or smaller.";
    }
  }

  return errors;
}

export function buildCareersFormData(application: CareersApplication): FormData {
  const formData = new FormData();

  formData.append("name", application.name.trim());
  formData.append("email", application.email.trim());
  formData.append("phone", application.phone.trim());
  formData.append("roles", application.roles.map(roleLabel).join(", "));
  formData.append("locations", application.locations.map(locationLabel).join(", "));

  if (application.resume) {
    formData.append("resume", application.resume, application.resume.name);
  }

  return formData;
}

export async function submitCareersApplication(
  application: CareersApplication,
): Promise<void> {
  await postFormData("/api/careers", buildCareersFormData(application));
}

export const emptyCareersApplication = (): CareersApplication => ({
  name: "",
  email: "",
  phone: "",
  roles: [],
  locations: [],
  resume: null,
});
