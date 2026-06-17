import { Link } from "react-router-dom";
import { TikTokSection } from "../../components/tiktok/TikTokSection";
import "./TikTokPreviewPage.css";

const VARIANTS = [
  {
    id: "tiktok-preview-current",
    headingId: "tiktok-heading-current",
    variant: "default" as const,
    label: "Current — refined TikTok embeds",
    meta: "Production baseline. ~33.5–40.5rem card height with full CTA visible.",
  },
  {
    id: "tiktok-preview-legacy",
    headingId: "tiktok-heading-legacy",
    variant: "legacy" as const,
    label: "Legacy — oversized embeds",
    meta: "Pre-refinement layout (~34–42rem) for comparison.",
  },
  {
    id: "tiktok-preview-cards",
    headingId: "tiktok-heading-preview",
    variant: "preview" as const,
    label: "Custom preview cards",
    meta: "Vertical thumbnail, creator handle, caption snippet, Watch on TikTok CTA.",
  },
];

export function TikTokPreviewPage() {
  if (!import.meta.env.DEV) {
    return (
      <div className="tiktok-preview tiktok-preview--blocked">
        <p>This preview page is only available in local development.</p>
        <Link to="/">Back to homepage</Link>
      </div>
    );
  }

  return (
    <div className="tiktok-preview">
      <header className="tiktok-preview__banner">
        <p className="tiktok-preview__eyebrow">Dev only — not deployed</p>
        <h1 className="tiktok-preview__title">TikTok carousel comparison</h1>
        <p className="tiktok-preview__body">
          Compare Sue&apos;s Love layouts below. Test on the homepage with{" "}
          <a href="/?tiktok=legacy">/?tiktok=legacy</a> or{" "}
          <a href="/?tiktok=preview">/?tiktok=preview</a>.
        </p>
        <Link to="/" className="tiktok-preview__link">
          ← Back to homepage
        </Link>
      </header>

      {VARIANTS.map((item) => (
        <section
          key={item.id}
          className="tiktok-preview__block"
          aria-labelledby={item.id}
        >
          <div className="tiktok-preview__label-wrap">
            <h2 id={item.id} className="tiktok-preview__label">
              {item.label}
            </h2>
            <p className="tiktok-preview__meta">{item.meta}</p>
          </div>
          <TikTokSection variant={item.variant} headingId={item.headingId} />
        </section>
      ))}

      <footer className="tiktok-preview__notes">
        <h3 className="tiktok-preview__notes-title">Notes</h3>
        <ul className="tiktok-preview__notes-list">
          <li>
            The refined embed layout is now the production default — modest card width, no iframe
            scaling, extra height for the TikTok &quot;Watch now&quot; CTA.
          </li>
          <li>
            Custom preview cards use locally cached thumbnails from TikTok oEmbed. Clicking opens
            the video on TikTok.
          </li>
          <li>
            Regenerate thumbnails with <code>npm run fetch:tiktok-thumbnails</code> when videos
            change.
          </li>
        </ul>
      </footer>
    </div>
  );
}
