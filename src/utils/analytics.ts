import { GA_MEASUREMENT_ID } from "../config/analytics";
import { isStagingDeploy } from "../config/staging";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

/** Production only — excludes dev, localhost, and Netlify preview deploys. */
export function isAnalyticsEnabled(): boolean {
  if (!import.meta.env.PROD) return false;
  if (isStagingDeploy) return false;
  if (typeof window === "undefined") return false;

  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

function gtag(...args: unknown[]): void {
  if (!isAnalyticsEnabled() || typeof window.gtag !== "function") return;
  window.gtag(...args);
}

/** Load official gtag.js and initialise GA4 (call once). */
export function initAnalytics(): void {
  if (!isAnalyticsEnabled() || initialized) return;
  initialized = true;

  window.dataLayer = window.dataLayer ?? [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_MEASUREMENT_ID);

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
}

/** SPA page view — use on React Router route changes. */
export function trackPageView(path: string, title?: string): void {
  gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    page_title: title ?? document.title,
  });
}

export function trackOrderNowClick(source = "unknown"): void {
  gtag("event", "order_now_click", { source });
}

export function trackMenuView(): void {
  gtag("event", "menu_view");
}

export function trackLocationsView(): void {
  gtag("event", "locations_view");
}

export function trackCareersApply(): void {
  gtag("event", "careers_apply");
}

export function trackContactSubmit(): void {
  gtag("event", "contact_submit");
}
