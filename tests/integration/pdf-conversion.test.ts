import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  FORMATS
} from "@convertkit/core";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("PDF Conversion Integration", () => {
  const detector = new FormatDetector();
  const registry = new ConverterRegistry();
  const pdfConverter = new PdfTextConverter();

  beforeAll(async () => {
    await ensureFixtures();
    registry.register(pdfConverter);
  });

  it("should detect, resolve, and extract text from PDF", async () => {
    const pdfPath = join(FIXTURES_DIR, "sample.pdf");
    const inputBuffer = await readFile(pdfPath);
    const inputUint8 = new Uint8Array(inputBuffer);

    // 1. Detect
    const detectedFormat = await detector.detect(inputUint8, { filename: "sample.pdf" });
    expect(detectedFormat?.id).toBe("pdf");

    // 2. Resolve
    const converter = registry.resolveConverter(detectedFormat!, FORMATS.TXT);
    expect(converter).toBeDefined();
    expect(converter?.metadata.id).toBe("pdfjs-text-converter");

    // 3. Convert
    const result = await converter!.convert(inputUint8, { to: FORMATS.TXT });

    // 4. Validate Result
    expect(result.format.id).toBe("txt");
    const outputText = new TextDecoder().decode(result.data as Uint8Array);
    expect(outputText).toContain("Hello World");
  });
});
