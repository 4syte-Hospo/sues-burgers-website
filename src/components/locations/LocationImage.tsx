import { getLocationImageSources } from "../../utils/locationImages";

type Props = {
  src: string;
  alt: string;
  className: string;
  loading?: "lazy" | "eager";
};

export function LocationImage({ src, alt, className, loading = "lazy" }: Props) {
  const optimized = getLocationImageSources(src);

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

  return <img src={src} alt={alt} className={className} loading={loading} decoding="async" />;
}
