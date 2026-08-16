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
import { parse } from "csv-parse/sync";

/**
 * CSV to JSON converter adapter.
 */
export class CsvJsonConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "csv-json-converter",
    name: "CSV to JSON Converter",
    description: "Converts CSV files to structured JSON data",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.CSV, to: FORMATS.JSON, fidelity: ConversionFidelity.HIGH },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    return from.id === FORMATS.CSV.id;
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    if (options.to.id !== FORMATS.JSON.id) {
      throw new Error(`Unsupported target format: ${options.to.id}`);
    }

    let csvContent: string;
    if (input instanceof Uint8Array) {
      csvContent = new TextDecoder().decode(input);
    } else {
      // Stream to string
      const chunks: Uint8Array[] = [];
      const reader = input.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (value) chunks.push(value);
      }
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      csvContent = new TextDecoder().decode(combined);
    }

    try {
      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
      });

      const jsonString = JSON.stringify(records, null, 2);
      const encoder = new TextEncoder();

      return {
        data: encoder.encode(jsonString),
        format: FORMATS.JSON,
      };
    } catch (err: any) {
      throw new Error(`CSV to JSON conversion failed: ${err.message}`);
    }
  }
}
