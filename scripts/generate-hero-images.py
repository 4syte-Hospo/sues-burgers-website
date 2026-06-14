#!/usr/bin/env python3
"""Generate responsive WebP/AVIF hero carousel variants from source PNGs."""

from __future__ import annotations

import json
import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
HERO_DIR = ROOT / "public" / "images" / "hero"
OUT_DIR = HERO_DIR / "optimized"
MANIFEST_PATH = ROOT / "src" / "data" / "heroImageManifest.json"

WEBP_QUALITY = 82
AVIF_QUALITY = 80

MOBILE_WIDTHS = (768, 1536)
DESKTOP_WIDTHS = (1200, 2000)

# Layout dimensions match HeroSlider.css aspect-ratio boxes (prevents CLS).
MOBILE_LAYOUT = (3750, 4688)
DESKTOP_LAYOUT = (2000, 1093)

SLIDES = (
    {
        "id": "heroimg4",
        "desktop": "heroimg4.png",
        "mobile": "heroimg4-mobile.png",
    },
    {
        "id": "heroimg3",
        "desktop": "heroimg3-web.png",
        "mobile": "heroimg3-mobile.png",
    },
    {
        "id": "heroimg1",
        "desktop": "heroimg1-web.png",
        "mobile": "heroimg1-mobile.png",
    },
    {
        "id": "heroimg2",
        "desktop": "heroimg2-web.png",
        "mobile": "heroimg2-mobile.png",
    },
)


def resize_to_width(image: Image.Image, target_width: int) -> Image.Image:
    width, height = image.size
    if width == target_width:
        return image.copy()
    target_height = round(height * (target_width / width))
    return image.resize((target_width, target_height), Image.Resampling.LANCZOS)


def encode_variants(image: Image.Image, base_name: str, widths: tuple[int, ...]) -> list[dict]:
    variants: list[dict] = []
    for width in widths:
        resized = resize_to_width(image, width)
        for fmt, quality in (("webp", WEBP_QUALITY), ("avif", AVIF_QUALITY)):
            filename = f"{base_name}-{width}.{fmt}"
            out_path = OUT_DIR / filename
            save_kwargs: dict = {"quality": quality, "method": 6} if fmt == "webp" else {"quality": quality}
            resized.save(out_path, fmt.upper(), **save_kwargs)
            variants.append(
                {
                    "src": f"/images/hero/optimized/{filename}",
                    "width": resized.size[0],
                    "height": resized.size[1],
                    "format": fmt,
                    "bytes": out_path.stat().st_size,
                }
            )
    return variants


def build_srcset(variants: list[dict], fmt: str) -> str:
    parts = [
        f"{item['src']} {item['width']}w"
        for item in variants
        if item["format"] == fmt
    ]
    return ", ".join(parts)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest: dict = {
        "mobileLayout": {"width": MOBILE_LAYOUT[0], "height": MOBILE_LAYOUT[1]},
        "desktopLayout": {"width": DESKTOP_LAYOUT[0], "height": DESKTOP_LAYOUT[1]},
        "sizes": "(min-width: 768px) min(66vw, 1024px), 96vw",
        "slides": {},
    }

    total_bytes = 0

    for slide in SLIDES:
        slide_id = slide["id"]
        desktop_src = HERO_DIR / slide["desktop"]
        mobile_src = HERO_DIR / slide["mobile"]

        with Image.open(desktop_src) as desktop_img:
            desktop_img = desktop_img.convert("RGB")
            desktop_variants = encode_variants(
                desktop_img,
                f"{slide_id}-desktop",
                DESKTOP_WIDTHS,
            )

        with Image.open(mobile_src) as mobile_img:
            mobile_img = mobile_img.convert("RGB")
            mobile_variants = encode_variants(
                mobile_img,
                f"{slide_id}-mobile",
                MOBILE_WIDTHS,
            )

        slide_bytes = sum(v["bytes"] for v in desktop_variants + mobile_variants)
        total_bytes += slide_bytes

        manifest["slides"][slide_id] = {
            "desktop": {
                "variants": desktop_variants,
                "srcset": {
                    "webp": build_srcset(desktop_variants, "webp"),
                    "avif": build_srcset(desktop_variants, "avif"),
                },
                "fallback": next(v["src"] for v in desktop_variants if v["format"] == "webp" and v["width"] == 2000),
            },
            "mobile": {
                "variants": mobile_variants,
                "srcset": {
                    "webp": build_srcset(mobile_variants, "webp"),
                    "avif": build_srcset(mobile_variants, "avif"),
                },
                "fallback": next(v["src"] for v in mobile_variants if v["format"] == "webp" and v["width"] == 768),
            },
            "totalBytes": slide_bytes,
        }

        print(f"{slide_id}: {slide_bytes / 1024 / 1024:.2f} MB across {len(desktop_variants) + len(mobile_variants)} files")

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote manifest to {MANIFEST_PATH.relative_to(ROOT)}")
    print(f"Total optimized payload (all variants): {total_bytes / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
