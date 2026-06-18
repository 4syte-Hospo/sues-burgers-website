import { readdir, writeFile } from "node:fs/promises";
import { resolve, dirname, extname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { menuImageAliases } from "../src/config/menuImageAliases.ts";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const menuDir = resolve(rootDir, "public/images/menu");
const outputPath = resolve(rootDir, "src/data/menuImageManifest.json");

const IMAGE_EXTENSIONS = new Set([".png", ".webp", ".jpg", ".jpeg"]);

async function generateMenuImageManifest() {
  const entries = await readdir(menuDir, { withFileTypes: true });
  const filesOnDisk = new Set<string>();

  for (const entry of entries) {
    if (!entry.isFile()) continue;
    const ext = extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      filesOnDisk.add(entry.name);
    }
  }

  const manifest: Record<string, string> = {};

  for (const filename of filesOnDisk) {
    const ext = extname(filename);
    const id = basename(filename, ext);
    manifest[id] = `/images/menu/${filename}`;
  }

  for (const [itemId, filename] of Object.entries(menuImageAliases)) {
    if (filesOnDisk.has(filename)) {
      manifest[itemId] = `/images/menu/${filename}`;
    }
  }

  const sorted = Object.fromEntries(
    Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)),
  );

  await writeFile(outputPath, `${JSON.stringify(sorted, null, 2)}\n`, "utf8");
  console.log(
    `[menu-images] Wrote ${outputPath} (${Object.keys(sorted).length} entries, ${Object.keys(menuImageAliases).filter((id) => sorted[id]).length} aliases)`,
  );
}

generateMenuImageManifest().catch((error) => {
  console.error("[menu-images] Failed:", error);
  process.exit(1);
});
