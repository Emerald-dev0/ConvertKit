import { FileFormat, findFormatByExtension, findFormatByMimeType, FORMATS } from "../domain/format.js";
import { SIGNATURES } from "./signatures.js";

/**
 * Options for format detection.
 */
export interface DetectionOptions {
  /** Optional filename to provide an extension hint. */
  readonly filename?: string;
  /** Optional MIME type hint. */
  readonly mimeHint?: string;
  /** Whether to strictly trust the content signature over hints. */
  readonly strict?: boolean;
}

/**
 * Handles identification of file formats.
 */
export class FormatDetector {
  /**
   * Detects the format of a given input.
   *
   * Priority:
   * 1. Magic numbers (signatures)
   * 2. MIME hint
   * 3. Extension hint
   */
  async detect(
    input: Uint8Array | ReadableStream,
    options: DetectionOptions = {}
  ): Promise<FileFormat | undefined> {
    const bytes = await this.getInitialBytes(input);

    // 1. Check Signatures
    const signatureMatch = this.matchSignature(bytes);
    if (signatureMatch) {
      // Check for ZIP-based formats (DOCX, XLSX, PPTX)
      const zipBased = ["docx", "xlsx", "pptx"];
      if (zipBased.includes(signatureMatch.id) && options.filename) {
         const extMatch = findFormatByExtension(options.filename);
         if (extMatch && zipBased.includes(extMatch.id)) return extMatch;
      }
      return signatureMatch;
    }

    // 2. Check MIME Hint
    if (options.mimeHint) {
      const mimeMatch = findFormatByMimeType(options.mimeHint);
      if (mimeMatch) return mimeMatch;
    }

    // 3. Check Extension Hint
    if (options.filename) {
      const extMatch = findFormatByExtension(options.filename);
      if (extMatch) return extMatch;
    }

    return undefined;
  }

  private async getInitialBytes(
    input: Uint8Array | ReadableStream
  ): Promise<Uint8Array> {
    if (input instanceof Uint8Array) {
      return input.slice(0, 16);
    }

    const reader = input.getReader();
    try {
      const { value, done } = await reader.read();
      if (done || !value) return new Uint8Array();
      return value.slice(0, 16);
    } finally {
      reader.releaseLock();
    }
  }

  private matchSignature(bytes: Uint8Array): FileFormat | undefined {
    for (const sig of SIGNATURES) {
      const offset = sig.offset || 0;
      if (bytes.length < offset + sig.bytes.length) continue;

      const slice = bytes.slice(offset, offset + sig.bytes.length);
      const matches = sig.bytes.every((b, i) => b === slice[i]);

      if (matches) {
        // Find the format object in the registry
        return Object.values(FORMATS).find((f) => f.id === sig.formatId);
      }
    }
    return undefined;
  }
}
