import { Link } from "react-router-dom";
import {
  MOBILE_PREVIEW_DEVICES,
  TIKTOK_EMBED_PREVIEW_PATH,
} from "../../data/devicePreview";
import "./MobileDevicePreviewPage.css";

const FRAME_SCALE = 0.62;

function DeviceFrame({
  name,
  width,
  height,
}: {
  name: string;
  width: number;
  height: number;
}) {
  const scaledWidth = Math.round(width * FRAME_SCALE);
  const scaledHeight = Math.round(height * FRAME_SCALE);

  return (
    <article className="device-preview__device">
      <div className="device-preview__device-header">
        <h2 className="device-preview__device-name">{name}</h2>
        <p className="device-preview__device-size">
          {width} × {height}px viewport
        </p>
      </div>

      <div
        className="device-preview__frame"
        style={{ width: scaledWidth, height: scaledHeight }}
      >
        <div className="device-preview__bezel">
          <iframe
            title={`Sue's Love carousel on ${name}`}
            src={TIKTOK_EMBED_PREVIEW_PATH}
            width={width}
            height={height}
            className="device-preview__iframe"
            style={{
              width,
              height,
              transform: `scale(${FRAME_SCALE})`,
            }}
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}

export function MobileDevicePreviewPage() {
  if (!import.meta.env.DEV) {
    return (
      <div className="device-preview device-preview--blocked">
        <p>This preview page is only available in local development.</p>
        <Link to="/">Back to homepage</Link>
      </div>
    );
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost:5173";

  return (
    <div className="device-preview">
      <header className="device-preview__banner">
        <p className="device-preview__eyebrow">Dev only — not deployed</p>
        <h1 className="device-preview__title">Sue&apos;s Love — mobile device preview</h1>
        <p className="device-preview__body">
          Live preview of the refined TikTok carousel at each phone&apos;s CSS viewport size.
          TikTok embeds load inside each frame — allow a few seconds after opening.
        </p>
        <p className="device-preview__link-row">
          <strong>Preview URL:</strong>{" "}
          <a href={`${origin}/dev/mobile-preview`}>{origin}/dev/mobile-preview</a>
        </p>
        <Link to="/" className="device-preview__back">
          ← Back to homepage
        </Link>
      </header>

      <div className="device-preview__grid">
        {MOBILE_PREVIEW_DEVICES.map((device) => (
          <DeviceFrame
            key={device.id}
            name={device.name}
            width={device.width}
            height={device.height}
          />
        ))}
      </div>
    </div>
  );
}
