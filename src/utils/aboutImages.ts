import manifest from "../data/aboutImageOptimizedManifest.json";

export type AboutResponsiveImage = {
  avifSrcSet: string;
  webpSrcSet: string;
  fallback: string;
  sizes: string;
  width: number;
  height: number;
};

function stemFromAboutPath(imagePath: string): string | null {
  const match = imagePath.match(/\/images\/about\/([^/]+)\.[^.]+$/);
  return match?.[1] ?? null;
}

export function getAboutImageSources(imagePath: string): AboutResponsiveImage | null {
  const stem = stemFromAboutPath(imagePath);
  if (!stem) return null;

  const entry = manifest.images[stem as keyof typeof manifest.images];
  if (!entry) return null;

  return {
    avifSrcSet: entry.srcset.avif,
    webpSrcSet: entry.srcset.webp,
    fallback: entry.fallback,
    sizes: manifest.sizes,
    width: entry.width,
    height: entry.height,
  };
}
