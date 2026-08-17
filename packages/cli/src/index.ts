#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import cliProgress from "cli-progress";
import { readFile, writeFile, mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { glob } from "glob";
import {
  FormatDetector,
  ConverterRegistry,
  findFormatByExtension,
  FORMATS,
} from "@convertkit/core";
import { ImageConverter } from "@convertkit/converter-image";
import { PdfTextConverter } from "@convertkit/converter-pdf-text";
import { CsvJsonConverter } from "@convertkit/converter-csv-json";
import { MarkdownHtmlConverter } from "@convertkit/converter-markdown-html";
import { OfficePdfConverter } from "@convertkit/converter-office-pdf";
import { FfmpegConverter } from "@convertkit/converter-ffmpeg";
import { TesseractOCRConverter } from "@convertkit/converter-ocr";

const program = new Command();
const detector = new FormatDetector();
const registry = new ConverterRegistry();

// Initialize registry
registry.register(new ImageConverter());
registry.register(new PdfTextConverter());
registry.register(new CsvJsonConverter());
registry.register(new MarkdownHtmlConverter());
registry.register(new OfficePdfConverter());
registry.register(new FfmpegConverter());
registry.register(new TesseractOCRConverter());

program
  .name("convertkit")
  .description("Developer-first file conversion CLI")
  .version("0.1.0");

program
  .command("convert", { isDefault: true })
  .description("Convert one or more files")
  .argument("<inputs...>", "Input file paths or glob patterns")
  .option("-o, --output <dir>", "Output directory (defaults to input dir)")
  .option("-f, --format <id>", "Target format ID (e.g., pdf, jpg, txt)")
  .action(async (inputPatterns: string[], options) => {
    const files: string[] = [];
    for (const pattern of inputPatterns) {
      const matches = await glob(pattern, { absolute: true });
      files.push(...matches);
    }

    if (files.length === 0) {
      console.error(chalk.red("Error: No files matched the input patterns."));
      process.exit(1);
    }

    let toFormat = options.format ? findFormatByExtension(options.format) : undefined;

    if (!toFormat && !options.format) {
       console.error(chalk.yellow("Warning: Target format not explicitly specified via --format."));
    }

    const multibar = new cliProgress.MultiBar({
      clearOnComplete: false,
      hideCursor: true,
      format: " {bar} | {filename} | {value}/{total} | {status}",
    }, cliProgress.Presets.shades_grey);

    console.log(chalk.blue(`Processing ${files.length} file(s)...`));

    const isBatch = files.length > 1;
    for (const file of files) {
      const filename = path.basename(file);
      const progressBar = multibar.create(100, 0, { filename, status: "Detecting..." });

      try {
        const inputData = new Uint8Array(await readFile(file));
        progressBar.update(10, { status: "Analyzing..." });

        const fromFormat = await detector.detect(inputData, { filename: file });
        if (!fromFormat) {
          progressBar.update(100, { status: chalk.red("Unknown Format") });
          continue;
        }

        const targetFormat = toFormat || (options.output && !isBatch ? findFormatByExtension(options.output) : undefined);
        if (!targetFormat) {
          progressBar.update(100, { status: chalk.red("Target Missing") });
          continue;
        }

        const converter = registry.resolveConverter(fromFormat, targetFormat);
        if (!converter) {
          progressBar.update(100, { status: chalk.red("No Converter") });
          continue;
        }

        progressBar.update(30, { status: "Converting..." });
        const result = await converter.convert(inputData, { to: targetFormat });
        progressBar.update(80, { status: "Saving..." });

        const ext = targetFormat.extensions[0];
        const parsed = path.parse(file);

        let finalPath: string;
        if (options.output) {
          const resolvedOutput = path.resolve(options.output);
          const isDir = isBatch || (await stat(resolvedOutput).then((s: any) => s.isDirectory()).catch(() => false)) || options.output.endsWith("/") || options.output.endsWith("\\");

          if (isDir) {
            await mkdir(resolvedOutput, { recursive: true });
            finalPath = path.join(resolvedOutput, `${parsed.name}${ext}`);
          } else {
            finalPath = resolvedOutput;
          }
        } else {
          finalPath = path.join(parsed.dir, `${parsed.name}${ext}`);
        }

        await writeFile(finalPath, result.data as Uint8Array);
        progressBar.update(100, { status: chalk.green("Done") });
      } catch (err: any) {
        progressBar.update(100, { status: chalk.red("Failed") });
        multibar.log(chalk.red(`\n[${filename}] Error: ${err.message}\n`));
      }
    }

    multibar.stop();
    console.log(chalk.green("\n\u2713 All operations completed."));
  });

program
  .command("list")
  .description("List all supported formats and registered converters")
  .action(() => {
    console.log(chalk.bold("\nSupported Formats:"));
    const formatList = Object.values(FORMATS).map(f =>
      `  - ${chalk.green(f.id.padEnd(6))} | ${f.name.padEnd(30)} | ${f.extensions.join(", ")}`
    ).join("\n");
    console.log(formatList);

    console.log(chalk.bold("\nRegistered Converters:"));
    const converters = registry.getConverters();
    converters.forEach(c => {
      console.log(`  - ${chalk.blue(c.metadata.name.padEnd(25))} (v${c.metadata.version})`);
      console.log(`    ${chalk.dim(c.metadata.description)}`);
    });
  });

program
  .command("detect")
  .description("Identify the format of a file")
  .argument("<path>", "File path to detect")
  .action(async (filePath) => {
    try {
      const data = new Uint8Array(await readFile(filePath));
      const format = await detector.detect(data, { filename: filePath });
      if (format) {
        console.log(`${chalk.blue(filePath)}: ${chalk.green(format.name)} (${format.id})`);
      } else {
        console.log(`${chalk.blue(filePath)}: ${chalk.red("Unknown format")}`);
      }
    } catch (err: any) {
      console.error(chalk.red(`Error: ${err.message}`));
    }
  });

program.parse();
