import type { HeroSlide } from "../types/heroSlide";

const ORDER_URL = "https://suesburgers.redcatcloud.com.au/app/";

/**
 * Hero slides — PNG exports live in public/images/hero/
 * (heroimg1 = Dirty Soda, heroimg2 = Chili Mozzarella, heroimg3 = Raising Dave's,
 *  heroimg4 = Chicken Crack Sando)
 *
 * Desktop: *-web.png (2000px-wide). Mobile: *-mobile.png (portrait 4:5).
 */
export const heroSlides: HeroSlide[] = [
  {
    id: "chicken-crack-sando",
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
