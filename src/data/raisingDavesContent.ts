import { ORDER_URL } from "./site";

export const raisingDavesContent = {
  eyebrow: "Raising Dave's",
  title: "Brisbane's Raising Dave's chicken tender box",
  body:
    "Chef Dave's TikTok-famous southern fried chicken — the Raising Dave's Box with garlic-buttered Texas toast, crispy fries and Dave's sauce. A Brisbane favourite and the Raising Cane's alternative locals actually line up for.",
  cta: { label: "Order Raising Dave's", href: ORDER_URL, external: true },
  image: {
    src: "/images/about/raising-daves-box.png",
    alt: "Raising Dave's Box — southern fried chicken tenders, fries, Texas toast and Dave's sauce in Brisbane",
  },
} as const;
