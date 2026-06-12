import { SITE_DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL } from "../config/siteConfig";
import { getVipRouteConfig, VIP_PRIMARY_PATH } from "./vipPages";

export type PageSeoConfig = {
  path: string;
  title: string;
  description: string;
  /** Relative path for Open Graph image */
  ogImage?: string;
  noindex?: boolean;
  /** Canonical URL when it differs from the active route (e.g. legacy aliases). */
  canonicalPath?: string;
};

const withSiteName = (pageTitle: string) =>
  pageTitle === SITE_NAME ? pageTitle : `${pageTitle} | ${SITE_NAME}`;

export const pageSeoConfig: Record<string, PageSeoConfig> = {
  "/": {
    path: "/",
    title: "Sue's Burgers and Shakes - Retro American Diner | Best Burgers Brisbane",
    description:
      "Come try the best burgers and thickshakes in Brisbane at Sue's — a retro American diner in Woolloongabba and Carindale. Smash burgers, Raising Dave's southern fried chicken, dirty sodas and loaded fries.",
    ogImage: "/images/hero/heroimg4.png",
  },
  "/our-menu": {
    path: "/our-menu",
    title: withSiteName("Menu — Burgers, Fried Chicken & Dirty Sodas"),
    description:
      "Explore Sue's full menu: smash burgers, southern fried chicken burgers, Raising Dave's boxes, loaded fries, dirty sodas, thickshakes and kids meals. Order online for Woolloongabba or Carindale.",
    ogImage: "/images/hero/heroimg3-web.png",
  },
  "/locations": {
    path: "/locations",
    title: withSiteName("Locations — Woolloongabba & Carindale"),
    description:
      "Find Sue's Burgers in Woolloongabba and Carindale. Opening hours, parking, phone numbers and Google Maps directions for Brisbane's best burgers and fried chicken.",
    ogImage: "/images/locations/woolloongabba.png",
  },
  "/careers": {
    path: "/careers",
    title: withSiteName("Careers"),
    description:
      "Join the Sue's team in Brisbane. We're hiring across our Woolloongabba and Carindale restaurants — apply online today.",
  },
  "/faq": {
    path: "/faq",
    title: withSiteName("FAQ — Bookings, Dietary & Delivery"),
    description:
      "Frequently asked questions about Sue's Burgers & Shakes — gluten free options, halal-friendly chicken, delivery, Raising Dave's, dirty sodas and family dining in Brisbane.",
  },
  "/allergen-info": {
    path: "/allergen-info",
    title: withSiteName("Allergen Information"),
    description:
      "Allergen matrix for Sue's Burgers & Shakes menu items — dairy, egg, gluten, soy, nuts and more. Updated allergen information for Brisbane diners.",
  },
  "/contact": {
    path: "/contact",
    title: withSiteName("Contact Us"),
    description:
      "Contact Sue's Burgers & Shakes in Brisbane. Questions about menu, catering, feedback or locations — get in touch with our Woolloongabba or Carindale team.",
  },
  "/suesprivacypolicy": {
    path: "/suesprivacypolicy",
    title: withSiteName("Privacy Policy"),
    description:
      "Privacy policy for Sue's Burgers & Shakes — how we collect, use, store and protect your personal information when you visit our website, order online or contact us.",
  },
};

export function getPageSeoConfig(pathname: string): PageSeoConfig {
  const normalized = pathname.replace(/\/$/, "") || "/";

  const configured = pageSeoConfig[normalized];
  if (configured) {
    return configured;
  }

  const vipRoute = getVipRouteConfig(normalized);
  if (vipRoute) {
    return {
      path: vipRoute.path,
      canonicalPath: VIP_PRIMARY_PATH,
      title: withSiteName(vipRoute.seoTitle),
      description: vipRoute.seoDescription,
    };
  }

  return {
    path: normalized,
    title: SITE_NAME,
    description: SITE_DEFAULT_DESCRIPTION,
  };
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
