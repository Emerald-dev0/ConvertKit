import { describe, it, expect } from "vitest";
import { CsvJsonConverter } from "./csv-json-converter.js";
import { FORMATS } from "@convertkit/core";

describe("CsvJsonConverter", () => {
  const converter = new CsvJsonConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("csv-json-converter");
  });

  it("should convert simple CSV to JSON", async () => {
    const csv = "name,age\nAlice,30\nBob,25";
    const input = new TextEncoder().encode(csv);

    const result = await converter.convert(input, { to: FORMATS.JSON });

    expect(result.format.id).toBe("json");
    const json = JSON.parse(new TextDecoder().decode(result.data as Uint8Array));

    expect(json).toHaveLength(2);
    expect(json[0].name).toBe("Alice");
    expect(json[0].age).toBe("30");
  });

  it("should handle empty CSV", async () => {
    const csv = "name,age";
    const input = new TextEncoder().encode(csv);
    const result = await converter.convert(input, { to: FORMATS.JSON });
    const json = JSON.parse(new TextDecoder().decode(result.data as Uint8Array));
    expect(json).toHaveLength(0);
  });
});
