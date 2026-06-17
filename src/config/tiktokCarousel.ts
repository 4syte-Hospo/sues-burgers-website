export type TikTokCarouselVariant = "default" | "legacy" | "preview";

/**
 * Dev-only: preview alternate carousel layouts on the homepage.
 * - ?tiktok=legacy — pre-refined oversized embed cards
 * - ?tiktok=preview — custom thumbnail preview cards
 * Production always uses the default (refined) embed layout.
 */
export function getHomeTikTokVariant(): TikTokCarouselVariant {
  if (!import.meta.env.DEV || typeof window === "undefined") {
    return "default";
  }

  const variant = new URLSearchParams(window.location.search).get("tiktok");
  if (variant === "legacy") return "legacy";
  if (variant === "preview") return "preview";
  // refined is now the production default; keep query param for local bookmarks
  if (variant === "refined") return "default";

  return "default";
}

export const TIKTOK_PREVIEW_PATH = "/dev/tiktok-preview";
