export const ORDER_URL = "https://suesburgers.redcatcloud.com.au/app/";

/** Swap logo: replace public/images/logo.png (or update this path). */
export const LOGO_SRC = "/images/logo.png";

/** Placeholder for menu items without a product photo. */
export const MENU_ITEM_PLACEHOLDER_SRC = "/images/menu-placeholder.png";

/** White cursive “Sue's” — Sue's Love TikTok section only (header/footer use LOGO_SRC). */
export const SUE_SCRIPT_LOGO_SRC = "/images/sue-script-logo-white.png";

export const navLinks = [
  { label: "Menu", href: "/our-menu" },
  { label: "Locations", href: "/locations" },
  { label: "Careers", href: "/careers" },
  { label: "FAQ", href: "/faq" },
] as const;

export const footerColumns = {
  visit: {
    title: "Visit",
    links: [
      { label: "Menu", href: "/our-menu", internal: true },
      { label: "Locations", href: "/locations", internal: true },
      { label: "Order Now", href: ORDER_URL, internal: false },
    ],
  },
  info: {
    title: "Info",
    links: [
      { label: "FAQ", href: "/faq", internal: true },
      { label: "Allergen Information", href: "/allergen-info", internal: true },
      { label: "Contact Us", href: "/contact", internal: true },
    ],
  },
  joinUs: {
    title: "Join Us",
    links: [{ label: "Careers", href: "/careers", internal: true }],
  },
} as const;

export const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/suesburgersandshakes",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@suesburgersandshakes",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/suesburgersandshakes",
  },
] as const;

export const marqueeItems = [
  "SMASH BURGERS",
  "FRIED CHICKEN",
  "DIRTY SODAS",
  "THICKSHAKES",
] as const;
