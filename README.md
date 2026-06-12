# Sue's Burgers Website

Responsive rebuild of the Sue's Burgers homepage — Vite + React + TypeScript.

## Quick start

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Editing homepage slides

Hero slides are **Canva marketing banners** — not built from HTML text columns.

### Update workflow

1. Export **desktop** and **mobile** artwork from Canva (no CTA button in the export).
2. Drop files into `public/images/hero/` (WebP, PNG, or JPG).
3. Edit `src/data/heroSlides.ts` — update paths, button text/link, and positions.
4. Done.

### Slide fields

| Field | Purpose |
|-------|---------|
| `desktopImage` | Artwork shown at 768px and above |
| `mobileImage` | Artwork shown below 768px |
| `alt` | Screen-reader description of the banner |
| `buttonText` / `buttonLink` | Real HTML CTA layered over the artwork |
| `active` | `false` hides the slide without deleting it |
| `buttonPositionDesktop` | `{ x, y }` — button centre as % from top-left (desktop) |
| `buttonPositionMobile` | `{ x, y }` — button centre as % from top-left (mobile) |

Example:

```ts
{
  id: "dirty-soda-bar",
  desktopImage: "/images/hero/dirty-soda-desktop.webp",
  mobileImage: "/images/hero/dirty-soda-mobile.webp",
  alt: "Dirty Soda Bar promotion",
  buttonText: "ORDER ONLINE",
  buttonLink: "https://suesburgers.redcatcloud.com.au/app/",
  active: true,
  buttonPositionDesktop: { x: 72, y: 78 },
  buttonPositionMobile: { x: 50, y: 88 },
}
```

### Button positioning tip

Open the site, check where the real button lands vs your artwork, then tweak `x` / `y` in 1–2% steps until it sits over the blank CTA area in your Canva export.

## Editing menu items

Edit `src/data/menuItems.ts`. Each item supports `name`, `category`, `description`, `price`, `image`, `badge`, `orderLink`, and `active`.

Menu cards are rendered automatically from this file — do not duplicate card markup.

## Order link

Default order URL lives in `src/data/site.ts` as `ORDER_URL`.

## Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/`.
