#!/usr/bin/env python3
"""Fetch TikTok oEmbed metadata and thumbnail images for preview cards."""

from __future__ import annotations

import json
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "images" / "tiktok"
META_PATH = ROOT / "src" / "data" / "tiktokVideoMeta.json"

VIDEOS = (
    ("7522278041230380295", "sues-burgers-shakes"),
    ("7462215355553844498", "review-raising-canes"),
    ("7467718216173849863", "review-woolloongabba"),
    ("7582029615590280478", "fit-by-friday"),
    ("7491961228449860865", "chilli-mozza"),
    ("7609078718463479047", "sues-favourite"),
)


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: list[dict] = []

    for video_id, slug in VIDEOS:
        oembed_url = f"https://www.tiktok.com/oembed?url=https://www.tiktok.com/video/{video_id}"
        with urllib.request.urlopen(oembed_url) as response:
            data = json.load(response)

        thumb_url = data["thumbnail_url"]
        thumb_path = OUT_DIR / f"{slug}.jpg"
        with urllib.request.urlopen(thumb_url) as response:
            thumb_path.write_bytes(response.read())

        author_url = data.get("author_url", "").rstrip("/")
        page_url = f"{author_url}/video/{video_id}" if author_url else f"https://www.tiktok.com/video/{video_id}"

        entry = {
            "id": video_id,
            "slug": slug,
            "thumbnail": f"/images/tiktok/{slug}.jpg",
            "caption": data.get("title", ""),
            "creator": data.get("author_name", ""),
            "url": page_url,
        }
        manifest.append(entry)
        print(f"{slug}: {thumb_path.stat().st_size // 1024} KB")

    META_PATH.write_text(json.dumps(manifest, indent=2) + "\n", encoding="utf-8")
    print(f"\nWrote {META_PATH.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
