import { getAboutImageSources } from "../utils/aboutImages";

type Props = {
  src: string;
  alt: string;
  className?: string;
  loading?: "lazy" | "eager";
};

export function AboutImage({ src, alt, className, loading = "lazy" }: Props) {
  const optimized = getAboutImageSources(src);

  if (optimized) {
    return (
      <picture>
        <source type="image/avif" srcSet={optimized.avifSrcSet} sizes={optimized.sizes} />
        <source type="image/webp" srcSet={optimized.webpSrcSet} sizes={optimized.sizes} />
        <img
          src={optimized.fallback}
          alt={alt}
          className={className}
          loading={loading}
          decoding="async"
          width={optimized.width}
          height={optimized.height}
        />
      </picture>
    );
  }

  return (
    <img src={src} alt={alt} className={className} loading={loading} decoding="async" />
  );
}
