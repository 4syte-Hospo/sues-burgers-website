import { writeFileSync } from "fs";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";

/** Keep in sync with src/config/siteConfig.ts SITE_URL and SITE_ROUTES */
const SITE_URL = "https://suesburgers.com.au";
const SITE_ROUTES = [
  "/",
  "/our-menu",
  "/locations",
  "/careers",
  "/faq",
  "/allergen-info",
  "/contact",
  "/suesprivacypolicy",
  "/sues-vip",
  "/sues-vip-terms-and-conditions",
  "/suesviptsandcs",
] as const;

function sitemapPlugin(): Plugin {
  return {
    name: "sue-sitemap",
    closeBundle() {
      const urls = SITE_ROUTES.map((path) => {
        const loc = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
        return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n  </url>`;
      });

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>
`;

      writeFileSync(resolve("dist/sitemap.xml"), xml, "utf8");
    },
  };
}

export default defineConfig({
  plugins: [react(), sitemapPlugin()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
});
