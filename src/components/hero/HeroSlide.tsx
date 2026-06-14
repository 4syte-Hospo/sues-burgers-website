import type { CSSProperties } from "react";
import type { ButtonPosition, HeroSlide as HeroSlideType } from "../../types/heroSlide";
import { getHeroImages } from "../../utils/heroImages";
import "./HeroSlider.css";

type Props = {
  slide: HeroSlideType;
  isFirst?: boolean;
  shouldLoad?: boolean;
};

const DEFAULT_DESKTOP: ButtonPosition = { x: 50, y: 80 };
const DEFAULT_MOBILE: ButtonPosition = { x: 50, y: 85 };

export function HeroSlide({ slide, isFirst = false, shouldLoad = true }: Props) {
  const desktop = slide.buttonPositionDesktop ?? DEFAULT_DESKTOP;
  const mobile = slide.buttonPositionMobile ?? DEFAULT_MOBILE;
  const images = getHeroImages(slide.imageKey);

  return (
    <article
      className="hero-slide"
      style={
        {
          "--cta-x-desktop": `${desktop.x}%`,
          "--cta-y-desktop": `${desktop.y}%`,
          "--cta-x-mobile": `${mobile.x}%`,
          "--cta-y-mobile": `${mobile.y}%`,
        } as CSSProperties
      }
    >
      <picture>
        {shouldLoad ? (
          <>
            <source
              media="(min-width: 768px)"
              type="image/avif"
              srcSet={images.desktop.avifSrcSet}
              sizes={images.sizes}
            />
            <source
              media="(min-width: 768px)"
              type="image/webp"
              srcSet={images.desktop.webpSrcSet}
              sizes={images.sizes}
            />
            <source type="image/avif" srcSet={images.mobile.avifSrcSet} sizes={images.sizes} />
            <source type="image/webp" srcSet={images.mobile.webpSrcSet} sizes={images.sizes} />
            <img
              src={images.mobile.fallback}
              alt={slide.alt}
              className="hero-slide__art"
              width={images.mobileWidth}
              height={images.mobileHeight}
              loading={isFirst ? "eager" : "lazy"}
              fetchPriority={isFirst ? "high" : "low"}
              decoding={isFirst ? "sync" : "async"}
            />
          </>
        ) : null}
      </picture>

      <a
        href={slide.buttonLink}
        className="btn btn--primary btn--compact hero-slide__cta"
        target="_blank"
        rel="noopener noreferrer"
      >
        {slide.buttonText}
      </a>
    </article>
  );
}
