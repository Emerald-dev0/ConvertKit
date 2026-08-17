import { describe, it, expect } from "vitest";
import { TesseractOCRConverter } from "./ocr-converter.js";
import { FORMATS } from "@convertkit/core";

describe("TesseractOCRConverter", () => {
  const converter = new TesseractOCRConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("tesseract-ocr-converter");
  });

  it("should report capabilities", () => {
    const cap = converter.capabilities.find(
      (c) => c.from.id === "png" && c.to.id === "txt"
    );
    expect(cap).toBeDefined();
  });
});
