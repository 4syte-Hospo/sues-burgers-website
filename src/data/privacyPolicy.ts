export type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export const privacyPolicyPage = {
  path: "/suesprivacypolicy",
  eyebrow: "Legal",
  title: "Privacy Policy",
  lastUpdated: "9 June 2026",
  intro:
    "Sue's Burgers & Shakes respects your privacy. This policy explains how SUES DINING GROUP PTY LTD collects, uses, stores and protects personal information when you visit our website, order online, dine with us, contact us or apply for a role with us.",
} as const;

export const privacySections: PrivacySection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      "In this policy, we, us or our means SUES DINING GROUP PTY LTD (ACN 652 845 228) of 1201a/1151 Creek Road, Carindale, Brisbane, Queensland 4152.",
      "We operate Sue's Burgers & Shakes restaurants in Brisbane and the website suesburgers.com.au.",
    ],
  },
  {
    id: "commitment",
    title: "Our commitment",
    paragraphs: [
      "We respect and uphold your rights under the Australian Privacy Principles contained in the Privacy Act 1988 (Cth). This policy describes how we handle personal information collected offline or online, including through our website and online ordering platforms.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information we collect",
    paragraphs: [
      "The types of personal information we may collect include:",
    ],
    bullets: [
      "Contact details such as your name, email address, phone number and mailing address",
      "Order and transaction details when you purchase from us online or in-store",
      "Payment information processed by our payment providers (we do not store full card details)",
      "Communications you send us, including feedback, enquiries, complaints and survey responses",
      "Employment or careers application information",
      "Website usage data such as browser type, device information, pages viewed and referral source",
      "Information you choose to provide when interacting with us on social media",
    ],
  },
  {
    id: "how-we-use",
    title: "How we use your information",
    paragraphs: [
      "We collect, hold, use and disclose personal information for purposes including:",
    ],
    bullets: [
      "Providing products and services, processing orders and managing payments",
      "Responding to enquiries, feedback and complaints",
      "Operating and improving our website, ordering systems and customer experience",
      "Marketing and promotional communications where permitted by law and with your consent where required",
      "Recruitment and employment processes",
      "Complying with legal obligations and resolving disputes",
      "Managing future loyalty or rewards programs if and when they are offered",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "Our website may use cookies and similar technologies to remember preferences, understand how visitors use the site and improve performance. You can control cookies through your browser settings. Disabling cookies may affect some site features.",
    ],
  },
  {
    id: "disclosure",
    title: "When we share information",
    paragraphs: [
      "We may disclose personal information to trusted third parties who help us operate our business, such as:",
      "Some service providers may store or process data outside Australia. Where this occurs, we take reasonable steps to ensure information is handled in line with this policy and applicable law.",
    ],
    bullets: [
      "Online ordering and payment providers",
      "IT, hosting and website service providers",
      "Marketing and analytics partners",
      "Professional advisers including lawyers and accountants",
      "Regulators, courts or law enforcement when required by law",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights and choices",
    paragraphs: [
      "You may request access to personal information we hold about you or ask us to correct information that is inaccurate, incomplete or out of date.",
      "You may opt out of marketing communications at any time by using the unsubscribe link in a message or contacting us directly.",
      "If you have a privacy complaint, contact us using the details below. We will acknowledge your complaint and aim to respond within 30 days. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner at oaic.gov.au or 1300 363 992.",
    ],
  },
  {
    id: "security",
    title: "Storage and security",
    paragraphs: [
      "We take reasonable steps to protect personal information from misuse, interference, loss, unauthorised access, modification or disclosure. No method of transmission over the internet is completely secure, and you provide information at your own risk.",
    ],
  },
  {
    id: "changes",
    title: "Changes to this policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. The current version will always be published on this page with an updated date. Continued use of our website or services after changes are published constitutes acceptance of the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact us",
    paragraphs: [
      "For privacy questions, access requests or complaints, contact:",
      "SUES DINING GROUP PTY LTD",
      "1201a/1151 Creek Road, Carindale QLD 4152",
      "Email: info@suesburgers.com.au",
    ],
  },
];
