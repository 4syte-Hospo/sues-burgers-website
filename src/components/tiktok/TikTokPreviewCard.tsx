import type { TikTokVideo } from "../../data/tiktokVideos";
import "./TikTokPreviewCard.css";

function TikTokIcon() {
  return (
    <svg
      className="tiktok-social-card__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.75a8.18 8.18 0 0 0 4.78 1.52V6.82a4.85 4.85 0 0 1-1.01-.13z" />
    </svg>
  );
}

type Props = {
  video: TikTokVideo;
};

export function TikTokPreviewCard({ video }: Props) {
  return (
    <a
      href={video.url}
      className="tiktok-social-card"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${video.label} on TikTok by @${video.creator}`}
    >
      <div className="tiktok-social-card__media">
        <img
          src={video.thumbnail}
          alt=""
          className="tiktok-social-card__thumb"
          width={360}
          height={640}
          loading="lazy"
          decoding="async"
        />
        <span className="tiktok-social-card__play" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </div>

      <div className="tiktok-social-card__body">
        <p className="tiktok-social-card__creator">
          <TikTokIcon />
          <span>@{video.creator}</span>
        </p>
        <p className="tiktok-social-card__caption">{video.caption}</p>
        <span className="tiktok-social-card__cta">Watch on TikTok</span>
      </div>
    </a>
  );
}
