import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SUE_SCRIPT_LOGO_SRC } from "../../data/site";
import {
  TIKTOK_EMBED_BASE,
  tiktokSection,
  tiktokVideos,
} from "../../data/tiktokVideos";
import "./TikTokSection.css";

function ArrowIcon({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      className="tiktok-section__arrow-icon"
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

function TikTokCard({ videoId, label }: { videoId: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [showEmbed, setShowEmbed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setShowEmbed(true);
      },
      { rootMargin: "240px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="tiktok-card">
      <div className="tiktok-card__frame">
        <div className="tiktok-card__embed-wrap">
          {showEmbed ? (
            <iframe
              src={`${TIKTOK_EMBED_BASE}/${videoId}`}
              title={label}
              className="tiktok-card__embed"
              allow="fullscreen; encrypted-media"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="tiktok-card__placeholder" aria-hidden="true" />
          )}
        </div>
      </div>
    </div>
  );
}

export function TikTokSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
    loop: false,
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const updateButtons = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on("select", updateButtons);
    emblaApi.on("reInit", updateButtons);
    emblaApi.on("scroll", updateButtons);
    updateButtons();

    return () => {
      emblaApi.off("select", updateButtons);
      emblaApi.off("reInit", updateButtons);
      emblaApi.off("scroll", updateButtons);
    };
  }, [emblaApi]);

  return (
    <section className="tiktok-section section" aria-labelledby="tiktok-heading">
      <div className="tiktok-section__header">
        <div className="tiktok-section__intro">
          <div className="tiktok-section__title-block">
            <h2 id="tiktok-heading" className="tiktok-section__title">
              <img
                src={SUE_SCRIPT_LOGO_SRC}
                alt="Sue's"
                className="tiktok-section__title-logo"
                width={640}
                height={208}
              />
              <span className="tiktok-section__title-display">Love</span>
            </h2>
          </div>

          <div className="tiktok-section__cta">
            <p className="tiktok-section__cta-label">{tiktokSection.tagline}</p>
            <a
              href={tiktokSection.handleUrl}
              className="tiktok-section__cta-pill"
              target="_blank"
              rel="noopener noreferrer"
            >
              {tiktokSection.handle}
            </a>
          </div>
        </div>
      </div>

      <div className="tiktok-section__carousel">
        <button
          type="button"
          className="tiktok-section__arrow tiktok-section__arrow--prev"
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label="Previous TikTok video"
        >
          <ArrowIcon direction="prev" />
        </button>

        <div className="tiktok-section__viewport" ref={emblaRef}>
          <div className="tiktok-section__track">
            {tiktokVideos.map((video) => (
              <div className="tiktok-section__slide" key={video.id}>
                <TikTokCard videoId={video.id} label={video.label} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="tiktok-section__arrow tiktok-section__arrow--next"
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label="Next TikTok video"
        >
          <ArrowIcon direction="next" />
        </button>
      </div>
    </section>
  );
}
