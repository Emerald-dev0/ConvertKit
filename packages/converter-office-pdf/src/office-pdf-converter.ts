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
import libreoffice from "libreoffice-convert";
import { promisify } from "node:util";

const convertAsync = promisify(libreoffice.convert);

/**
 * Office document to PDF converter using LibreOffice.
 */
export class OfficePdfConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "libreoffice-pdf-converter",
    name: "LibreOffice PDF Converter",
    description: "Converts Office documents (XLS, DOCX, PPTX) to PDF using LibreOffice",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.XLS, to: FORMATS.PDF, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.XLSX, to: FORMATS.PDF, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.DOCX, to: FORMATS.PDF, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.PPTX, to: FORMATS.PDF, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.HTML, to: FORMATS.PDF, fidelity: ConversionFidelity.HIGH },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    const supported: string[] = [
      FORMATS.XLS.id,
      FORMATS.XLSX.id,
      FORMATS.DOCX.id,
      FORMATS.PPTX.id,
      FORMATS.HTML.id,
    ];
    return supported.includes(from.id);
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    if (options.to.id !== FORMATS.PDF.id) {
      throw new Error(`Unsupported target format: ${options.to.id}`);
    }

    let buffer: Buffer;
    if (input instanceof Uint8Array) {
      buffer = Buffer.from(input);
    } else {
      // Stream to buffer
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
      const pdfBuffer = await convertAsync(buffer, ".pdf", undefined);

      return {
        data: new Uint8Array(pdfBuffer),
        format: FORMATS.PDF,
      };
    } catch (err: any) {
      throw new Error(`LibreOffice conversion failed: ${err.message}. Ensure LibreOffice is installed.`);
    }
  }
}
