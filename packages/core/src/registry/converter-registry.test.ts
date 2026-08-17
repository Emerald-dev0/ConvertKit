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

  it("should find a multi-step path", () => {
    // PDF -> DOCX
    const c1 = mockConverter("c1", ConversionFidelity.HIGH);

    // DOCX -> JPG
    const c2: Converter = {
      metadata: { id: "c2", name: "c2", description: "", version: "1" },
      capabilities: [{ from: FORMATS.DOCX, to: FORMATS.JPG, fidelity: ConversionFidelity.HIGH }],
      validate: async () => true,
      convert: async () => ({ data: new Uint8Array(), format: FORMATS.JPG })
    };

    registry.register(c1);
    registry.register(c2);

    const path = registry.findPath(FORMATS.PDF, FORMATS.JPG);
    expect(path).toHaveLength(2);
    expect(path?.[0].metadata.id).toBe("c1");
    expect(path?.[1].metadata.id).toBe("c2");

    const resolved = registry.resolveConverter(FORMATS.PDF, FORMATS.JPG);
    expect(resolved?.metadata.id).toContain("pipeline");
  });

  it("should prefer high-fidelity paths (weighted pathfinding)", () => {
    // Path 1: Short but low fidelity (PNG -> JPG)
    const lowFidelityDirect: Converter = {
      metadata: { id: "low-direct", name: "", description: "", version: "" },
      capabilities: [{ from: FORMATS.PNG, to: FORMATS.JPG, fidelity: ConversionFidelity.LOW }],
      validate: async () => true,
      convert: async () => ({ data: new Uint8Array(), format: FORMATS.JPG })
    };

    // Path 2: Longer but high fidelity (PNG -> WEBP -> JPG)
    const highFidelityStep1: Converter = {
      metadata: { id: "high-step1", name: "", description: "", version: "" },
      capabilities: [{ from: FORMATS.PNG, to: FORMATS.WEBP, fidelity: ConversionFidelity.HIGH }],
      validate: async () => true,
      convert: async () => ({ data: new Uint8Array(), format: FORMATS.WEBP })
    };
    const highFidelityStep2: Converter = {
      metadata: { id: "high-step2", name: "", description: "", version: "" },
      capabilities: [{ from: FORMATS.WEBP, to: FORMATS.JPG, fidelity: ConversionFidelity.HIGH }],
      validate: async () => true,
      convert: async () => ({ data: new Uint8Array(), format: FORMATS.JPG })
    };

    registry.register(lowFidelityDirect);
    registry.register(highFidelityStep1);
    registry.register(highFidelityStep2);

    const path = registry.findPath(FORMATS.PNG, FORMATS.JPG);

    // Dijkstra should choose the 2-step HIGH path (cost 2) over the 1-step LOW path (cost 100)
    expect(path).toHaveLength(2);
    expect(path?.[0].metadata.id).toBe("high-step1");
    expect(path?.[1].metadata.id).toBe("high-step2");
  });
});
