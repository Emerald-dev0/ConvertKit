import { describe, it, expect } from "vitest";
import { OfficePdfConverter } from "./office-pdf-converter.js";
import { FORMATS } from "@convertkit/core";

describe("OfficePdfConverter", () => {
  const converter = new OfficePdfConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("libreoffice-pdf-converter");
  });

  it("should report capabilities", () => {
    const cap = converter.capabilities.find(
      (c) => c.from.id === "xlsx" && c.to.id === "pdf"
    );
    expect(cap).toBeDefined();
  });
});
