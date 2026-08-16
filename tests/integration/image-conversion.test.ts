import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  FORMATS,
  ConversionFidelity
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("Image Conversion Integration", () => {
  const detector = new FormatDetector();
  const registry = new ConverterRegistry();
  const imageConverter = new ImageConverter();

  beforeAll(async () => {
    await ensureFixtures();
    registry.register(imageConverter);
  });

  it("should detect, resolve, and convert PNG to JPG", async () => {
    const pngPath = join(FIXTURES_DIR, "sample.png");
    const inputBuffer = await readFile(pngPath);
    const inputUint8 = new Uint8Array(inputBuffer);

    // 1. Detect
    const detectedFormat = await detector.detect(inputUint8, { filename: "sample.png" });
    expect(detectedFormat?.id).toBe("png");

    // 2. Resolve
    const converter = registry.resolveConverter(detectedFormat!, FORMATS.JPG);
    expect(converter).toBeDefined();
    expect(converter?.metadata.id).toBe("sharp-image-converter");

    // 3. Convert
    const result = await converter!.convert(inputUint8, { to: FORMATS.JPG });

    // 4. Validate Result
    expect(result.format.id).toBe("jpg");
    const outputData = result.data as Uint8Array;

    // Check JPG magic numbers
    expect(outputData[0]).toBe(0xff);
    expect(outputData[1]).toBe(0xd8);
    expect(outputData[2]).toBe(0xff);
  });

  it("should detect, resolve, and convert JPG to WEBP", async () => {
    const jpgPath = join(FIXTURES_DIR, "sample.jpg");
    const inputBuffer = await readFile(jpgPath);
    const inputUint8 = new Uint8Array(inputBuffer);

    // 1. Detect
    const detectedFormat = await detector.detect(inputUint8, { filename: "sample.jpg" });
    expect(detectedFormat?.id).toBe("jpg");

    // 2. Resolve
    const converter = registry.resolveConverter(detectedFormat!, FORMATS.WEBP);
    expect(converter).toBeDefined();

    // 3. Convert
    const result = await converter!.convert(inputUint8, { to: FORMATS.WEBP });

    // 4. Validate Result
    expect(result.format.id).toBe("webp");
    const outputData = result.data as Uint8Array;

    // RIFF ... WEBP
    expect(String.fromCharCode(outputData[0], outputData[1], outputData[2], outputData[3])).toBe("RIFF");
  });
});
