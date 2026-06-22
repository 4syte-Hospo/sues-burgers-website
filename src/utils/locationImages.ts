import manifest from "../data/locationImageOptimizedManifest.json";

export type LocationResponsiveImage = {
  avifSrcSet: string;
  webpSrcSet: string;
  fallback: string;
  sizes: string;
  width: number;
  height: number;
};

function stemFromLocationPath(imagePath: string): string | null {
  const match = imagePath.match(/\/images\/locations\/([^/]+)\.[^.]+$/);
  return match?.[1] ?? null;
}

export function getLocationImageSources(imagePath: string): LocationResponsiveImage | null {
  const stem = stemFromLocationPath(imagePath);
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
