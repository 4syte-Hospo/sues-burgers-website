import { TikTokSection } from "../../components/tiktok/TikTokSection";
import "./TikTokEmbedPage.css";

/** Minimal page for device-preview iframes — Sue's Love carousel only */
export function TikTokEmbedPage() {
  return (
    <div className="tiktok-embed-page">
      <TikTokSection headingId="tiktok-embed-heading" />
    </div>
  );
}
