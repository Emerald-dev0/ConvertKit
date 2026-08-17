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
import { marked } from "marked";

/**
 * Markdown to HTML converter adapter.
 */
export class MarkdownHtmlConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "markdown-html-converter",
    name: "Markdown to HTML Converter",
    description: "Transforms Markdown documents into standard HTML using marked",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.MD, to: FORMATS.HTML, fidelity: ConversionFidelity.HIGH },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    return from.id === FORMATS.MD.id;
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    if (options.to.id !== FORMATS.HTML.id) {
      throw new Error(`Unsupported target format: ${options.to.id}`);
    }

    let markdown: string;
    if (input instanceof Uint8Array) {
      markdown = new TextDecoder().decode(input);
    } else {
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
      markdown = new TextDecoder().decode(combined);
    }

    try {
      const html = await marked.parse(markdown);
      const encoder = new TextEncoder();

      return {
        data: encoder.encode(html),
        format: FORMATS.HTML,
      };
    } catch (err: any) {
      throw new Error(`Markdown to HTML conversion failed: ${err.message}`);
    }
  }
}
