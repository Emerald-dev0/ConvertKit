import {
  Converter,
  ConverterMetadata,
  ConversionCapability,
  ConversionFidelity,
  ConversionOptions,
  ConversionResult,
  FileFormat,
  FORMATS,
} from "@convertkit/core";
import * as pdfjs from "pdfjs-dist";

/**
 * PDF text extraction converter using pdfjs-dist.
 */
export class PdfTextConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "pdfjs-text-converter",
    name: "PDF.js Text Extractor",
    description: "Extracts plain text from PDF documents using Mozilla's PDF.js",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.PDF, to: FORMATS.TXT, fidelity: ConversionFidelity.MEDIUM },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    return from.id === FORMATS.PDF.id;
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    if (options.to.id !== FORMATS.TXT.id) {
      throw new Error(`Unsupported target format: ${options.to.id}`);
    }

    let data: Uint8Array;
    if (input instanceof Uint8Array) {
      data = input;
    } else {
      // Stream to buffer
      const chunks: Uint8Array[] = [];
      const reader = input.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      data = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        data.set(chunk, offset);
        offset += chunk.length;
      }
    }

    try {
      // PDF.js worker setup is often needed in Node.js
      // For simple text extraction we might be able to disable it or use the main thread
      const loadingTask = pdfjs.getDocument({
        data,
        useSystemFonts: true,
        isEvalSupported: false,
      });

      const pdf = await loadingTask.promise;
      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const strings = textContent.items
          .filter((item: any) => "str" in item)
          .map((item: any) => item.str);

        fullText += strings.join(" ") + "\n";
      }

      const encoder = new TextEncoder();
      return {
        data: encoder.encode(fullText.trim()),
        format: FORMATS.TXT,
      };
    } catch (err: any) {
      throw new Error(`PDF conversion failed: ${err.message}`);
    }
  }
}
