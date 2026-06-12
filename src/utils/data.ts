import { heroSlides } from "../data/heroSlides";
import type { HeroSlide } from "../types/heroSlide";

export function getActiveSlides(): HeroSlide[] {
  return heroSlides.filter((slide) => slide.active);
}

export function formatPrice(price: number): string {
  return Number.isInteger(price) ? `$${price}` : `$${price.toFixed(2)}`;
}
