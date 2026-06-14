import type { HeroSlide } from "../types/heroSlide";

const ORDER_URL = "https://suesburgers.redcatcloud.com.au/app/";

/**
 * Hero slides — optimized WebP/AVIF variants in public/images/hero/optimized/
 * (generated via `npm run generate:hero-images`). Source PNGs remain for OG/social.
 * (heroimg1 = Dirty Soda, heroimg2 = Chili Mozzarella, heroimg3 = Raising Dave's,
 *  heroimg4 = Chicken Crack Sando)
 *
 * Desktop: 1200px + 2000px landscape. Mobile: 768px + 1536px portrait 4:5.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "chicken-crack-sando",
    imageKey: "heroimg4",
    desktopImage: "/images/hero/heroimg4.png",
    mobileImage: "/images/hero/heroimg4-mobile.png",
    alt: "Limited time Chicken Crack Sando — spicy fried chicken, sriracha mayo, and crispy chicken skin on butter-toasted milk bread",
    buttonText: "ORDER ONLINE",
    buttonLink: ORDER_URL,
    active: true,
    buttonPositionDesktop: { x: 74, y: 88 },
    buttonPositionMobile: { x: 50, y: 93.5 },
  },
  {
    id: "raising-daves-box",
    imageKey: "heroimg3",
    desktopImage: "/images/hero/heroimg3-web.png",
    mobileImage: "/images/hero/heroimg3-mobile.png",
    alt: "Raising Dave's Box — fried chicken, fries, Texas toast and Dave's sauce",
    buttonText: "ORDER ONLINE",
    buttonLink: ORDER_URL,
    active: true,
    buttonPositionDesktop: { x: 75, y: 88 },
    buttonPositionMobile: { x: 50, y: 92.5 },
  },
  {
    id: "dirty-soda-bar",
    imageKey: "heroimg1",
    desktopImage: "/images/hero/heroimg1-web.png",
    mobileImage: "/images/hero/heroimg1-mobile.png",
    alt: "Dirty Soda Bar — creamy, fizzy, flavoured sodas",
    buttonText: "ORDER ONLINE",
    buttonLink: ORDER_URL,
    active: true,
    buttonPositionDesktop: { x: 50, y: 44 },
    buttonPositionMobile: { x: 50, y: 89 },
  },
  {
    id: "chili-mozzarella-sticks",
    imageKey: "heroimg2",
    desktopImage: "/images/hero/heroimg2-web.png",
    mobileImage: "/images/hero/heroimg2-mobile.png",
    alt: "Chili mozzarella sticks with a dramatic cheese pull",
    buttonText: "ORDER ONLINE",
    buttonLink: ORDER_URL,
    active: true,
    buttonPositionDesktop: { x: 65.5, y: 85 },
    buttonPositionMobile: { x: 69.2, y: 69 },
  },
];
