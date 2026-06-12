import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide } from "../../types/heroSlide";
import "./MenuHeroCarousel.css";

type Props = {
  slides: HeroSlide[];
};

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
              <picture>
                <source media="(min-width: 768px)" srcSet={slide.desktopImage} />
                <img
                  src={slide.mobileImage}
                  alt={slide.alt}
                  className="menu-hero-carousel__image"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding={index === 0 ? "sync" : "async"}
                />
              </picture>
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
