import { describe, it, expect } from "vitest";
import { PdfTextConverter } from "./pdf-text-converter.js";
import { FORMATS } from "@convertkit/core";

describe("PdfTextConverter", () => {
  const converter = new PdfTextConverter();

  it("should have correct metadata", () => {
    expect(converter.metadata.id).toBe("pdfjs-text-converter");
  });

  it("should report capabilities", () => {
    const cap = converter.capabilities.find(
      (c) => c.from.id === "pdf" && c.to.id === "txt"
    );
    expect(cap).toBeDefined();
  });

  it("should extract text from a minimal PDF", async () => {
    // A minimal PDF document containing the word "Hello"
    const minimalPdfBase64 =
      "JVBERi0xLjcKCjEgMCBvYmogPDwgL1R5cGUgL0NhdGFsb2cgL1BhZ2VzIDIgMCBSID4+IGVuZG9iagoyIDAg" +
      "b2JqIDw8IC9UeXBlIC9QYWdlcyAvS2lkcyBbIDMgMCBSIF0gL0NvdW50IDEgPj4gZW5kb2JqCjMgMCBvYmog" +
      "PDwgL1R5cGUgL1BhZ2UgL1BhcmVudCAyIDAgUiAvTWVkaWFCb3ggWyAwIDAgNjEyIDc5MiBdIC9SZXNvdXJj" +
      "ZXMgPDwgL0ZvbnQgPDwgL0YxIDQgMCBSID4+ID4+IC9Db250ZW50cyA1IDAgUiA+PiBlbmRvYmoKNCAwIG9i" +
      "aiA8PCAvVHlwZSAvRm9udCAvU3VidHlwZSAvVHlwZTEgL0Jhc2VGb250IC9IZWx2ZXRpY2EgPj4gZW5kb2Jq" +
      "CjUgMCBvYmogPDwgL0xlbmd0aCA0NCA+PiBzdHJlYW0KQlQgL0YxIDI0IFRmIDEwMCAxMDAgVGQgKEhlbGxv" +
      "IFdvcmxkKSBUaiBFVAplbmRzdHJlYW0gZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAw" +
      "MDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMDY4IDAwMDAwIG4gCjAwMDAwMDAxMjEgMDAwMDAgbiAKMDAwMDAw" +
      "MDI0MCAwMDAwMCBuIAowMDAwMDAwMzAzIDAwMDAwIG4gCnRyYWlsZXIKPDwgL1NpemUgNiAvUm9vdCAxIDAg" +
      "UiA+PgpzdGFydHhyZWYKMzk2CiUlRU9G";

    const pdfBuffer = Uint8Array.from(atob(minimalPdfBase64), c => c.charCodeAt(0));

    const result = await converter.convert(pdfBuffer, { to: FORMATS.TXT });

    expect(result.format.id).toBe("txt");
    const text = new TextDecoder().decode(result.data as Uint8Array);
    expect(text).toContain("Hello World");
  });
});
