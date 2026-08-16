import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  FORMATS
} from "@convertkit/core";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("Markdown Conversion Integration", () => {
  const detector = new FormatDetector();
  const registry = new ConverterRegistry();
  const mdConverter = new MarkdownHtmlConverter();

  beforeAll(async () => {
    await ensureFixtures();
    registry.register(mdConverter);
  });

  it("should detect, resolve, and convert Markdown to HTML", async () => {
    const mdPath = join(FIXTURES_DIR, "sample.md");
    const inputBuffer = await readFile(mdPath);
    const inputUint8 = new Uint8Array(inputBuffer);

    // 1. Detect
    const detectedFormat = await detector.detect(inputUint8, { filename: "sample.md" });
    expect(detectedFormat?.id).toBe("md");

    // 2. Resolve
    const converter = registry.resolveConverter(detectedFormat!, FORMATS.HTML);
    expect(converter).toBeDefined();
    expect(converter?.metadata.id).toBe("markdown-html-converter");

    // 3. Convert
    const result = await converter!.convert(inputUint8, { to: FORMATS.HTML });

    // 4. Validate Result
    expect(result.format.id).toBe("html");
    const outputHtml = new TextDecoder().decode(result.data as Uint8Array);
    expect(outputHtml).toContain("<h1");
    expect(outputHtml).toContain("Sample");
  });
});
