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
  /** Category for SEO grouping */
  readonly category?: "video" | "audio" | "image" | "document" | "data" | "ebook" | "3d" | "cad" | "font" | "archive" | "subtitle";
}

/**
 * Universal File Format Registry.
 * The nodes of our Conversion Graph.
 */
export const FORMATS = {
  // --- DOCUMENTS ---
  PDF: { id: "pdf", name: "Portable Document Format", extensions: [".pdf"], mimeTypes: ["application/pdf"], category: "document" },
  DOCX: { id: "docx", name: "Microsoft Word (OpenXML)", extensions: [".docx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], category: "document" },
  DOC: { id: "doc", name: "Microsoft Word", extensions: [".doc"], mimeTypes: ["application/msword"], category: "document" },
  TXT: { id: "txt", name: "Plain Text", extensions: [".txt"], mimeTypes: ["text/plain"], category: "document" },
  RTF: { id: "rtf", name: "Rich Text Format", extensions: [".rtf"], mimeTypes: ["application/rtf"], category: "document" },
  ODT: { id: "odt", name: "OpenDocument Text", extensions: [".odt"], mimeTypes: ["application/vnd.oasis.opendocument.text"], category: "document" },
  TEX: { id: "tex", name: "LaTeX", extensions: [".tex"], mimeTypes: ["application/x-tex"], category: "document" },
  MD: { id: "md", name: "Markdown", extensions: [".md", ".markdown"], mimeTypes: ["text/markdown"], category: "document" },
  HTML: { id: "html", name: "HTML", extensions: [".html", ".htm"], mimeTypes: ["text/html"], category: "document" },

  // --- SPREADSHEETS ---
  XLSX: { id: "xlsx", name: "Microsoft Excel (OpenXML)", extensions: [".xlsx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"], category: "data" },
  XLS: { id: "xls", name: "Microsoft Excel", extensions: [".xls"], mimeTypes: ["application/vnd.ms-excel"], category: "data" },
  CSV: { id: "csv", name: "Comma-Separated Values", extensions: [".csv"], mimeTypes: ["text/csv"], category: "data" },
  TSV: { id: "tsv", name: "Tab-Separated Values", extensions: [".tsv"], mimeTypes: ["text/tab-separated-values"], category: "data" },
  ODS: { id: "ods", name: "OpenDocument Spreadsheet", extensions: [".ods"], mimeTypes: ["application/vnd.oasis.opendocument.spreadsheet"], category: "data" },

  // --- PRESENTATIONS ---
  PPTX: { id: "pptx", name: "Microsoft PowerPoint (OpenXML)", extensions: [".pptx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"], category: "document" },
  PPT: { id: "ppt", name: "Microsoft PowerPoint", extensions: [".ppt"], mimeTypes: ["application/vnd.ms-powerpoint"], category: "document" },

  // --- IMAGES ---
  PNG: { id: "png", name: "Portable Network Graphics", extensions: [".png"], mimeTypes: ["image/png"], category: "image" },
  JPG: { id: "jpg", name: "JPEG", extensions: [".jpg", ".jpeg"], mimeTypes: ["image/jpeg"], category: "image" },
  WEBP: { id: "webp", name: "WebP", extensions: [".webp"], mimeTypes: ["image/webp"], category: "image" },
  AVIF: { id: "avif", name: "AVIF", extensions: [".avif"], mimeTypes: ["image/avif"], category: "image" },
  SVG: { id: "svg", name: "Scalable Vector Graphics", extensions: [".svg"], mimeTypes: ["image/svg+xml"], category: "image" },
  HEIC: { id: "heic", name: "HEIC", extensions: [".heic"], mimeTypes: ["image/heic"], category: "image" },
  GIF: { id: "gif", name: "GIF", extensions: [".gif"], mimeTypes: ["image/gif"], category: "image" },
  ICO: { id: "ico", name: "ICO", extensions: [".ico"], mimeTypes: ["image/x-icon"], category: "image" },
  PSD: { id: "psd", name: "Adobe Photoshop", extensions: [".psd"], mimeTypes: ["image/vnd.adobe.photoshop"], category: "image" },
  TIFF: { id: "tiff", name: "TIFF", extensions: [".tiff", ".tif"], mimeTypes: ["image/tiff"], category: "image" },

  // --- VIDEO ---
  MP4: { id: "mp4", name: "MP4 Video", extensions: [".mp4"], mimeTypes: ["video/mp4"], category: "video" },
  MKV: { id: "mkv", name: "Matroska Video", extensions: [".mkv"], mimeTypes: ["video/x-matroska"], category: "video" },
  MOV: { id: "mov", name: "QuickTime MOV", extensions: [".mov"], mimeTypes: ["video/quicktime"], category: "video" },
  AVI: { id: "avi", name: "AVI Video", extensions: [".avi"], mimeTypes: ["video/x-msvideo"], category: "video" },
  WEBM: { id: "webm", name: "WebM Video", extensions: [".webm"], mimeTypes: ["video/webm"], category: "video" },
  WMV: { id: "wmv", name: "Windows Media Video", extensions: [".wmv"], mimeTypes: ["video/x-ms-wmv"], category: "video" },
  TS: { id: "ts", name: "MPEG Transport Stream", extensions: [".ts"], mimeTypes: ["video/mp2t"], category: "video" },
  FLV: { id: "flv", name: "Flash Video", extensions: [".flv"], mimeTypes: ["video/x-flv"], category: "video" },

  // --- AUDIO ---
  MP3: { id: "mp3", name: "MP3 Audio", extensions: [".mp3"], mimeTypes: ["audio/mpeg"], category: "audio" },
  WAV: { id: "wav", name: "WAV Audio", extensions: [".wav"], mimeTypes: ["audio/wav"], category: "audio" },
  FLAC: { id: "flac", name: "FLAC Audio", extensions: [".flac"], mimeTypes: ["audio/flac"], category: "audio" },
  AAC: { id: "aac", name: "AAC Audio", extensions: [".aac"], mimeTypes: ["audio/aac"], category: "audio" },
  OGG: { id: "ogg", name: "Ogg Vorbis Audio", extensions: [".ogg"], mimeTypes: ["audio/ogg"], category: "audio" },
  OPUS: { id: "opus", name: "Opus Audio", extensions: [".opus"], mimeTypes: ["audio/opus"], category: "audio" },
  AIFF: { id: "aiff", name: "AIFF Audio", extensions: [".aiff", ".aif"], mimeTypes: ["audio/x-aiff"], category: "audio" },

  // --- STRUCTURED DATA ---
  JSON: { id: "json", name: "JSON", extensions: [".json"], mimeTypes: ["application/json"], category: "data" },
  XML: { id: "xml", name: "XML", extensions: [".xml"], mimeTypes: ["application/xml"], category: "data" },
  YAML: { id: "yaml", name: "YAML", extensions: [".yaml", ".yml"], mimeTypes: ["text/yaml"], category: "data" },
  TOML: { id: "toml", name: "TOML", extensions: [".toml"], mimeTypes: ["application/toml"], category: "data" },
  SQL: { id: "sql", name: "SQL", extensions: [".sql"], mimeTypes: ["application/sql"], category: "data" },
  PARQUET: { id: "parquet", name: "Apache Parquet", extensions: [".parquet"], mimeTypes: ["application/x-parquet"], category: "data" },

  // --- EBOOKS ---
  EPUB: { id: "epub", name: "EPUB eBook", extensions: [".epub"], mimeTypes: ["application/epub+zip"], category: "ebook" },
  MOBI: { id: "mobi", name: "Mobipocket eBook", extensions: [".mobi"], mimeTypes: ["application/x-mobipocket-ebook"], category: "ebook" },
  AZW3: { id: "azw3", name: "Kindle eBook (AZW3)", extensions: [".azw3"], mimeTypes: ["application/vnd.amazon.mobi8-ebook"], category: "ebook" },

  // --- 3D / CAD ---
  STL: { id: "stl", name: "STL (3D)", extensions: [".stl"], mimeTypes: ["model/stl"], category: "3d" },
  OBJ: { id: "obj", name: "Wavefront OBJ", extensions: [".obj"], mimeTypes: ["model/obj"], category: "3d" },
  GLB: { id: "glb", name: "GLB (Binary glTF)", extensions: [".glb"], mimeTypes: ["model/gltf-binary"], category: "3d" },
  GLTF: { id: "gltf", name: "glTF", extensions: [".gltf"], mimeTypes: ["model/gltf+json"], category: "3d" },
  FBX: { id: "fbx", name: "FBX (3D)", extensions: [".fbx"], mimeTypes: ["application/octet-stream"], category: "3d" },
  DXF: { id: "dxf", name: "AutoCAD DXF", extensions: [".dxf"], mimeTypes: ["image/vnd.dxf"], category: "cad" },
  STEP: { id: "step", name: "STEP (CAD)", extensions: [".step", ".stp"], mimeTypes: ["application/step"], category: "cad" },

  // --- SUBTITLES ---
  SRT: { id: "srt", name: "SubRip Subtitle", extensions: [".srt"], mimeTypes: ["text/plain"], category: "subtitle" },
  VTT: { id: "vtt", name: "WebVTT Subtitle", extensions: [".vtt"], mimeTypes: ["text/vtt"], category: "subtitle" },
  ASS: { id: "ass", name: "Advanced Substation Alpha", extensions: [".ass", ".ssa"], mimeTypes: ["text/plain"], category: "subtitle" },

  // --- ARCHIVES ---
  ZIP: { id: "zip", name: "ZIP Archive", extensions: [".zip"], mimeTypes: ["application/zip"], category: "archive" },
  RAR: { id: "rar", name: "RAR Archive", extensions: [".rar"], mimeTypes: ["application/vnd.rar"], category: "archive" },
  TAR: { id: "tar", name: "TAR Archive", extensions: [".tar"], mimeTypes: ["application/x-tar"], category: "archive" },
  GZ: { id: "gz", name: "Gzip Archive", extensions: [".gz"], mimeTypes: ["application/gzip"], category: "archive" },
} as const satisfies Record<string, FileFormat>;

/**
 * Utility to find a format by its extension or filename.
 */
export function findFormatByExtension(
  extOrFilename: string
): FileFormat | undefined {
  const lastDotIndex = extOrFilename.lastIndexOf(".");
  const ext =
    lastDotIndex === -1 ? extOrFilename : extOrFilename.slice(lastDotIndex);

  const normalizedExt = ext.startsWith(".")
    ? ext.toLowerCase()
    : `.${ext.toLowerCase()}`;

  return Object.values(FORMATS).find((f) =>
    (f.extensions as readonly string[]).includes(normalizedExt)
  );
}

/**
 * Utility to find a format by its MIME type.
 */
export function findFormatByMimeType(mime: string): FileFormat | undefined {
  const normalizedMime = mime.toLowerCase();
  return Object.values(FORMATS).find((f) =>
    (f.mimeTypes as readonly string[]).includes(normalizedMime)
  );
}
