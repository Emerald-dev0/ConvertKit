import { describe, it, expect } from "vitest";
import {
  getConversionLookup,
  getFormatEntries,
  getGraphData,
  getPipelineExamples,
  getToolLinks,
  getConverterSummaries,
} from "./convertkit";

describe("convertkit web data layer (derived from the real registry)", () => {
  it("reports the full format registry", () => {
    const formats = getFormatEntries();
    expect(formats.length).toBeGreaterThan(60);
    const pdf = formats.find((f) => f.id === "pdf");
    expect(pdf?.mimeTypes).toContain("application/pdf");
  });

  it("lists all registered converters", () => {
    const converters = getConverterSummaries();
    const ids = converters.map((c) => c.id);
    expect(ids).toContain("sharp-image-converter");
    expect(converters.length).toBe(7);
  });

  it("models direct conversions", () => {
    const lookup = getConversionLookup();
    const png = lookup["png"] ?? [];
    const targets = png.map((t) => t.to);
    expect(targets).toContain("jpg");
    expect(targets).toContain("webp");
    expect(targets).toContain("pdf");
    const jpg = png.find((t) => t.to === "jpg");
    expect(jpg?.direct).toBe(true);
  });

  it("finds real multi-step pipelines", () => {
    const lookup = getConversionLookup();
    const pngToDocx = lookup["png"]?.find((t) => t.to === "docx");
    expect(pngToDocx).toBeDefined();
    expect(pngToDocx?.direct).toBe(false);
    expect(pngToDocx?.path).toEqual(["png", "pdf", "docx"]);

    const xlsxToJson = lookup["xlsx"]?.find((t) => t.to === "json");
    expect(xlsxToJson?.path).toEqual(["xlsx", "csv", "json"]);
  });

  it("provides curated pipeline examples that are genuinely reachable", () => {
    const examples = getPipelineExamples();
    expect(examples.length).toBeGreaterThanOrEqual(3);
    for (const ex of examples) {
      expect(ex.path.length).toBeGreaterThanOrEqual(3);
      expect(ex.steps.length).toBe(ex.path.length - 1);
    }
  });

  it("knows which tool links are actually supported", () => {
    const links = getToolLinks();
    expect(links.some((l) => l.from === "pdf" && l.to === "docx")).toBe(true);
    expect(links.some((l) => l.from === "csv" && l.to === "json")).toBe(true);
  });

  it("produces a coherent graph model", () => {
    const { nodes, edges } = getGraphData();
    expect(nodes.length).toBeGreaterThan(15);
    expect(edges.length).toBeGreaterThan(30);
    const nodeIds = new Set(nodes.map((n) => n.id));
    for (const edge of edges) {
      expect(nodeIds.has(edge.from)).toBe(true);
      expect(nodeIds.has(edge.to)).toBe(true);
    }
  });
});