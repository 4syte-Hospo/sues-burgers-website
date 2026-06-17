export type PreviewDevice = {
  id: string;
  name: string;
  /** CSS viewport width in px */
  width: number;
  /** CSS viewport height in px */
  height: number;
};

/** Common mobile CSS viewports for Sue's Love carousel preview */
export const MOBILE_PREVIEW_DEVICES: PreviewDevice[] = [
  { id: "iphone-16-pro-max", name: "iPhone 16 Pro Max", width: 440, height: 956 },
  { id: "iphone-16-pro", name: "iPhone 16 Pro", width: 402, height: 874 },
  { id: "iphone-16", name: "iPhone 16", width: 393, height: 852 },
  { id: "iphone-se", name: "iPhone SE", width: 375, height: 667 },
  { id: "samsung-s25-ultra", name: "Samsung Galaxy S25 Ultra", width: 412, height: 915 },
  { id: "samsung-s25-plus", name: "Samsung Galaxy S25+", width: 384, height: 854 },
  { id: "samsung-s25", name: "Samsung Galaxy S25", width: 360, height: 780 },
  { id: "pixel-9-pro", name: "Google Pixel 9 Pro", width: 412, height: 892 },
  { id: "pixel-9", name: "Google Pixel 9", width: 412, height: 923 },
];

export const TIKTOK_EMBED_PREVIEW_PATH = "/dev/tiktok-embed";
export const MOBILE_DEVICE_PREVIEW_PATH = "/dev/mobile-preview";
