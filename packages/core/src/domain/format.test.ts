import { describe, it, expect } from "vitest";
import { findFormatByExtension, findFormatByMimeType, FORMATS } from "./format.js";

describe("format utilities", () => {
  describe("findFormatByExtension", () => {
    it("should find PDF format by extension", () => {
      const format = findFormatByExtension(".pdf");
      expect(format).toBeDefined();
      expect(format?.id).toBe("pdf");
    });

    it("should find JPG format by multiple extensions", () => {
      expect(findFormatByExtension(".jpg")?.id).toBe("jpg");
      expect(findFormatByExtension(".jpeg")?.id).toBe("jpg");
    });

    it("should handle extensions without leading dot", () => {
      expect(findFormatByExtension("pdf")?.id).toBe("pdf");
    });

    it("should be case-insensitive", () => {
      expect(findFormatByExtension(".PDF")?.id).toBe("pdf");
    });

    it("should return undefined for unknown extension", () => {
      expect(findFormatByExtension(".unknown")).toBeUndefined();
    });
  });

  describe("findFormatByMimeType", () => {
    it("should find PDF format by MIME type", () => {
      const format = findFormatByMimeType("application/pdf");
      expect(format).toBeDefined();
      expect(format?.id).toBe("pdf");
    });

    it("should be case-insensitive", () => {
      expect(findFormatByMimeType("APPLICATION/PDF")?.id).toBe("pdf");
    });

    it("should return undefined for unknown MIME type", () => {
      expect(findFormatByMimeType("application/x-unknown")).toBeUndefined();
    });
  });
});
