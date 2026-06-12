export const VIP_PRIMARY_PATH = "/sues-vip";

export const VIP_LEGACY_PATHS = [
  "/sues-vip-terms-and-conditions",
  "/suesviptsandcs",
] as const;

export type VipRouteConfig = {
  path: string;
  isLegacy: boolean;
  breadcrumbLabel: string;
  seoTitle: string;
  seoDescription: string;
};

const vipSeo = {
  seoTitle: "Sue's VIP — Coming Soon",
  seoDescription:
    "Something good is cooking. Sue's VIP is on its way — exclusive offers, member perks and special rewards from Sue's Burgers & Shakes.",
};

export const vipRoutes: Record<string, VipRouteConfig> = {
  [VIP_PRIMARY_PATH]: {
    path: VIP_PRIMARY_PATH,
    isLegacy: false,
    breadcrumbLabel: "Sue's VIP",
    ...vipSeo,
  },
  "/sues-vip-terms-and-conditions": {
    path: "/sues-vip-terms-and-conditions",
    isLegacy: true,
    breadcrumbLabel: "Sue's VIP",
    ...vipSeo,
  },
  "/suesviptsandcs": {
    path: "/suesviptsandcs",
    isLegacy: true,
    breadcrumbLabel: "Sue's VIP",
    ...vipSeo,
  },
};

export const vipComingSoonContent = {
  brand: "Sue's VIP",
  badge: "Coming soon",
  title: "Something good is cooking.",
  subheading:
    "We're building a brand new Sue's VIP experience with exclusive offers, member perks and special rewards.",
  tagline: "More details coming soon.",
} as const;

export function getVipRouteConfig(pathname: string): VipRouteConfig | undefined {
  const normalized = pathname.replace(/\/$/, "");
  return vipRoutes[normalized];
}

export function isVipComingSoonPath(pathname: string): boolean {
  return getVipRouteConfig(pathname) !== undefined;
}
