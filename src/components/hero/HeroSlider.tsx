import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { HeroSlide as HeroSlideType } from "../../types/heroSlide";
import { HeroSlide } from "./HeroSlide";
import "./HeroSlider.css";

type Props = {
  slides: HeroSlideType[];
};

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="hero__arrow-icon"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d={direction === "prev" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HeroSlider({ slides }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    containScroll: false,
    duration: 28,
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

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

  const showArrows = slides.length > 1;
  const slideCount = slides.length;

  const getSlidePosition = (index: number) => {
    if (index === selectedIndex) return "active";
    const prev = (selectedIndex - 1 + slideCount) % slideCount;
    const next = (selectedIndex + 1) % slideCount;
    if (index === prev) return "prev";
    if (index === next) return "next";
    return "hidden";
  };

  return (
    <section className="hero" aria-label="Featured promotions">
      <div className="hero__frame">
        <div className="hero__carousel">
          {showArrows && (
            <button
              type="button"
              className="hero__arrow hero__arrow--prev"
              onClick={scrollPrev}
              aria-label="Previous slide"
            >
              <ArrowIcon direction="prev" />
            </button>
          )}

          <div className="hero__viewport" ref={emblaRef}>
            <div className="hero__track">
              {slides.map((slide, index) => (
                <div
                  className={`hero__slide hero__slide--${getSlidePosition(index)}`}
                  key={slide.id}
                >
                  <HeroSlide slide={slide} isFirst={index === 0} />
                </div>
              ))}
            </div>
          </div>

          {showArrows && (
            <button
              type="button"
              className="hero__arrow hero__arrow--next"
              onClick={scrollNext}
              aria-label="Next slide"
            >
              <ArrowIcon direction="next" />
            </button>
          )}
        </div>

        {slides.length > 1 && (
          <div className="hero__dots" role="tablist" aria-label="Slide navigation">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`hero__dot ${index === selectedIndex ? "hero__dot--active" : ""}`}
                aria-selected={index === selectedIndex}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => emblaApi?.scrollTo(index)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
