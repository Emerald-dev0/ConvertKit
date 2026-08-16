#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  FormatDetector,
  ConverterRegistry,
  findFormatByExtension,
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { OfficePdfConverter } from "@convertkit/converter-office-pdf";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";

const program = new Command();
const detector = new FormatDetector();
const registry = new ConverterRegistry();

// Initialize registry with available converters
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new OfficePdfConverter());
registry.register(new FfmpegConverter());

program
  .name("convertkit")
  .description("Developer-first file conversion CLI")
  .version("0.1.0")
  .argument("<input>", "Path to the input file")
  .option("-o, --output <path>", "Path to the output file")
  .option("-f, --format <id>", "Target format ID (e.g., pdf, jpg)")
  .action(async (inputPath: string, options) => {
    try {
      const absoluteInputPath = path.resolve(inputPath);
      const inputBuffer = await readFile(absoluteInputPath);
      const inputData = new Uint8Array(inputBuffer);

      // 1. Detect Input Format
      const fromFormat = await detector.detect(inputData, {
        filename: absoluteInputPath
      });

      if (!fromFormat) {
        console.error(chalk.red(`Error: Could not identify format for ${inputPath}`));
        process.exit(1);
      }

      // 2. Determine Target Format
      let toFormat;
      if (options.format) {
        toFormat = findFormatByExtension(options.format);
      } else if (options.output) {
        toFormat = findFormatByExtension(options.output);
      }

      if (!toFormat) {
        console.error(chalk.red("Error: Target format not specified. Use --format or --output with an extension."));
        process.exit(1);
      }

      console.log(chalk.blue(`Converting: ${fromFormat.name} -> ${toFormat.name}...`));

      // 3. Resolve Converter
      const converter = registry.resolveConverter(fromFormat, toFormat);

      if (!converter) {
        console.error(chalk.red(`Error: No converter found for ${fromFormat.id} to ${toFormat.id}`));
        process.exit(1);
      }

      // 4. Convert
      const result = await converter.convert(inputData, { to: toFormat });

      // 5. Output
      let outputPath = options.output;
      if (!outputPath) {
        const ext = toFormat.extensions[0];
        const parsed = path.parse(absoluteInputPath);
        outputPath = path.join(parsed.dir, `${parsed.name}${ext}`);
      }

      await writeFile(path.resolve(outputPath), result.data as Uint8Array);

      console.log(chalk.green(`\u2713 Successfully converted to: ${outputPath}`));
    } catch (error: any) {
      console.error(chalk.red(`Error: ${error.message}`));
      process.exit(1);
    }
  });

program.parse();
