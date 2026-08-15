/**
 * Represents a file format supported by ConvertKit.
 */
export interface FileFormat {
  /** Unique identifier for the format (e.g., 'pdf', 'docx') */
  readonly id: string;
  /** Human-readable name (e.g., 'Portable Document Format') */
  readonly name: string;
  /** Associated file extensions, including the leading dot (e.g., ['.jpg', '.jpeg']) */
  readonly extensions: readonly string[];
  /** Associated MIME types (e.g., ['application/pdf']) */
  readonly mimeTypes: readonly string[];
}

/**
 * Common file formats supported by default.
 */
export const FORMATS = {
  PDF: {
    id: "pdf",
    name: "Portable Document Format",
    extensions: [".pdf"],
    mimeTypes: ["application/pdf"],
  },
  DOCX: {
    id: "docx",
    name: "Microsoft Word Document",
    extensions: [".docx"],
    mimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ],
  },
  TXT: {
    id: "txt",
    name: "Plain Text",
    extensions: [".txt"],
    mimeTypes: ["text/plain"],
  },
  PNG: {
    id: "png",
    name: "Portable Network Graphics",
    extensions: [".png"],
    mimeTypes: ["image/png"],
  },
  JPG: {
    id: "jpg",
    name: "Joint Photographic Experts Group",
    extensions: [".jpg", ".jpeg"],
    mimeTypes: ["image/jpeg"],
  },
  WEBP: {
    id: "webp",
    name: "WebP Image",
    extensions: [".webp"],
    mimeTypes: ["image/webp"],
  },
  CSV: {
    id: "csv",
    name: "Comma-Separated Values",
    extensions: [".csv"],
    mimeTypes: ["text/csv"],
  },
  JSON: {
    id: "json",
    name: "JavaScript Object Notation",
    extensions: [".json"],
    mimeTypes: ["application/json"],
  },
  MD: {
    id: "md",
    name: "Markdown",
    extensions: [".md", ".markdown"],
    mimeTypes: ["text/markdown"],
  },
} as const satisfies Record<string, FileFormat>;

/**
 * Utility to find a format by its extension.
 */
export function findFormatByExtension(ext: string): FileFormat | undefined {
  const normalizedExt = ext.startsWith(".") ? ext.toLowerCase() : `.${ext.toLowerCase()}`;
  return Object.values(FORMATS).find((f) =>
    f.extensions.includes(normalizedExt)
  );
}

/**
 * Utility to find a format by its MIME type.
 */
export function findFormatByMimeType(mime: string): FileFormat | undefined {
  const normalizedMime = mime.toLowerCase();
  return Object.values(FORMATS).find((f) =>
    f.mimeTypes.includes(normalizedMime)
  );
}
