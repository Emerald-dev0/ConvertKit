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
import ffmpeg from "fluent-ffmpeg";
import { Readable } from "node:stream";
import { writeFile, rm, readFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import path from "node:path";
import os from "node:os";

/**
 * Multimedia converter using FFmpeg.
 */
export class FfmpegConverter implements Converter {
  readonly metadata: ConverterMetadata = {
    id: "ffmpeg-converter",
    name: "FFmpeg Converter",
    description: "Converts audio and video files using FFmpeg",
    version: "0.1.0",
  };

  readonly capabilities: readonly ConversionCapability[] = [
    { from: FORMATS.MP3, to: FORMATS.MP4, fidelity: ConversionFidelity.MEDIUM },
    { from: FORMATS.MP3, to: FORMATS.WAV, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.WAV, to: FORMATS.MP3, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.MP4, to: FORMATS.MP3, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.MKV, to: FORMATS.MP4, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.MOV, to: FORMATS.MP4, fidelity: ConversionFidelity.HIGH },
    { from: FORMATS.AVI, to: FORMATS.MP4, fidelity: ConversionFidelity.HIGH },
  ];

  async validate(
    _input: Uint8Array | ReadableStream,
    from: FileFormat
  ): Promise<boolean> {
    const supported: string[] = [
      FORMATS.MP3.id,
      FORMATS.WAV.id,
      FORMATS.MP4.id,
      FORMATS.MKV.id,
      FORMATS.MOV.id,
      FORMATS.AVI.id
    ];
    return supported.includes(from.id);
  }

  async convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult> {
    const tempIn = path.join(os.tmpdir(), `ck-in-${Date.now()}`);
    const tempOut = path.join(os.tmpdir(), `ck-out-${Date.now()}.${options.to.id}`);

    try {
      // Write input to temp file
      if (input instanceof Uint8Array) {
        await writeFile(tempIn, input);
      } else {
        const nodeReadable = Readable.fromWeb(input as any);
        const fs = await import("node:fs");
        await pipeline(nodeReadable, fs.createWriteStream(tempIn));
      }

      await new Promise<void>((resolve, reject) => {
        let command = ffmpeg(tempIn);

        if (options.to.id === "mp4") {
          command = command
            .input("color=c=black:s=1280x720")
            .inputFormat("lavfi")
            .outputOptions("-shortest")
            .videoCodec("libx264")
            .audioCodec("aac");
        }

        command
          .toFormat(options.to.id)
          .on("end", () => resolve())
          .on("error", (err) => reject(err))
          .save(tempOut);
      });

      const outputBuffer = await readFile(tempOut);

      return {
        data: new Uint8Array(outputBuffer),
        format: options.to,
      };
    } catch (err: unknown) {
      const error = err as Error;
      throw new Error(`FFmpeg conversion failed: ${error.message}. Ensure FFmpeg is installed.`);
    } finally {
      await rm(tempIn, { force: true });
      await rm(tempOut, { force: true });
    }
  }
}
