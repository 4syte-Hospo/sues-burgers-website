import type { PageSeoConfig } from "../data/seo";
import { absoluteUrl } from "../data/seo";

type MetaEntry = {
  attribute: "name" | "property";
  key: string;
  content: string;
};

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertLink(rel: string, href: string) {
  const selector = `link[rel="${rel}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

export function applyPageMeta(config: PageSeoConfig) {
  document.title = config.title;

  const canonicalUrl = absoluteUrl(config.canonicalPath ?? config.path);
  const imageUrl = absoluteUrl(config.ogImage ?? "/images/hero/heroimg3-web.png");

  upsertLink("canonical", canonicalUrl);

  const metaTags: MetaEntry[] = [
    { attribute: "name", key: "description", content: config.description },
    { attribute: "name", key: "robots", content: config.noindex ? "noindex, nofollow" : "index, follow" },
    { attribute: "property", key: "og:type", content: "website" },
    { attribute: "property", key: "og:site_name", content: "Sue's Burgers & Shakes" },
    { attribute: "property", key: "og:title", content: config.title },
    { attribute: "property", key: "og:description", content: config.description },
    { attribute: "property", key: "og:url", content: canonicalUrl },
    { attribute: "property", key: "og:image", content: imageUrl },
    { attribute: "property", key: "og:locale", content: "en_AU" },
    { attribute: "name", key: "twitter:card", content: "summary_large_image" },
    { attribute: "name", key: "twitter:title", content: config.title },
    { attribute: "name", key: "twitter:description", content: config.description },
    { attribute: "name", key: "twitter:image", content: imageUrl },
  ];

  metaTags.forEach(({ attribute, key, content }) => upsertMeta(attribute, key, content));
}
