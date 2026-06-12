/** Button anchor as % from the top-left of the artwork (center of button). */
export type ButtonPosition = {
  x: number;
  y: number;
};

export type HeroSlide = {
  id: string;
  desktopImage: string;
  mobileImage: string;
  /** Describes the artwork for screen readers */
  alt: string;
  buttonText: string;
  buttonLink: string;
  active: boolean;
  buttonPositionDesktop?: ButtonPosition;
  buttonPositionMobile?: ButtonPosition;
};
