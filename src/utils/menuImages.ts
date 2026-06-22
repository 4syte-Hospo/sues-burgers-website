import manifest from "../data/menuImageOptimizedManifest.json";

export type MenuResponsiveImage = {
  avifSrcSet: string;
  webpSrcSet: string;
  fallback: string;
  sizes: string;
  width: number;
  height: number;
};

function stemFromMenuPath(imagePath: string): string | null {
  const match = imagePath.match(/\/images\/menu\/([^/]+)\.[^.]+$/);
  return match?.[1] ?? null;
}

export function getMenuImageSources(imagePath: string): MenuResponsiveImage | null {
  const stem = stemFromMenuPath(imagePath);
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
