import { describe, it, expect, beforeEach } from "vitest";
import { ConverterRegistry } from "./converter-registry.js";
import { FORMATS } from "../domain/format.js";
import { ConversionFidelity } from "../domain/capability.js";
import { Converter } from "../domain/converter.js";

describe("ConverterRegistry", () => {
  let registry: ConverterRegistry;

  const mockConverter = (id: string, fidelity: ConversionFidelity): Converter => ({
    metadata: {
      id,
      name: `Mock ${id}`,
      description: "Test converter",
      version: "1.0.0",
    },
    capabilities: [
      {
        from: FORMATS.PDF,
        to: FORMATS.DOCX,
        fidelity,
      },
    ],
    validate: async () => true,
    convert: async () => ({
      data: new Uint8Array(),
      format: FORMATS.DOCX,
    }),
  });

  beforeEach(() => {
    registry = new ConverterRegistry();
  });

  it("should register and unregister converters", () => {
    const c = mockConverter("c1", ConversionFidelity.HIGH);
    registry.register(c);
    expect(registry.getConverters()).toHaveLength(1);

    registry.unregister("c1");
    expect(registry.getConverters()).toHaveLength(0);
  });

  it("should find converters for a specific pair", () => {
    const c1 = mockConverter("c1", ConversionFidelity.HIGH);
    registry.register(c1);

    const matches = registry.findConverters(FORMATS.PDF, FORMATS.DOCX);
    expect(matches).toHaveLength(1);
    expect(matches[0].metadata.id).toBe("c1");
  });

  it("should resolve the best converter based on fidelity", () => {
    const low = mockConverter("low", ConversionFidelity.LOW);
    const high = mockConverter("high", ConversionFidelity.HIGH);
    const med = mockConverter("med", ConversionFidelity.MEDIUM);

    registry.register(low);
    registry.register(high);
    registry.register(med);

    const resolved = registry.resolveConverter(FORMATS.PDF, FORMATS.DOCX);
    expect(resolved?.metadata.id).toBe("high");
  });

  it("should return undefined when no converter is found", () => {
    const resolved = registry.resolveConverter(FORMATS.PDF, FORMATS.JSON);
    expect(resolved).toBeUndefined();
  });
});
