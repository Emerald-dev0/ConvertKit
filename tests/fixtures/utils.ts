import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
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

  // Generate a simple PDF
  const pdfPath = join(FIXTURES_DIR, "sample.pdf");
  const minimalPdfBase64 =
    "JVBERi0xLjcKCjEgMCBvYmogPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDIgMCBSID4+IGVuZG9iagoyIDAg" +
    "b2JqIDw8IC9UeXBlIC9QYWdlcyAvS2lkcyBbIDMgMCBSIF0gL0NvdW50IDEgPj4gZW5kb2JqCjMgMCBvYmog" +
    "PDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9SZXNvdXJj" +
    "ZXMgPDwgL0ZvbnQgPDwgL0YxIDQgMCBSID4+ID4+IC9Db250ZW50cyA1IDAgUiA+PiBlbmRvYmoKNCAwIG9i" +
    "aiA8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgPj4gZW5kb2Jq" +
    "CjUgMCBvYmogPDwgL1xlbmd0aCA0NCA+PiBzdHJlYW0KQlQgL0YxIDI0IFRmIDEwMCAxMDAgVGQgKEhlbGxv" +
    "IFdvcmxkKSBUaiBFVAplbmRzdHJlYW0gZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAw" +
    "MDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY4IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAw" +
    "MDI0MCAwMDAwMCBuIAowMDAwMDAwMzAzIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAg" +
    "UiA+PgpzdGFydHhyZWYKMzk2CiUlRU9G";
  const pdfBuffer = Buffer.from(minimalPdfBase64, "base64");
  await writeFile(pdfPath, pdfBuffer);

  // Generate a simple CSV
  const csvPath = join(FIXTURES_DIR, "sample.csv");
  const csvContent = "id,name,email\n1,Emerald,emerald@example.com\n2,Daniel,daniel@example.com";
  await writeFile(csvPath, csvContent);

  // Generate a simple Markdown
  const mdPath = join(FIXTURES_DIR, "sample.md");
  const mdContent = "# Sample\n\nThis is a sample markdown file.";
  await writeFile(mdPath, mdContent);

  // Generate a dummy XLSX (ZIP signature)
  const xlsxPath = join(FIXTURES_DIR, "sample.xlsx");
  const zipSig = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);
  await writeFile(xlsxPath, zipSig);

  // Generate a dummy MP3 (ID3 signature)
  const mp3Path = join(FIXTURES_DIR, "sample.mp3");
  const mp3Sig = new Uint8Array([0x49, 0x44, 0x33, 0x00, 0x00, 0x00]);
  await writeFile(mp3Path, mp3Sig);
}
