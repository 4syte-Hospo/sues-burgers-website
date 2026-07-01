import { heroSlides } from "../data/heroSlides";
import type { HeroSlide } from "../types/heroSlide";

/** Menu page hero — excludes homepage-only slides */
export function getActiveSlides(): HeroSlide[] {
  return heroSlides.filter((slide) => slide.active && !slide.homeOnly);
}

/** Homepage hero — includes all active slides */
export function getHomeSlides(): HeroSlide[] {
  return heroSlides.filter((slide) => slide.active);
}

export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}
