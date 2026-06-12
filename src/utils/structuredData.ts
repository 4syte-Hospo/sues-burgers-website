import { SITE_NAME, SITE_URL } from "../config/siteConfig";
import { absoluteUrl } from "../data/seo";
import { faqItems } from "../data/faq";
import { locations } from "../data/locations";
import { menuSections } from "../data/fullMenu";
import { isVipComingSoonPath, VIP_PRIMARY_PATH } from "../data/vipPages";
import { LOGO_SRC, ORDER_URL, socialLinks } from "../data/site";

type JsonLd = Record<string, unknown>;

const ORGANIZATION_ID = `${SITE_URL}/#organization`;

function organizationSchema(): JsonLd {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl(LOGO_SRC),
    sameAs: socialLinks.map((link) => link.href),
  };
}

function webSiteSchema(): JsonLd {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    publisher: { "@id": ORGANIZATION_ID },
    inLanguage: "en-AU",
  };
}

function parseHours(hours: string) {
  const match = hours.match(
    /Mon\s*[–-]\s*Sun\s+(\d{1,2}):(\d{2})(am|pm)\s*[–-]\s*(\d{1,2}):(\d{2})(am|pm)/i,
  );
  if (!match) return "Mo-Su 11:00-21:00";

  const to24 = (hour: string, minute: string, meridiem: string) => {
    let h = Number(hour);
    if (meridiem.toLowerCase() === "pm" && h < 12) h += 12;
    if (meridiem.toLowerCase() === "am" && h === 12) h = 0;
    return `${String(h).padStart(2, "0")}:${minute}`;
  };

  const opens = to24(match[1], match[2], match[3]);
  const closes = to24(match[4], match[5], match[6]);
  return `Mo-Su ${opens}-${closes}`;
}

function restaurantSchema(location: typeof locations[number]): JsonLd {
  return {
    "@type": "Restaurant",
    "@id": `${SITE_URL}/locations#${location.id}`,
    name: `${SITE_NAME} — ${location.suburb}`,
    image: absoluteUrl(location.image),
    url: absoluteUrl("/locations"),
    telephone: location.phoneHref.replace("tel:", ""),
    servesCuisine: ["American", "Burgers", "Chicken", "Fast Casual"],
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: location.address,
      addressLocality: location.suburb,
      addressRegion: "QLD",
      addressCountry: "AU",
    },
    openingHours: parseHours(location.hours),
    hasMap: location.mapsUrl,
    parentOrganization: { "@id": ORGANIZATION_ID },
    menu: absoluteUrl("/our-menu"),
    acceptsReservations: false,
  };
}

function breadcrumbSchema(pathname: string): JsonLd {
  const labels: Record<string, string> = {
    "/": "Home",
    "/our-menu": "Menu",
    "/locations": "Locations",
    "/careers": "Careers",
    "/faq": "FAQ",
    "/allergen-info": "Allergen Information",
    "/contact": "Contact",
    "/suesprivacypolicy": "Privacy Policy",
    [VIP_PRIMARY_PATH]: "Sue's VIP",
  };

  const path = pathname.replace(/\/$/, "") || "/";
  const crumbs = [{ name: "Home", path: "/" }];

  if (path !== "/") {
    if (isVipComingSoonPath(path)) {
      crumbs.push({ name: "Sue's VIP", path: VIP_PRIMARY_PATH });
    } else {
      crumbs.push({ name: labels[path] ?? path.slice(1), path });
    }
  }

  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

function menuSchema(): JsonLd {
  const sections = menuSections.map((section) => ({
    "@type": "MenuSection",
    name: section.title,
    description: section.description,
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description,
      offers: item.price
        ? {
            "@type": "Offer",
            price: item.price,
            priceCurrency: "AUD",
            url: item.orderLink ?? ORDER_URL,
          }
        : undefined,
    })),
  }));

  return {
    "@type": "Menu",
    "@id": `${SITE_URL}/our-menu#menu`,
    name: "Sue's Burgers & Shakes Menu",
    description:
      "Smash burgers, southern fried chicken, Raising Dave's boxes, dirty sodas, loaded fries and thickshakes.",
    hasMenuSection: sections,
  };
}

function faqPageSchema(): JsonLd {
  return {
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
          .map((block) => {
            if (block.type === "list") return block.items.join("; ");
            if (block.type === "link") return block.label;
            return block.content;
          })
          .join(" "),
      },
    })),
  };
}

export function getStructuredDataForPath(pathname: string): JsonLd[] {
  const path = pathname.replace(/\/$/, "") || "/";
  const graph: JsonLd[] = [
    organizationSchema(),
    webSiteSchema(),
    breadcrumbSchema(path),
  ];

  locations.forEach((location) => graph.push(restaurantSchema(location)));

  if (path === "/our-menu") {
    graph.push(menuSchema());
  }

  if (path === "/faq") {
    graph.push(faqPageSchema());
  }

  return graph;
}

export function buildJsonLdDocument(schemas: JsonLd[]) {
  return {
    "@context": "https://schema.org",
    "@graph": schemas,
  };
}
