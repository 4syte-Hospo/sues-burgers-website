import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  initAnalytics,
  trackLocationsView,
  trackMenuView,
  trackPageView,
} from "../../utils/analytics";

export function GoogleAnalytics() {
  const { pathname, search } = useLocation();
  const skipInitialPageView = useRef(true);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    const pagePath = `${pathname}${search}`;

    if (skipInitialPageView.current) {
      skipInitialPageView.current = false;
      if (pathname === "/our-menu") trackMenuView();
      if (pathname === "/locations") trackLocationsView();
      return;
    }

    trackPageView(pagePath);

    if (pathname === "/our-menu") {
      trackMenuView();
    }

    if (pathname === "/locations") {
      trackLocationsView();
    }
  }, [pathname, search]);

  return null;
}
