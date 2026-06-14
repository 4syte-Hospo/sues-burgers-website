import manifest from "../data/heroImageManifest.json";

export type HeroImageKey = keyof typeof manifest.slides;

export type HeroResponsiveImages = {
  mobile: {
    avifSrcSet: string;
    webpSrcSet: string;
    fallback: string;
  };
  desktop: {
    avifSrcSet: string;
    webpSrcSet: string;
    fallback: string;
  };
  sizes: string;
  mobileWidth: number;
  mobileHeight: number;
  desktopWidth: number;
  desktopHeight: number;
};

export function getHeroImages(key: HeroImageKey): HeroResponsiveImages {
  const slide = manifest.slides[key];

  return {
    mobile: {
      avifSrcSet: slide.mobile.srcset.avif,
      webpSrcSet: slide.mobile.srcset.webp,
      fallback: slide.mobile.fallback,
    },
    desktop: {
      avifSrcSet: slide.desktop.srcset.avif,
      webpSrcSet: slide.desktop.srcset.webp,
      fallback: slide.desktop.fallback,
    },
    sizes: manifest.sizes,
    mobileWidth: manifest.mobileLayout.width,
    mobileHeight: manifest.mobileLayout.height,
    desktopWidth: manifest.desktopLayout.width,
    desktopHeight: manifest.desktopLayout.height,
  };
}

/** First homepage slide — used for LCP preload hints in index.html */
export const LCP_HERO_IMAGES = getHeroImages("heroimg4");
