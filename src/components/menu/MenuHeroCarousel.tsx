import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import manifest from "../../data/heroImageManifest.json";
import type { HeroSlide } from "../../types/heroSlide";
import { getHeroImages, type HeroResponsiveImages } from "../../utils/heroImages";
import "./MenuHeroCarousel.css";

type Props = {
  slides: HeroSlide[];
};

function resolveSlideImages(slide: HeroSlide): HeroResponsiveImages | null {
  if (!slide.imageKey || !(slide.imageKey in manifest.slides)) {
    return null;
  }

  return getHeroImages(slide.imageKey);
}

function shouldLoadSlide(index: number, selectedIndex: number, slideCount: number): boolean {
  if (slideCount <= 1) return true;

  const prev = (selectedIndex - 1 + slideCount) % slideCount;
  const next = (selectedIndex + 1) % slideCount;
  return index === selectedIndex || index === prev || index === next;
}

type SlideImageProps = {
  slide: HeroSlide;
  isFirst: boolean;
  shouldLoad: boolean;
};

function MenuHeroSlideImage({ slide, isFirst, shouldLoad }: SlideImageProps) {
  const images = resolveSlideImages(slide);
  const imgProps = {
    alt: slide.alt,
    className: "menu-hero-carousel__image",
    loading: (isFirst ? "eager" : "lazy") as "eager" | "lazy",
    fetchPriority: (isFirst ? "high" : "low") as "high" | "low",
    decoding: (isFirst ? "sync" : "async") as "sync" | "async",
    width: images?.mobileWidth ?? manifest.mobileLayout.width,
    height: images?.mobileHeight ?? manifest.mobileLayout.height,
  };

  return (
    <picture>
      {shouldLoad && images ? (
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
          <img src={images.mobile.fallback} {...imgProps} />
        </>
      ) : shouldLoad ? (
        <>
          <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
          <img src={slide.mobileImage} {...imgProps} />
        </>
      ) : null}
    </picture>
  );
}

export function MenuHeroCarousel({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = window.setInterval(() => emblaApi.scrollNext(), 6000);

    return () => {
      emblaApi.off("select", onSelect);
      window.clearInterval(interval);
    };
  }, [emblaApi]);

  if (slides.length === 0) return null;

  return (
    <div className="menu-hero-carousel" aria-roledescription="carousel">
      <div className="menu-hero-carousel__viewport" ref={emblaRef}>
        <div className="menu-hero-carousel__track">
          {slides.map((slide, index) => (
            <div className="menu-hero-carousel__slide" key={slide.id}>
              <MenuHeroSlideImage
                slide={slide}
                isFirst={index === 0}
                shouldLoad={shouldLoadSlide(index, selectedIndex, slides.length)}
              />
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 && (
        <div className="menu-hero-carousel__dots" role="tablist" aria-label="Menu hero slides">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              className={`menu-hero-carousel__dot${
                index === selectedIndex ? " menu-hero-carousel__dot--active" : ""
              }`}
              aria-label={`Show slide ${index + 1} of ${slides.length}`}
              aria-selected={index === selectedIndex}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
