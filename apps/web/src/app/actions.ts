"use server";

import {
  FormatDetector,
  ConverterRegistry,
  FORMATS,
  PipelineConverter,
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { OfficePdfConverter } from "@convertkit/converter-office-pdf";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";
import { TesseractOCRConverter } from "@convertkit/converter-ocr";

import { getStorageProvider } from "@/lib/storage";
import { db } from "@/lib/db";
import { conversions } from "@/lib/db/schema";
import { randomUUID } from "node:crypto";

const detector = new FormatDetector();
const registry = new ConverterRegistry();
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new OfficePdfConverter());
registry.register(new FfmpegConverter());
registry.register(new TesseractOCRConverter());

export type ConversionState = {
  success?: boolean;
  error?: string;
  output?: string; // Download URL
  format?: string;
  pipeline?: string[];
  metadata?: Record<string, unknown>;
  warnings?: string[];
};

export async function convertFile(formData: FormData): Promise<ConversionState> {
  const file = formData.get("file") as File;
  const targetId = formData.get("targetFormat") as string;
  const startTime = performance.now();
  const conversionId = randomUUID();

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

    if (!fromFormat) {
       return { error: "Could not identify input format" };
    }

    // 2. Resolve Target
    const toFormat = Object.values(FORMATS).find(f => f.id === targetId);
    if (!toFormat) return { error: `Unsupported target format: ${targetId}` };

    // 3. Resolve Converter
    const converter = registry.resolveConverter(fromFormat, toFormat);
    if (!converter) {
      return { error: `No converter found for ${fromFormat.id} to ${toFormat.id}` };
    }

    const pipelineSteps = converter instanceof PipelineConverter
      ? converter.getSteps().map(s => s.metadata.name)
      : [converter.metadata.name];

    // 4. Convert
    const result = await converter.convert(inputData, { to: toFormat });

    // 5. Inspect (Optional Metadata)
    let metadata: Record<string, unknown> | undefined;
    if (converter.inspect) {
      metadata = await converter.inspect(result.data, toFormat);
    }

    // 6. Store File (Avoid base64 for large files)
    const storage = getStorageProvider();
    const storageKey = await storage.save(result.data, `converted-${file.name}.${toFormat.extensions[0].replace(".", "")}`);
    const downloadUrl = await storage.getDownloadUrl(storageKey);

    // 7. Log to DB (D1)
    const endTime = performance.now();
    await db.insert(conversions).values({
      id: conversionId,
      fromFormat: fromFormat.id,
      toFormat: toFormat.id,
      inputSize: inputData.length,
      outputSize: result.data instanceof Uint8Array ? result.data.length : null,
      duration: endTime - startTime,
      status: "success",
      storageKey,
      createdAt: new Date()
    });

    return {
      success: true,
      output: downloadUrl,
      format: toFormat.id,
      pipeline: pipelineSteps,
      metadata,
      warnings: result.warnings
    };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("Conversion Error:", error);

    // Log Failure
    await db.insert(conversions).values({
      id: conversionId,
      fromFormat: "unknown",
      toFormat: targetId,
      inputSize: file.size,
      status: "failed",
      error: error.message,
      createdAt: new Date()
    }).catch(() => {});

    return { error: error.message || "An unexpected error occurred" };
  }
}
