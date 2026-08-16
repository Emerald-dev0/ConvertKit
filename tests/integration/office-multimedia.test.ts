import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  FORMATS
} from "@convertkit/core";
import { OfficePdfConverter } from "@convertkit/converter-office-pdf";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("Office and Multimedia Integration", () => {
  const detector = new FormatDetector();
  const registry = new ConverterRegistry();

  beforeAll(async () => {
    await ensureFixtures();
    registry.register(new OfficePdfConverter());
    registry.register(new FfmpegConverter());
  });

  it("should detect XLSX and resolve OfficePdfConverter", async () => {
    const xlsxPath = join(FIXTURES_DIR, "sample.xlsx");
    const input = await readFile(xlsxPath);

    const detected = await detector.detect(new Uint8Array(input), { filename: "sample.xlsx" });
    expect(detected?.id).toBe("xlsx");

    const converter = registry.resolveConverter(detected!, FORMATS.PDF);
    expect(converter?.metadata.id).toBe("libreoffice-pdf-converter");
  });

  it("should detect MP3 and resolve FfmpegConverter", async () => {
    const mp3Path = join(FIXTURES_DIR, "sample.mp3");
    const input = await readFile(mp3Path);

    const detected = await detector.detect(new Uint8Array(input));
    expect(detected?.id).toBe("mp3");

    const converter = registry.resolveConverter(detected!, FORMATS.MP4);
    expect(converter?.metadata.id).toBe("ffmpeg-converter");
  });
});
