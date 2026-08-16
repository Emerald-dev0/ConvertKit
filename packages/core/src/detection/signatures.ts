/**
 * Represents a file signature (magic number).
 */
export interface FileSignature {
  /** The format ID this signature identifies. */
  readonly formatId: string;
  /** The sequence of bytes to match at the beginning of the file. */
  readonly bytes: number[];
  /** Optional offset from the start of the file. */
  readonly offset?: number;
}

/**
 * A registry of common file signatures.
 * Reference: https://en.wikipedia.org/wiki/List_of_file_signatures
 */
export const SIGNATURES: FileSignature[] = [
  {
    formatId: "pdf",
    bytes: [0x25, 0x50, 0x44, 0x46, 0x2d], // %PDF-
  },
  {
    formatId: "png",
    bytes: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],
  },
  {
    formatId: "jpg",
    bytes: [0xff, 0xd8, 0xff],
  },
  {
    formatId: "webp",
    bytes: [0x52, 0x49, 0x46, 0x46], // 'RIFF' ... 'WEBP' check is usually deeper
    offset: 0,
  },
  {
    formatId: "docx",
    bytes: [0x50, 0x4b, 0x03, 0x04], // ZIP signature (DOCX is a ZIP)
  },
  {
    formatId: "xlsx",
    bytes: [0x50, 0x4b, 0x03, 0x04], // ZIP signature
  },
  {
    formatId: "pptx",
    bytes: [0x50, 0x4b, 0x03, 0x04], // ZIP signature
  },
  {
    formatId: "xls",
    bytes: [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1], // OLE signature
  },
  {
    formatId: "mp3",
    bytes: [0x49, 0x44, 0x33], // ID3
  },
  {
    formatId: "mp3",
    bytes: [0xff, 0xfb], // MP3 without ID3
  },
  {
    formatId: "json",
    bytes: [0x7b], // '{'
  },
  {
    formatId: "json",
    bytes: [0x5b], // '['
  },
];
