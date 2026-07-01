import type { HeroImageKey } from "../utils/heroImages";

/** Button anchor as % from the top-left of the artwork (center of button). */
export type ButtonPosition = {
  x: number;
  y: number;
};

export type HeroSlide = {
  id: string;
  /** Key into heroImageManifest.json for responsive WebP/AVIF variants */
  imageKey: HeroImageKey;
  /** Legacy PNG paths — kept for OG/social references outside the carousel */
  desktopImage: string;
  mobileImage: string;
  /** Describes the artwork for screen readers */
  alt: string;
  buttonText?: string;
  buttonLink?: string;
  active: boolean;
  /** When false, no CTA button is rendered on the slide */
  showCta?: boolean;
  /** Homepage carousel only — excluded from the menu page hero */
  homeOnly?: boolean;
  buttonPositionDesktop?: ButtonPosition;
  buttonPositionMobile?: ButtonPosition;
};
