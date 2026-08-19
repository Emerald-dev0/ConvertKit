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
  readonly category?: "video" | "audio" | "image" | "document" | "data" | "ebook" | "3d" | "cad" | "font" | "archive" | "subtitle" | "presentation" | "vector" | "raw" | "scientific";
}

/**
 * Universal File Format Registry.
 * The nodes of our Conversion Graph.
 *
 * Organized by the ConvertKit Format Universe — 20 categories covering
 * documents, spreadsheets, presentations, images, raw camera, video,
 * audio, ebooks, archives, fonts, vector graphics, CAD, 3D, scientific,
 * subtitles, data/developer, postscript, icons, and OCR targets.
 */
export const FORMATS = {

  // ═══════════════════════════════════════════════════════════════════════
  // 1. DOCUMENTS
  // ═══════════════════════════════════════════════════════════════════════
  PDF: { id: "pdf", name: "Portable Document Format", extensions: [".pdf"], mimeTypes: ["application/pdf"], category: "document" },
  DOCX: { id: "docx", name: "Microsoft Word (OpenXML)", extensions: [".docx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.document"], category: "document" },
  DOC: { id: "doc", name: "Microsoft Word", extensions: [".doc"], mimeTypes: ["application/msword"], category: "document" },
  DOCM: { id: "docm", name: "Microsoft Word (Macro-Enabled)", extensions: [".docm"], mimeTypes: ["application/vnd.ms-word.document.macroEnabled.12"], category: "document" },
  DOT: { id: "dot", name: "Microsoft Word Template", extensions: [".dot"], mimeTypes: ["application/msword"], category: "document" },
  DOTX: { id: "dotx", name: "Microsoft Word Template (OpenXML)", extensions: [".dotx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.wordprocessingml.template"], category: "document" },
  DOTM: { id: "dotm", name: "Microsoft Word Template (Macro-Enabled)", extensions: [".dotm"], mimeTypes: ["application/vnd.ms-word.template.macroEnabled.12"], category: "document" },
  ODT: { id: "odt", name: "OpenDocument Text", extensions: [".odt"], mimeTypes: ["application/vnd.oasis.opendocument.text"], category: "document" },
  OTT: { id: "ott", name: "OpenDocument Text Template", extensions: [".ott"], mimeTypes: ["application/vnd.oasis.opendocument.text-template"], category: "document" },
  RTF: { id: "rtf", name: "Rich Text Format", extensions: [".rtf"], mimeTypes: ["application/rtf"], category: "document" },
  TXT: { id: "txt", name: "Plain Text", extensions: [".txt"], mimeTypes: ["text/plain"], category: "document" },
  TEX: { id: "tex", name: "LaTeX", extensions: [".tex"], mimeTypes: ["application/x-tex"], category: "document" },
  MD: { id: "md", name: "Markdown", extensions: [".md", ".markdown"], mimeTypes: ["text/markdown"], category: "document" },
  HTML: { id: "html", name: "HTML", extensions: [".html", ".htm"], mimeTypes: ["text/html"], category: "document" },
  XHTML: { id: "xhtml", name: "XHTML", extensions: [".xhtml", ".xht"], mimeTypes: ["application/xhtml+xml"], category: "document" },
  XML: { id: "xml", name: "XML", extensions: [".xml"], mimeTypes: ["application/xml"], category: "document" },
  WPS: { id: "wps", name: "Microsoft Works", extensions: [".wps"], mimeTypes: ["application/vnd.ms-works"], category: "document" },
  ABW: { id: "abw", name: "AbiWord", extensions: [".abw"], mimeTypes: ["application/x-abiword"], category: "document" },
  KWD: { id: "kwd", name: "KWord Document", extensions: [".kwd"], mimeTypes: ["application/vnd.kde.kword"], category: "document" },
  SXW: { id: "sxw", name: "OpenDocument Writer", extensions: [".sxw"], mimeTypes: ["application/vnd.sun.xml.writer"], category: "document" },
  DBK: { id: "dbk", name: "DocBook XML", extensions: [".dbk"], mimeTypes: ["application/docbook+xml"], category: "document" },
  DJVU: { id: "djvu", name: "DjVu", extensions: [".djvu", ".djv"], mimeTypes: ["image/vnd.djvu"], category: "document" },
  XPS: { id: "xps", name: "XML Paper Specification", extensions: [".xps"], mimeTypes: ["application/vnd.ms-xpsdocument"], category: "document" },
  OXPS: { id: "oxps", name: "Open XPS", extensions: [".oxps"], mimeTypes: ["application/oxps"], category: "document" },
  EPUB: { id: "epub", name: "EPUB eBook", extensions: [".epub"], mimeTypes: ["application/epub+zip"], category: "ebook" },
  MHT: { id: "mht", name: "MHTML Archive", extensions: [".mht", ".mhtml"], mimeTypes: ["message/rfc822"], category: "document" },

  // ═══════════════════════════════════════════════════════════════════════
  // 2. SPREADSHEETS / DATA
  // ═══════════════════════════════════════════════════════════════════════
  XLSX: { id: "xlsx", name: "Microsoft Excel (OpenXML)", extensions: [".xlsx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"], category: "data" },
  XLS: { id: "xls", name: "Microsoft Excel", extensions: [".xls"], mimeTypes: ["application/vnd.ms-excel"], category: "data" },
  XLSM: { id: "xlsm", name: "Microsoft Excel (Macro-Enabled)", extensions: [".xlsm"], mimeTypes: ["application/vnd.ms-excel.sheet.macroEnabled.12"], category: "data" },
  XLSB: { id: "xlsb", name: "Microsoft Excel Binary", extensions: [".xlsb"], mimeTypes: ["application/vnd.ms-excel.sheet.binary.macroEnabled.12"], category: "data" },
  XLTX: { id: "xltx", name: "Microsoft Excel Template", extensions: [".xltx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.spreadsheetml.template"], category: "data" },
  XLTM: { id: "xltm", name: "Microsoft Excel Template (Macro-Enabled)", extensions: [".xltm"], mimeTypes: ["application/vnd.ms-excel.template.macroEnabled.12"], category: "data" },
  CSV: { id: "csv", name: "Comma-Separated Values", extensions: [".csv"], mimeTypes: ["text/csv"], category: "data" },
  TSV: { id: "tsv", name: "Tab-Separated Values", extensions: [".tsv"], mimeTypes: ["text/tab-separated-values"], category: "data" },
  ODS: { id: "ods", name: "OpenDocument Spreadsheet", extensions: [".ods"], mimeTypes: ["application/vnd.oasis.opendocument.spreadsheet"], category: "data" },
  FODS: { id: "fods", name: "Flat ODS", extensions: [".fods"], mimeTypes: ["application/vnd.oasis.opendocument.spreadsheet"], category: "data" },
  DIF: { id: "dif", name: "Data Interchange Format", extensions: [".dif"], mimeTypes: ["text/plain"], category: "data" },
  DBF: { id: "dbf", name: "dBASE", extensions: [".dbf"], mimeTypes: ["application/x-dbf"], category: "data" },
  JSON: { id: "json", name: "JSON", extensions: [".json"], mimeTypes: ["application/json"], category: "data" },
  YAML: { id: "yaml", name: "YAML", extensions: [".yaml", ".yml"], mimeTypes: ["text/yaml"], category: "data" },
  TOML: { id: "toml", name: "TOML", extensions: [".toml"], mimeTypes: ["application/toml"], category: "data" },
  SQL: { id: "sql", name: "SQL", extensions: [".sql"], mimeTypes: ["application/sql"], category: "data" },
  PARQUET: { id: "parquet", name: "Apache Parquet", extensions: [".parquet"], mimeTypes: ["application/x-parquet"], category: "data" },
  NDJSON: { id: "ndjson", name: "Newline-Delimited JSON", extensions: [".ndjson", ".jsonl"], mimeTypes: ["application/x-ndjson"], category: "data" },

  // ═══════════════════════════════════════════════════════════════════════
  // 3. PRESENTATIONS
  // ═══════════════════════════════════════════════════════════════════════
  PPTX: { id: "pptx", name: "Microsoft PowerPoint (OpenXML)", extensions: [".pptx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.presentationml.presentation"], category: "presentation" },
  PPT: { id: "ppt", name: "Microsoft PowerPoint", extensions: [".ppt"], mimeTypes: ["application/vnd.ms-powerpoint"], category: "presentation" },
  PPTM: { id: "pptm", name: "Microsoft PowerPoint (Macro-Enabled)", extensions: [".pptm"], mimeTypes: ["application/vnd.ms-powerpoint.presentation.macroEnabled.12"], category: "presentation" },
  PPS: { id: "pps", name: "PowerPoint Slide Show", extensions: [".pps"], mimeTypes: ["application/vnd.ms-powerpoint"], category: "presentation" },
  PPSX: { id: "ppsx", name: "PowerPoint Slide Show (OpenXML)", extensions: [".ppsx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.presentationml.slideshow"], category: "presentation" },
  PPSM: { id: "ppsm", name: "PowerPoint Slide Show (Macro-Enabled)", extensions: [".ppsm"], mimeTypes: ["application/vnd.ms-powerpoint.slideshow.macroEnabled.12"], category: "presentation" },
  POT: { id: "pot", name: "PowerPoint Template", extensions: [".pot"], mimeTypes: ["application/vnd.ms-powerpoint"], category: "presentation" },
  POTX: { id: "potx", name: "PowerPoint Template (OpenXML)", extensions: [".potx"], mimeTypes: ["application/vnd.openxmlformats-officedocument.presentationml.template"], category: "presentation" },
  POTM: { id: "potm", name: "PowerPoint Template (Macro-Enabled)", extensions: [".potm"], mimeTypes: ["application/vnd.ms-powerpoint.template.macroEnabled.12"], category: "presentation" },
  ODP: { id: "odp", name: "OpenDocument Presentation", extensions: [".odp"], mimeTypes: ["application/vnd.oasis.opendocument.presentation"], category: "presentation" },
  OTP: { id: "otp", name: "OpenDocument Presentation Template", extensions: [".otp"], mimeTypes: ["application/vnd.oasis.opendocument.presentation-template"], category: "presentation" },

  // ═══════════════════════════════════════════════════════════════════════
  // 4. IMAGES
  // ═══════════════════════════════════════════════════════════════════════
  PNG: { id: "png", name: "Portable Network Graphics", extensions: [".png"], mimeTypes: ["image/png"], category: "image" },
  JPG: { id: "jpg", name: "JPEG", extensions: [".jpg", ".jpeg"], mimeTypes: ["image/jpeg"], category: "image" },
  WEBP: { id: "webp", name: "WebP", extensions: [".webp"], mimeTypes: ["image/webp"], category: "image" },
  AVIF: { id: "avif", name: "AVIF", extensions: [".avif"], mimeTypes: ["image/avif"], category: "image" },
  SVG: { id: "svg", name: "Scalable Vector Graphics", extensions: [".svg"], mimeTypes: ["image/svg+xml"], category: "image" },
  HEIC: { id: "heic", name: "HEIC", extensions: [".heic"], mimeTypes: ["image/heic"], category: "image" },
  HEIF: { id: "heif", name: "HEIF", extensions: [".heif"], mimeTypes: ["image/heif"], category: "image" },
  GIF: { id: "gif", name: "GIF", extensions: [".gif"], mimeTypes: ["image/gif"], category: "image" },
  ICO: { id: "ico", name: "ICO", extensions: [".ico"], mimeTypes: ["image/x-icon"], category: "image" },
  CUR: { id: "cur", name: "Windows Cursor", extensions: [".cur"], mimeTypes: ["image/x-icon"], category: "image" },
  PSD: { id: "psd", name: "Adobe Photoshop", extensions: [".psd"], mimeTypes: ["image/vnd.adobe.photoshop"], category: "image" },
  TIFF: { id: "tiff", name: "TIFF", extensions: [".tiff", ".tif"], mimeTypes: ["image/tiff"], category: "image" },
  BMP: { id: "bmp", name: "Bitmap", extensions: [".bmp"], mimeTypes: ["image/bmp"], category: "image" },
  DDS: { id: "dds", name: "DirectDraw Surface", extensions: [".dds"], mimeTypes: ["image/vnd.ms-dds"], category: "image" },
  TGA: { id: "tga", name: "Targa", extensions: [".tga"], mimeTypes: ["image/x-targa"], category: "image" },
  JP2: { id: "jp2", name: "JPEG 2000", extensions: [".jp2", ".j2k", ".jpf", ".j2c"], mimeTypes: ["image/jp2"], category: "image" },
  PCX: { id: "pcx", name: "PCX", extensions: [".pcx"], mimeTypes: ["image/x-pcx"], category: "image" },
  PNM: { id: "pnm", name: "Portable Anymap", extensions: [".pnm"], mimeTypes: ["image/x-portable-anymap"], category: "image" },
  PBM: { id: "pbm", name: "Portable Bitmap", extensions: [".pbm"], mimeTypes: ["image/x-portable-bitmap"], category: "image" },
  PGM: { id: "pgm", name: "Portable Graymap", extensions: [".pgm"], mimeTypes: ["image/x-portable-graymap"], category: "image" },
  PPM: { id: "ppm", name: "Portable Pixmap", extensions: [".ppm"], mimeTypes: ["image/x-portable-pixmap"], category: "image" },
  PAM: { id: "pam", name: "Portable Arbitrary Map", extensions: [".pam"], mimeTypes: ["image/x-portable-arbitrarymap"], category: "image" },
  XBM: { id: "xbm", name: "X BitMap", extensions: [".xbm"], mimeTypes: ["image/x-xbitmap"], category: "image" },
  XPM: { id: "xpm", name: "X PixMap", extensions: [".xpm"], mimeTypes: ["image/x-xpixmap"], category: "image" },
  EXR: { id: "exr", name: "OpenEXR", extensions: [".exr"], mimeTypes: ["image/x-exr"], category: "image" },
  HDR: { id: "hdr", name: "Radiance HDR", extensions: [".hdr"], mimeTypes: ["image/vnd.radiance"], category: "image" },

  // ═══════════════════════════════════════════════════════════════════════
  // 5. CAMERA RAW
  // ═══════════════════════════════════════════════════════════════════════
  CR2: { id: "cr2", name: "Canon CR2", extensions: [".cr2"], mimeTypes: ["image/x-canon-cr2"], category: "raw" },
  CR3: { id: "cr3", name: "Canon CR3", extensions: [".cr3"], mimeTypes: ["image/x-canon-cr3"], category: "raw" },
  CRW: { id: "crw", name: "Canon CRW", extensions: [".crw"], mimeTypes: ["image/x-canon-crw"], category: "raw" },
  NEF: { id: "nef", name: "Nikon NEF", extensions: [".nef"], mimeTypes: ["image/x-nikon-nef"], category: "raw" },
  NRW: { id: "nrw", name: "Nikon NRW", extensions: [".nrw"], mimeTypes: ["image/x-nikon-nrw"], category: "raw" },
  ARW: { id: "arw", name: "Sony ARW", extensions: [".arw"], mimeTypes: ["image/x-sony-arw"], category: "raw" },
  SRF: { id: "srf", name: "Sony SRF", extensions: [".srf"], mimeTypes: ["image/x-sony-srf"], category: "raw" },
  SR2: { id: "sr2", name: "Sony SR2", extensions: [".sr2"], mimeTypes: ["image/x-sony-sr2"], category: "raw" },
  ORF: { id: "orf", name: "Olympus ORF", extensions: [".orf"], mimeTypes: ["image/x-olympus-orf"], category: "raw" },
  RAF: { id: "raf", name: "Fuji RAF", extensions: [".raf"], mimeTypes: ["image/x-fuji-raf"], category: "raw" },
  RW2: { id: "rw2", name: "Panasonic RW2", extensions: [".rw2"], mimeTypes: ["image/x-panasonic-rw2"], category: "raw" },
  PEF: { id: "pef", name: "Pentax PEF", extensions: [".pef"], mimeTypes: ["image/x-pentax-pef"], category: "raw" },
  DNG: { id: "dng", name: "Adobe DNG", extensions: [".dng"], mimeTypes: ["image/x-adobe-dng"], category: "raw" },
  ERF: { id: "erf", name: "Epson ERF", extensions: [".erf"], mimeTypes: ["image/x-epson-erf"], category: "raw" },
  KDC: { id: "kdc", name: "Kodak KDC", extensions: [".kdc"], mimeTypes: ["image/x-kodak-kdc"], category: "raw" },
  DCR: { id: "dcr", name: "Kodak DCR", extensions: [".dcr"], mimeTypes: ["image/x-kodak-dcr"], category: "raw" },
  MRW: { id: "mrw", name: "Minolta MRW", extensions: [".mrw"], mimeTypes: ["image/x-minolta-mrw"], category: "raw" },
  MEF: { id: "mef", name: "Mamiya MEF", extensions: [".mef"], mimeTypes: ["image/x-mamiya-mef"], category: "raw" },
  _3FR: { id: "3fr", name: "Hasselblad 3FR", extensions: [".3fr"], mimeTypes: ["image/x-hasselblad-3fr"], category: "raw" },
  X3F: { id: "x3f", name: "Sigma X3F", extensions: [".x3f"], mimeTypes: ["image/x-sigma-x3f"], category: "raw" },

  // ═══════════════════════════════════════════════════════════════════════
  // 6. VIDEO
  // ═══════════════════════════════════════════════════════════════════════
  MP4: { id: "mp4", name: "MP4 Video", extensions: [".mp4"], mimeTypes: ["video/mp4"], category: "video" },
  MKV: { id: "mkv", name: "Matroska Video", extensions: [".mkv"], mimeTypes: ["video/x-matroska"], category: "video" },
  MOV: { id: "mov", name: "QuickTime MOV", extensions: [".mov"], mimeTypes: ["video/quicktime"], category: "video" },
  AVI: { id: "avi", name: "AVI Video", extensions: [".avi"], mimeTypes: ["video/x-msvideo"], category: "video" },
  WEBM: { id: "webm", name: "WebM Video", extensions: [".webm"], mimeTypes: ["video/webm"], category: "video" },
  WMV: { id: "wmv", name: "Windows Media Video", extensions: [".wmv"], mimeTypes: ["video/x-ms-wmv"], category: "video" },
  FLV: { id: "flv", name: "Flash Video", extensions: [".flv"], mimeTypes: ["video/x-flv"], category: "video" },
  F4V: { id: "f4v", name: "Flash MP4 Video", extensions: [".f4v"], mimeTypes: ["video/x-f4v"], category: "video" },
  MPEG: { id: "mpeg", name: "MPEG Video", extensions: [".mpeg", ".mpg"], mimeTypes: ["video/mpeg"], category: "video" },
  M4V: { id: "m4v", name: "M4V Video", extensions: [".m4v"], mimeTypes: ["video/x-m4v"], category: "video" },
  _3GP: { id: "3gp", name: "3GPP Video", extensions: [".3gp"], mimeTypes: ["video/3gpp"], category: "video" },
  _3G2: { id: "3g2", name: "3GPP2 Video", extensions: [".3g2"], mimeTypes: ["video/3gpp2"], category: "video" },
  OGV: { id: "ogv", name: "Ogg Video", extensions: [".ogv"], mimeTypes: ["video/ogg"], category: "video" },
  TS_VIDEO: { id: "ts", name: "MPEG Transport Stream", extensions: [".ts"], mimeTypes: ["video/mp2t"], category: "video" },
  MTS: { id: "mts", name: "AVCHD Video", extensions: [".mts"], mimeTypes: ["video/mp2t"], category: "video" },
  M2TS: { id: "m2ts", name: "Blu-ray MPEG-2 Transport", extensions: [".m2ts"], mimeTypes: ["video/mp2t"], category: "video" },
  VOB: { id: "vob", name: "DVD Video Object", extensions: [".vob"], mimeTypes: ["video/mpeg"], category: "video" },
  MXF: { id: "mxf", name: "Material Exchange Format", extensions: [".mxf"], mimeTypes: ["application/mxf"], category: "video" },
  ASF: { id: "asf", name: "Advanced Systems Format", extensions: [".asf"], mimeTypes: ["video/x-ms-asf"], category: "video" },
  RM: { id: "rm", name: "RealMedia", extensions: [".rm"], mimeTypes: ["application/vnd.rn-realmedia"], category: "video" },
  DV: { id: "dv", name: "DV Video", extensions: [".dv"], mimeTypes: ["video/x-dv"], category: "video" },
  MOD: { id: "mod", name: "MOD Video", extensions: [".mod"], mimeTypes: ["video/mod"], category: "video" },
  SWF: { id: "swf", name: "SWF Video", extensions: [".swf"], mimeTypes: ["application/x-shockwave-flash"], category: "video" },

  // ═══════════════════════════════════════════════════════════════════════
  // 7. AUDIO
  // ═══════════════════════════════════════════════════════════════════════
  MP3: { id: "mp3", name: "MP3 Audio", extensions: [".mp3"], mimeTypes: ["audio/mpeg"], category: "audio" },
  WAV: { id: "wav", name: "WAV Audio", extensions: [".wav"], mimeTypes: ["audio/wav"], category: "audio" },
  FLAC: { id: "flac", name: "FLAC Audio", extensions: [".flac"], mimeTypes: ["audio/flac"], category: "audio" },
  AAC: { id: "aac", name: "AAC Audio", extensions: [".aac"], mimeTypes: ["audio/aac"], category: "audio" },
  M4A: { id: "m4a", name: "M4A Audio", extensions: [".m4a"], mimeTypes: ["audio/mp4"], category: "audio" },
  M4R: { id: "m4r", name: "iPhone Ringtone", extensions: [".m4r"], mimeTypes: ["audio/mp4"], category: "audio" },
  OGG: { id: "ogg", name: "Ogg Vorbis Audio", extensions: [".ogg"], mimeTypes: ["audio/ogg"], category: "audio" },
  OPUS: { id: "opus", name: "Opus Audio", extensions: [".opus"], mimeTypes: ["audio/opus"], category: "audio" },
  WMA: { id: "wma", name: "Windows Media Audio", extensions: [".wma"], mimeTypes: ["audio/x-ms-wma"], category: "audio" },
  AIFF: { id: "aiff", name: "AIFF Audio", extensions: [".aiff", ".aif"], mimeTypes: ["audio/x-aiff"], category: "audio" },
  AMR: { id: "amr", name: "AMR Audio", extensions: [".amr"], mimeTypes: ["audio/amr"], category: "audio" },
  AC3: { id: "ac3", name: "AC3 Audio", extensions: [".ac3"], mimeTypes: ["audio/ac3"], category: "audio" },
  DTS: { id: "dts", name: "DTS Audio", extensions: [".dts"], mimeTypes: ["audio/vnd.dts"], category: "audio" },
  AU: { id: "au", name: "AU Audio", extensions: [".au"], mimeTypes: ["audio/basic"], category: "audio" },
  SND: { id: "snd", name: "NeXT/Sun Audio", extensions: [".snd"], mimeTypes: ["audio/basic"], category: "audio" },
  CAF: { id: "caf", name: "Core Audio Format", extensions: [".caf"], mimeTypes: ["audio/x-caf"], category: "audio" },
  APE: { id: "ape", name: "Monkey's Audio", extensions: [".ape"], mimeTypes: ["audio/ape"], category: "audio" },
  WV: { id: "wv", name: "WavPack", extensions: [".wv"], mimeTypes: ["audio/wavpack"], category: "audio" },
  TTA: { id: "tta", name: "True Audio", extensions: [".tta"], mimeTypes: ["audio/tta"], category: "audio" },
  VOC: { id: "voc", name: "Creative VOC", extensions: [".voc"], mimeTypes: ["audio/x-voc"], category: "audio" },
  GSM: { id: "gsm", name: "GSM Audio", extensions: [".gsm"], mimeTypes: ["audio/gsm"], category: "audio" },
  OGA: { id: "oga", name: "Ogg Audio", extensions: [".oga"], mimeTypes: ["audio/ogg"], category: "audio" },
  W64: { id: "w64", name: "Sony Wave64", extensions: [".w64"], mimeTypes: ["audio/x-w64"], category: "audio" },
  SHN: { id: "shn", name: "Shorten", extensions: [".shn"], mimeTypes: ["audio/x-shn"], category: "audio" },
  MP2: { id: "mp2", name: "MPEG Audio Layer II", extensions: [".mp2"], mimeTypes: ["audio/mpeg"], category: "audio" },

  // ═══════════════════════════════════════════════════════════════════════
  // 8. EBOOKS
  // ═══════════════════════════════════════════════════════════════════════
  MOBI: { id: "mobi", name: "Mobipocket eBook", extensions: [".mobi"], mimeTypes: ["application/x-mobipocket-ebook"], category: "ebook" },
  AZW: { id: "azw", name: "Kindle eBook", extensions: [".azw"], mimeTypes: ["application/vnd.amazon.ebook"], category: "ebook" },
  AZW3: { id: "azw3", name: "Kindle eBook (AZW3)", extensions: [".azw3"], mimeTypes: ["application/vnd.amazon.mobi8-ebook"], category: "ebook" },
  FB2: { id: "fb2", name: "FictionBook 2", extensions: [".fb2"], mimeTypes: ["application/x-fictionbook+xml"], category: "ebook" },
  LRF: { id: "lrf", name: "BroadBand LRF", extensions: [".lrf"], mimeTypes: ["application/lrf"], category: "ebook" },
  PDB: { id: "pdb", name: "Palm Database", extensions: [".pdb"], mimeTypes: ["application/x-pilot"], category: "ebook" },
  RB: { id: "rb", name: "Rocket eBook", extensions: [".rb"], mimeTypes: ["application/x-rocketebook"], category: "ebook" },
  CBZ: { id: "cbz", name: "Comic Book ZIP", extensions: [".cbz"], mimeTypes: ["application/x-cbz"], category: "ebook" },
  CBR: { id: "cbr", name: "Comic Book RAR", extensions: [".cbr"], mimeTypes: ["application/x-cbr"], category: "ebook" },

  // ═══════════════════════════════════════════════════════════════════════
  // 9. ARCHIVES
  // ═══════════════════════════════════════════════════════════════════════
  ZIP: { id: "zip", name: "ZIP Archive", extensions: [".zip"], mimeTypes: ["application/zip"], category: "archive" },
  RAR: { id: "rar", name: "RAR Archive", extensions: [".rar"], mimeTypes: ["application/vnd.rar"], category: "archive" },
  SEVEN_Z: { id: "7z", name: "7-Zip Archive", extensions: [".7z"], mimeTypes: ["application/x-7z-compressed"], category: "archive" },
  TAR: { id: "tar", name: "TAR Archive", extensions: [".tar"], mimeTypes: ["application/x-tar"], category: "archive" },
  GZ: { id: "gz", name: "Gzip Archive", extensions: [".gz"], mimeTypes: ["application/gzip"], category: "archive" },
  BZ2: { id: "bz2", name: "Bzip2 Archive", extensions: [".bz2"], mimeTypes: ["application/x-bzip2"], category: "archive" },
  XZ: { id: "xz", name: "XZ Archive", extensions: [".xz"], mimeTypes: ["application/x-xz"], category: "archive" },
  TAR_GZ: { id: "tar.gz", name: "Gzipped TAR", extensions: [".tar.gz", ".tgz"], mimeTypes: ["application/gzip"], category: "archive" },
  TAR_BZ2: { id: "tar.bz2", name: "Bzip2 TAR", extensions: [".tar.bz2", ".tbz2"], mimeTypes: ["application/x-bzip2"], category: "archive" },
  TAR_XZ: { id: "tar.xz", name: "XZ TAR", extensions: [".tar.xz", ".txz"], mimeTypes: ["application/x-xz"], category: "archive" },
  CPIO: { id: "cpio", name: "CPIO Archive", extensions: [".cpio"], mimeTypes: ["application/x-cpio"], category: "archive" },
  ARJ: { id: "arj", name: "ARJ Archive", extensions: [".arj"], mimeTypes: ["application/x-arj"], category: "archive" },
  CAB: { id: "cab", name: "Cabinet Archive", extensions: [".cab"], mimeTypes: ["application/vnd.ms-cab-compressed"], category: "archive" },
  LHA: { id: "lha", name: "LHA Archive", extensions: [".lha"], mimeTypes: ["application/x-lha"], category: "archive" },
  JAR: { id: "jar", name: "Java Archive", extensions: [".jar"], mimeTypes: ["application/java-archive"], category: "archive" },

  // ═══════════════════════════════════════════════════════════════════════
  // 10. FONTS
  // ═══════════════════════════════════════════════════════════════════════
  TTF: { id: "ttf", name: "TrueType Font", extensions: [".ttf"], mimeTypes: ["font/ttf"], category: "font" },
  OTF: { id: "otf", name: "OpenType Font", extensions: [".otf"], mimeTypes: ["font/otf"], category: "font" },
  WOFF: { id: "woff", name: "Web Open Font Format", extensions: [".woff"], mimeTypes: ["font/woff"], category: "font" },
  WOFF2: { id: "woff2", name: "Web Open Font Format 2", extensions: [".woff2"], mimeTypes: ["font/woff2"], category: "font" },
  EOT: { id: "eot", name: "Embedded OpenType", extensions: [".eot"], mimeTypes: ["application/vnd.ms-fontobject"], category: "font" },
  PFB: { id: "pfb", name: "PostScript Font (Binary)", extensions: [".pfb"], mimeTypes: ["application/x-font-type1"], category: "font" },
  PFA: { id: "pfa", name: "PostScript Font (ASCII)", extensions: [".pfa"], mimeTypes: ["application/x-font-type1"], category: "font" },
  AFM: { id: "afm", name: "Adobe Font Metrics", extensions: [".afm"], mimeTypes: ["application/x-font-afm"], category: "font" },
  CFF: { id: "cff", name: "Compact Font Format", extensions: [".cff"], mimeTypes: ["application/x-font-cff"], category: "font" },
  DFONT: { id: "dfont", name: "Data Fork Font", extensions: [".dfont"], mimeTypes: ["font/dfont"], category: "font" },

  // ═══════════════════════════════════════════════════════════════════════
  // 11. VECTOR GRAPHICS
  // ═══════════════════════════════════════════════════════════════════════
  AI: { id: "ai", name: "Adobe Illustrator", extensions: [".ai"], mimeTypes: ["application/postscript"], category: "vector" },
  EPS: { id: "eps", name: "Encapsulated PostScript", extensions: [".eps"], mimeTypes: ["application/postscript"], category: "vector" },
  CDR: { id: "cdr", name: "CorelDRAW", extensions: [".cdr"], mimeTypes: ["application/x-cdr"], category: "vector" },
  CMX: { id: "cmx", name: "CorelDRAW Exchange", extensions: [".cmx"], mimeTypes: ["application/x-cmx"], category: "vector" },
  CGM: { id: "cgm", name: "Computer Graphics Metafile", extensions: [".cgm"], mimeTypes: ["image/cgm"], category: "vector" },
  EMF: { id: "emf", name: "Enhanced Metafile", extensions: [".emf"], mimeTypes: ["image/x-emf"], category: "vector" },
  WMF: { id: "wmf", name: "Windows Metafile", extensions: [".wmf"], mimeTypes: ["image/x-wmf"], category: "vector" },
  PLT: { id: "plt", name: "HPGL Plot", extensions: [".plt"], mimeTypes: ["application/x-plt"], category: "vector" },
  PS: { id: "ps", name: "PostScript", extensions: [".ps"], mimeTypes: ["application/postscript"], category: "vector" },
  SK: { id: "sk", name: "Skencil", extensions: [".sk"], mimeTypes: ["application/x-skencil"], category: "vector" },
  FIG: { id: "fig", name: "XFig", extensions: [".fig"], mimeTypes: ["image/x-xfig"], category: "vector" },

  // ═══════════════════════════════════════════════════════════════════════
  // 12. CAD
  // ═══════════════════════════════════════════════════════════════════════
  DWG: { id: "dwg", name: "AutoCAD DWG", extensions: [".dwg"], mimeTypes: ["image/vnd.dwg"], category: "cad" },
  DXF_CAD: { id: "dxf", name: "AutoCAD DXF", extensions: [".dxf"], mimeTypes: ["image/vnd.dxf"], category: "cad" },
  DWF: { id: "dwf", name: "AutoCAD DWF", extensions: [".dwf"], mimeTypes: ["model/vnd.dwf"], category: "cad" },
  DAE: { id: "dae", name: "COLLADA", extensions: [".dae"], mimeTypes: ["model/vnd.collada+xml"], category: "cad" },
  STL: { id: "stl", name: "STL (3D)", extensions: [".stl"], mimeTypes: ["model/stl"], category: "cad" },
  OBJ: { id: "obj", name: "Wavefront OBJ", extensions: [".obj"], mimeTypes: ["model/obj"], category: "cad" },
  _3DS: { id: "3ds", name: "3D Studio", extensions: [".3ds"], mimeTypes: ["application/x-3ds"], category: "cad" },
  STEP: { id: "step", name: "STEP (CAD)", extensions: [".step", ".stp"], mimeTypes: ["application/step"], category: "cad" },
  IGES: { id: "iges", name: "IGES", extensions: [".iges", ".igs"], mimeTypes: ["application/iges"], category: "cad" },
  IFC: { id: "ifc", name: "Industry Foundation Classes", extensions: [".ifc"], mimeTypes: ["application/x-ifc"], category: "cad" },

  // ═══════════════════════════════════════════════════════════════════════
  // 13. 3D / MODELS
  // ═══════════════════════════════════════════════════════════════════════
  GLB: { id: "glb", name: "GLB (Binary glTF)", extensions: [".glb"], mimeTypes: ["model/gltf-binary"], category: "3d" },
  GLTF: { id: "gltf", name: "glTF", extensions: [".gltf"], mimeTypes: ["model/gltf+json"], category: "3d" },
  FBX: { id: "fbx", name: "FBX (3D)", extensions: [".fbx"], mimeTypes: ["application/octet-stream"], category: "3d" },
  PLY: { id: "ply", name: "Stanford PLY", extensions: [".ply"], mimeTypes: ["application/x-ply"], category: "3d" },
  USD: { id: "usd", name: "Universal Scene Description", extensions: [".usd", ".usda", ".usdc"], mimeTypes: ["model/usd"], category: "3d" },
  USDZ: { id: "usdz", name: "Universal Scene Description (ZIP)", extensions: [".usdz"], mimeTypes: ["model/vnd.usdz+zip"], category: "3d" },

  // ═══════════════════════════════════════════════════════════════════════
  // 14. SCIENTIFIC / TECHNICAL
  // ═══════════════════════════════════════════════════════════════════════
  FITS: { id: "fits", name: "Flexible Image Transport System", extensions: [".fits", ".fit"], mimeTypes: ["application/fits"], category: "scientific" },
  DICOM: { id: "dicom", name: "DICOM Medical Image", extensions: [".dcm", ".dicom"], mimeTypes: ["application/dicom"], category: "scientific" },

  // ═══════════════════════════════════════════════════════════════════════
  // 15. SUBTITLES / CAPTIONS
  // ═══════════════════════════════════════════════════════════════════════
  SRT: { id: "srt", name: "SubRip Subtitle", extensions: [".srt"], mimeTypes: ["text/plain"], category: "subtitle" },
  VTT: { id: "vtt", name: "WebVTT Subtitle", extensions: [".vtt"], mimeTypes: ["text/vtt"], category: "subtitle" },
  ASS_SUB: { id: "ass", name: "Advanced Substation Alpha", extensions: [".ass", ".ssa"], mimeTypes: ["text/plain"], category: "subtitle" },
  SUB: { id: "sub", name: "MicroDVD Subtitle", extensions: [".sub"], mimeTypes: ["text/plain"], category: "subtitle" },
  SBV: { id: "sbv", name: "YouTube Subtitle", extensions: [".sbv"], mimeTypes: ["text/plain"], category: "subtitle" },
  TTML: { id: "ttml", name: "Timed Text Markup Language", extensions: [".ttml", ".xml"], mimeTypes: ["application/ttml+xml"], category: "subtitle" },
  DFXP: { id: "dfxp", name: "Distribution Format Exchange Profile", extensions: [".dfxp"], mimeTypes: ["application/ttml+xml"], category: "subtitle" },

  // ═══════════════════════════════════════════════════════════════════════
  // 16. DATA / DEVELOPER FORMATS
  // ═══════════════════════════════════════════════════════════════════════
  INI: { id: "ini", name: "INI Configuration", extensions: [".ini"], mimeTypes: ["text/plain"], category: "data" },
  MARKDOWN: { id: "markdown", name: "Markdown", extensions: [".markdown"], mimeTypes: ["text/markdown"], category: "data" },
  CSS: { id: "css", name: "Cascading Style Sheets", extensions: [".css"], mimeTypes: ["text/css"], category: "data" },
  SVG_DATA: { id: "svg-data", name: "SVG (as data)", extensions: [".svg"], mimeTypes: ["image/svg+xml"], category: "data" },
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
