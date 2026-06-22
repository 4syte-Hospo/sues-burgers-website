#!/usr/bin/env python3
"""Generate responsive WebP/AVIF location card variants from source images."""

from __future__ import annotations

import json
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
LOCATIONS_DIR = ROOT / "public" / "images" / "locations"
OUT_DIR = LOCATIONS_DIR / "optimized"
MANIFEST_PATH = ROOT / "src" / "data" / "locationImageOptimizedManifest.json"

WEBP_QUALITY = 82
AVIF_QUALITY = 80

# Location cards are landscape; ~58% width on desktop, full width on mobile.
TARGET_WIDTHS = (720, 1200)

SIZES = "(min-width: 900px) 58vw, 100vw"

SOURCE_EXTENSIONS = {".png", ".jpg", ".jpeg"}


def resize_to_width(image: Image.Image, target_width: int) -> Image.Image:
    width, height = image.size
    if width <= target_width:
        return image.copy()
    target_height = round(height * (target_width / width))
    return image.resize((target_width, target_height), Image.Resampling.LANCZOS)


def prepare_image(image: Image.Image) -> Image.Image:
    if image.mode in ("RGBA", "LA") or (image.mode == "P" and "transparency" in image.info):
        rgba = image.convert("RGBA")
        background = Image.new("RGB", rgba.size, (255, 255, 255))
        background.paste(rgba, mask=rgba.split()[-1])
        return background
    return image.convert("RGB")


def encode_variants(image: Image.Image, base_name: str) -> list[dict]:
    variants: list[dict] = []
    source_width = image.size[0]
    widths = [w for w in TARGET_WIDTHS if w <= source_width]
    if not widths:
        widths = [source_width]

    for width in widths:
        resized = resize_to_width(image, width)
        for fmt, quality in (("webp", WEBP_QUALITY), ("avif", AVIF_QUALITY)):
            filename = f"{base_name}-{width}.{fmt}"
            out_path = OUT_DIR / filename
            save_kwargs: dict = {"quality": quality, "method": 6} if fmt == "webp" else {"quality": quality}
            resized.save(out_path, fmt.upper(), **save_kwargs)
            variants.append(
                {
                    "src": f"/images/locations/optimized/{filename}",
                    "width": resized.size[0],
                    "height": resized.size[1],
                    "format": fmt,
                    "bytes": out_path.stat().st_size,
                }
            )
    return variants


def build_srcset(variants: list[dict], fmt: str) -> str:
    return ", ".join(
        f"{item['src']} {item['width']}w"
        for item in variants
        if item["format"] == fmt
    )


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    manifest: dict = {
        "sizes": SIZES,
        "images": {},
    }

    total_bytes = 0
    source_files = sorted(
        path
        for path in LOCATIONS_DIR.iterdir()
        if path.is_file() and path.suffix.lower() in SOURCE_EXTENSIONS
    )

    for source_path in source_files:
        base_name = source_path.stem
        with Image.open(source_path) as img:
            prepared = prepare_image(img)
            source_width, source_height = prepared.size
            variants = encode_variants(prepared, base_name)

        image_bytes = sum(v["bytes"] for v in variants)
        total_bytes += image_bytes

        largest_width = max(v["width"] for v in variants)
        fallback = next(
            v["src"]
            for v in variants
            if v["format"] == "webp" and v["width"] == largest_width
        )

        manifest["images"][base_name] = {
            "source": f"/images/locations/{source_path.name}",
            "width": source_width,
            "height": source_height,
            "variants": variants,
            "srcset": {
                "webp": build_srcset(variants, "webp"),
                "avif": build_srcset(variants, "avif"),
            },
            "fallback": fallback,
            "totalBytes": image_bytes,
        }

        print(f"{base_name}: {image_bytes / 1024:.1f} KB across {len(variants)} files")

    MANIFEST_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote manifest to {MANIFEST_PATH.relative_to(ROOT)}")
    print(f"Processed {len(source_files)} sources")
    print(f"Total optimized payload (all variants): {total_bytes / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
