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
import { createWorker } from "tesseract.js";

/**
 * OCR converter using Tesseract.js.
 */
export class TesseractOCRConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "tesseract-ocr-converter",
    name: "Tesseract OCR",
    description: "Optical Character Recognition using Tesseract.js",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.PNG, to: FORMATS.TXT, fidelity: ConversionFidelity.MEDIUM },
    { from: FORMATS.JPG, to: FORMATS.TXT, fidelity: ConversionFidelity.MEDIUM },
    { from: FORMATS.WEBP, to: FORMATS.TXT, fidelity: ConversionFidelity.MEDIUM },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    const supported: string[] = [FORMATS.PNG.id, FORMATS.JPG.id, FORMATS.WEBP.id];
    return supported.includes(from.id);
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    if (options.to.id !== FORMATS.TXT.id) {
      throw new Error(`Unsupported target format: ${options.to.id}`);
    }

    let buffer: Buffer;
    if (input instanceof Uint8Array) {
      buffer = Buffer.from(input);
    } else {
      const chunks: Uint8Array[] = [];
      const reader = input.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      buffer = Buffer.concat(chunks.map((c) => Buffer.from(c)));
    }

    try {
      const worker = await createWorker("eng");
      const { data: { text } } = await worker.recognize(buffer);
      await worker.terminate();

      const encoder = new TextEncoder();
      return {
        data: encoder.encode(text),
        format: FORMATS.TXT,
      };
    } catch (err: any) {
      throw new Error(`OCR conversion failed: ${err.message}`);
    }
  }
}
