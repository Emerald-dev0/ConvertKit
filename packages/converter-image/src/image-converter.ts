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
import sharp from "sharp";
import { Readable } from "node:stream";

/**
 * Image converter adapter using Sharp.
 */
export class ImageConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "sharp-image-converter",
    name: "Sharp Image Converter",
    description: "High-performance image conversion using Sharp",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.PNG, to: FORMATS.JPG, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.PNG, to: FORMATS.WEBP, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.JPG, to: FORMATS.PNG, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.JPG, to: FORMATS.WEBP, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.WEBP, to: FORMATS.PNG, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.WEBP, to: FORMATS.JPG, fidelity: ConversionFidelity.HIGH },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    const supportedFormats: string[] = [FORMATS.PNG.id, FORMATS.JPG.id, FORMATS.WEBP.id];
    return supportedFormats.includes(from.id);
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    let pipeline = sharp();

    if (input instanceof Uint8Array) {
      pipeline = sharp(input);
    } else {
      // Convert ReadableStream to Node Readable for Sharp
      const nodeReadable = Readable.fromWeb(input as any);
      nodeReadable.pipe(pipeline);
    }

    const targetFormat = options.to;

    switch (targetFormat.id) {
      case "png":
        pipeline = pipeline.png();
        break;
      case "jpg":
        pipeline = pipeline.jpeg({
          quality: (options.extra?.quality as number) ?? 80,
        });
        break;
      case "webp":
        pipeline = pipeline.webp({
          quality: (options.extra?.quality as number) ?? 80,
        });
        break;
      default:
        throw new Error(`Unsupported target format: ${targetFormat.id}`);
    }

    const buffer = await pipeline.toBuffer();

    return {
      data: new Uint8Array(buffer),
      format: targetFormat,
    };
  }

  async inspect(
    input: Uint8Array | ReadableStream,
    _from: FileFormat
  ): Promise<Record<string, unknown>> {
    let pipeline = sharp();
    if (input instanceof Uint8Array) {
      pipeline = sharp(input);
    } else {
      const nodeReadable = Readable.fromWeb(input as any);
      nodeReadable.pipe(pipeline);
    }

    const metadata = await pipeline.metadata();
    return {
      width: metadata.width,
      height: metadata.height,
      format: metadata.format,
      space: metadata.space,
      channels: metadata.channels,
      depth: metadata.depth,
      hasAlpha: metadata.hasAlpha,
    };
  }
}
