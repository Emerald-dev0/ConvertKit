import { ConversionCapability } from "./capability.js";
import { FileFormat } from "./format.js";

/**
 * Metadata for a converter.
 */
export interface ConverterMetadata {
  /** Unique identifier for the converter (e.g., 'pandoc-pdf-to-docx') */
  readonly id: string;
  /** Human-readable name */
  readonly name: string;
  /** Brief description of what the converter does and its engines */
  readonly description: string;
  /** Version of the converter implementation */
  readonly version: string;
}

/**
 * Generic options for conversion.
 */
export interface ConversionOptions {
  /** Target format for the conversion */
  readonly to: FileFormat;
  /** Additional converter-specific options */
  readonly extra?: Record<string, unknown>;
}

/**
 * Represents the result of a conversion.
 */
export interface ConversionResult {
  /** The converted data (buffer or stream) */
  readonly data: Uint8Array | ReadableStream;
  /** The format of the output data */
  readonly format: FileFormat;
  /** Any warnings encountered during conversion */
  readonly warnings?: string[];
}

/**
 * The core contract that all ConvertKit converters must implement.
 */
export interface Converter {
  /** Metadata describing the converter. */
  readonly metadata: ConverterMetadata;

  /** List of conversion capabilities provided by this converter. */
  readonly capabilities: readonly ConversionCapability[];

  /**
   * Validates if the input can be processed by this converter.
   * Useful for quick checks before starting heavy conversion logic.
   */
  validate(input: Uint8Array | ReadableStream, from: FileFormat): Promise<boolean>;

  /**
   * Performs the actual conversion.
   */
  convert(
    input: Uint8Array | ReadableStream,
    options: ConversionOptions
  ): Promise<ConversionResult>;
}
