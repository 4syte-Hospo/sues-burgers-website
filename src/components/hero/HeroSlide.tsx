import type { CSSProperties } from "react";
import type { ButtonPosition, HeroSlide as HeroSlideType } from "../../types/heroSlide";
import "./HeroSlider.css";

type Props = {
  slide: HeroSlideType;
  isFirst?: boolean;
};

const DEFAULT_DESKTOP: ButtonPosition = { x: 50, y: 80 };
const DEFAULT_MOBILE: ButtonPosition = { x: 50, y: 85 };

export function HeroSlide({ slide, isFirst }: Props) {
  const desktop = slide.buttonPositionDesktop ?? DEFAULT_DESKTOP;
  const mobile = slide.buttonPositionMobile ?? DEFAULT_MOBILE;

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
      {/* Mobile-first: img defaults to portrait art; desktop via min-width source */}
      <picture>
        <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
        <img
          src={slide.mobileImage}
          alt={slide.alt}
          className="hero-slide__art"
          loading={isFirst ? "eager" : "lazy"}
          fetchPriority={isFirst ? "high" : "auto"}
          decoding={isFirst ? "sync" : "async"}
        />
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
