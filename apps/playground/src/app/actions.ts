"use server";

import {
  FormatDetector,
  ConverterRegistry,
  FORMATS
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { OfficePdfConverter } from "@convertkit/converter-office-pdf";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";

const detector = new FormatDetector();
const registry = new ConverterRegistry();
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new OfficePdfConverter());
registry.register(new FfmpegConverter());

export type ConversionState = {
  success?: boolean;
  error?: string;
  output?: string; // base64
  format?: string;
};

export async function convertFile(formData: FormData): Promise<ConversionState> {
  const file = formData.get("file") as File;
  const targetId = formData.get("targetFormat") as string;

  if (!file) return { error: "No file provided" };
  if (!targetId) return { error: "No target format specified" };

  try {
    const arrayBuffer = await file.arrayBuffer();
    const inputData = new Uint8Array(arrayBuffer);

    // 1. Detect Input
    const fromFormat = await detector.detect(inputData, {
      filename: file.name,
      mimeHint: file.type
    });

    if (!fromFormat) return { error: "Could not identify input format" };

    // 2. Resolve Target
    const toFormat = Object.values(FORMATS).find(f => f.id === targetId);
    if (!toFormat) return { error: `Unsupported target format: ${targetId}` };

    // 3. Resolve Converter
    const converter = registry.resolveConverter(fromFormat, toFormat);
    if (!converter) {
      return { error: `No converter found for ${fromFormat.id} to ${toFormat.id}` };
    }

    // 4. Convert
    const result = await converter.convert(inputData, { to: toFormat });

    // 5. Return as base64
    const base64 = Buffer.from(result.data as Uint8Array).toString("base64");

    return {
      success: true,
      output: `data:${toFormat.mimeTypes[0]};base64,${base64}`,
      format: toFormat.id
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Conversion Error:", error);
    return { error: error.message || "An unexpected error occurred" };
  }
}
