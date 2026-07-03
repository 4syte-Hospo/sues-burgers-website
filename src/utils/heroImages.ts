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

function withAssetVersion(url: string): string {
  const version = manifest.assetVersion;
  if (!version) return url;
  return `${url}?v=${version}`;
}

function withAssetVersionSrcSet(srcset: string): string {
  return srcset
    .split(", ")
    .map((part) => {
      const lastSpace = part.lastIndexOf(" ");
      if (lastSpace === -1) return withAssetVersion(part);
      const url = part.slice(0, lastSpace);
      const descriptor = part.slice(lastSpace + 1);
      return `${withAssetVersion(url)} ${descriptor}`;
    })
    .join(", ");
}

export function getHeroImages(key: HeroImageKey): HeroResponsiveImages {
  const slide = manifest.slides[key];

  return {
    mobile: {
      avifSrcSet: withAssetVersionSrcSet(slide.mobile.srcset.avif),
      webpSrcSet: withAssetVersionSrcSet(slide.mobile.srcset.webp),
      fallback: withAssetVersion(slide.mobile.fallback),
    },
    desktop: {
      avifSrcSet: withAssetVersionSrcSet(slide.desktop.srcset.avif),
      webpSrcSet: withAssetVersionSrcSet(slide.desktop.srcset.webp),
      fallback: withAssetVersion(slide.desktop.fallback),
    },
    sizes: manifest.sizes,
    mobileWidth: manifest.mobileLayout.width,
    mobileHeight: manifest.mobileLayout.height,
    desktopWidth: manifest.desktopLayout.width,
    desktopHeight: manifest.desktopLayout.height,
  };
}

/** First homepage slide — used for LCP preload hints in index.html */
export const LCP_HERO_IMAGES = getHeroImages("tiktokhero");
