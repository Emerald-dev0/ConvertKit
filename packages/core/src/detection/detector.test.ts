import { describe, it, expect } from "vitest";
import { FormatDetector } from "./detector.js";

describe("FormatDetector", () => {
  const detector = new FormatDetector();

  it("should detect PDF by magic numbers", async () => {
    const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
    const format = await detector.detect(pdfBytes);
    expect(format?.id).toBe("pdf");
  });

  it("should detect PNG by magic numbers", async () => {
    const pngBytes = new Uint8Array([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
    const format = await detector.detect(pngBytes);
    expect(format?.id).toBe("png");
  });

  it("should fallback to extension when content is ambiguous", async () => {
    const textBytes = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]); // "hello"
    const format = await detector.detect(textBytes, { filename: "test.txt" });
    expect(format?.id).toBe("txt");
  });

  it("should use MIME hint if provided", async () => {
    const textBytes = new Uint8Array([0x68, 0x65, 0x6c, 0x6c, 0x6f]);
    const format = await detector.detect(textBytes, { mimeHint: "application/pdf" });
    expect(format?.id).toBe("pdf"); // Hint wins if no signature matches
  });

  it("should prioritize signature over hints", async () => {
    const pdfBytes = new Uint8Array([0x25, 0x50, 0x44, 0x46, 0x2d, 0x31, 0x2e, 0x37]);
    const format = await detector.detect(pdfBytes, { filename: "image.png" });
    expect(format?.id).toBe("pdf"); // Signature beats wrong extension
  });
});
