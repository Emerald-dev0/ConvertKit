import { describe, it, expect, beforeAll } from "vitest";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  FORMATS
} from "@convertkit/core";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { ensureFixtures, FIXTURES_DIR } from "../fixtures/utils.js";

describe("CSV Conversion Integration", () => {
  const detector = new FormatDetector();
  const registry = new ConverterRegistry();
  const csvConverter = new CsvJsonConverter();

  beforeAll(async () => {
    await ensureFixtures();
    registry.register(csvConverter);
  });

  it("should detect, resolve, and convert CSV to JSON", async () => {
    const csvPath = join(FIXTURES_DIR, "sample.csv");
    const inputBuffer = await readFile(csvPath);
    const inputUint8 = new Uint8Array(inputBuffer);

    // 1. Detect
    const detectedFormat = await detector.detect(inputUint8, { filename: "sample.csv" });
    expect(detectedFormat?.id).toBe("csv");

    // 2. Resolve
    const converter = registry.resolveConverter(detectedFormat!, FORMATS.JSON);
    expect(converter).toBeDefined();
    expect(converter?.metadata.id).toBe("csv-json-converter");

    // 3. Convert
    const result = await converter!.convert(inputUint8, { to: FORMATS.JSON });

    // 4. Validate Result
    expect(result.format.id).toBe("json");
    const json = JSON.parse(new TextDecoder().decode(result.data as Uint8Array));

    expect(json).toHaveLength(2);
    expect(json[0].name).toBe("Emerald");
    expect(json[1].name).toBe("Daniel");
  });
});
