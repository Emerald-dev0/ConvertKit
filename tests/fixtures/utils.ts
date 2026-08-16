import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
export const FIXTURES_DIR = dirname(__filename);

export async function ensureFixtures() {
  try {
    await mkdir(FIXTURES_DIR, { recursive: true });
  } catch (e) {
    // Ignore if exists
  }

  // Generate a simple PNG
  const pngPath = join(FIXTURES_DIR, "sample.png");
  await sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 255, g: 0, b: 0 },
    },
  })
    .png()
    .toFile(pngPath);

  // Generate a simple JPG
  const jpgPath = join(FIXTURES_DIR, "sample.jpg");
  await sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 0, g: 255, b: 0 },
    },
  })
    .jpeg()
    .toFile(jpgPath);

  // Generate a simple WEBP
  const webpPath = join(FIXTURES_DIR, "sample.webp");
  await sharp({
    create: {
      width: 100,
      height: 100,
      channels: 3,
      background: { r: 0, g: 0, b: 255 },
    },
  })
    .webp()
    .toFile(webpPath);
}
