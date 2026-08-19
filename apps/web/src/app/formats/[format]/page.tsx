import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getFormatById, getConversionLookup } from "@/lib/convertkit";

interface PageProps {
  params: Promise<{ format: string }>;
}

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const FORMAT_DESCRIPTIONS: Record<string, { commonUses: string[]; description: string }> = {
  pdf: { commonUses: ["Documents", "Reports", "Forms", "E-books", "Print-ready files"], description: "Portable Document Format. Widely used for documents that need to be viewed consistently across devices." },
  docx: { commonUses: ["Letters", "Reports", "Resumes", "Collaborative editing"], description: "Microsoft Word Document. Standard format for editable documents." },
  doc: { commonUses: ["Legacy documents", "Older Word files"], description: "Microsoft Word binary format. Legacy format still widely encountered." },
  png: { commonUses: ["Web graphics", "Screenshots", "Logos", "Images with transparency"], description: "Portable Network Graphics. Lossless image format with transparency support." },
  jpg: { commonUses: ["Photographs", "Web images", "Social media", "Email attachments"], description: "JPEG image format. Widely supported with lossy compression for smaller files." },
  webp: { commonUses: ["Web images", "Progressive loading", "Modern browsers"], description: "WebP. Modern image format with superior compression for web use." },
  mp4: { commonUses: ["Video playback", "Streaming", "Social media", "Presentations"], description: "MPEG-4 Part 14. Standard container for video and audio on the web." },
  mp3: { commonUses: ["Music", "Podcasts", "Audiobooks", "Audio sharing"], description: "MPEG Audio Layer III. Universal audio format with lossy compression." },
  csv: { commonUses: ["Spreadsheets", "Data export", "Database dumps", "Data analysis"], description: "Comma-Separated Values. Simple format for tabular data." },
  json: { commonUses: ["APIs", "Configuration", "Data exchange", "Web apps"], description: "JavaScript Object Notation. Lightweight data interchange format." },
  xlsx: { commonUses: ["Spreadsheets", "Financial data", "Charts", "Pivot tables"], description: "Microsoft Excel OpenXML spreadsheet format." },
  pptx: { commonUses: ["Presentations", "Slideshows", "Pitch decks", "Lectures"], description: "Microsoft PowerPoint OpenXML presentation format." },
  svg: { commonUses: ["Icons", "Logos", "Illustrations", "Scalable graphics"], description: "Scalable Vector Graphics. Resolution-independent vector format." },
  gif: { commonUses: ["Animations", "Simple graphics", "Memes"], description: "Graphics Interchange Format. Supports animation and transparency." },
  tiff: { commonUses: ["Print", "Photography", "Scanning", "Archival"], description: "Tagged Image File Format. Lossless format for high-quality imagery." },
  avif: { commonUses: ["Modern web images", "HDR content", "Next-gen compression"], description: "AV1 Image File Format. Next-generation format with excellent compression." },
  heic: { commonUses: ["Apple photos", "Mobile photography", "HEVC images"], description: "High Efficiency Image Container. Apple's default photo format." },
  avi: { commonUses: ["Legacy video", "Windows media", "Editing"], description: "Audio Video Interleave. Legacy Microsoft video container." },
  mkv: { commonUses: ["Media collections", "Subtitles", "Multiple tracks"], description: "Matroska Video. Open container supporting multiple tracks and subtitles." },
  mov: { commonUses: ["Apple ecosystem", "Video editing", "Professional video"], description: "QuickTime Movie. Apple's native video container format." },
  webm: { commonUses: ["Web video", "HTML5 playback", "Open media"], description: "WebM. Open, royalty-free video format for the web." },
  wav: { commonUses: ["Audio editing", "Lossless audio", "Studio recording"], description: "Waveform Audio File. Uncompressed lossless audio format." },
  flac: { commonUses: ["Lossless music", "Archival", "High-fidelity audio"], description: "Free Lossless Audio Codec. Lossless audio with compression." },
  aac: { commonUses: ["Streaming", "Apple Music", "Podcasts"], description: "Advanced Audio Coding. Successor to MP3 with better quality." },
  ogg: { commonUses: ["Open-source audio", "Game audio", "Web streaming"], description: "Ogg Vorbis. Open, royalty-free audio codec." },
  opus: { commonUses: ["Voice", "WebRTC", "Low-latency streaming"], description: "Opus. Versatile codec for voice and music at any bitrate." },
  epub: { commonUses: ["E-readers", "Digital books", "Publishing"], description: "Electronic Publication. Open standard for ebooks." },
  mobi: { commonUses: ["Kindle", "E-readers", "Mobile books"], description: "Mobipocket eBook format." },
  zip: { commonUses: ["File compression", "Distribution", "Backup"], description: "ZIP Archive. Universal compression format." },
  rar: { commonUses: ["Large archives", "Distribution", "Compression"], description: "RAR Archive. High-ratio compression format." },
  srt: { commonUses: ["Video subtitles", "Captions", "Translation"], description: "SubRip Subtitle. Most common subtitle format." },
  vtt: { commonUses: ["Web subtitles", "HTML5 video", "Captions"], description: "WebVTT. W3C standard subtitle format for the web." },
  ttf: { commonUses: ["Desktop fonts", "Print", "System fonts"], description: "TrueType Font. Standard font format for screen and print." },
  otf: { commonUses: ["OpenType fonts", "Advanced typography", "Design"], description: "OpenType Font. Advanced font format with extended character support." },
  woff: { commonUses: ["Web fonts", "Website typography"], description: "Web Open Font Format. Compressed font format for web use." },
  woff2: { commonUses: ["Modern web fonts", "Performance typography"], description: "Web Open Font Format 2. Improved compression over WOFF." },
  stl: { commonUses: ["3D printing", "CAD models", "Prototyping"], description: "STL. Standard format for 3D printing and rapid prototyping." },
  obj: { commonUses: ["3D modeling", "Game assets", "Rendering"], description: "Wavefront OBJ. Standard 3D geometry format." },
  glb: { commonUses: ["Web 3D", "AR/VR", "Game engines"], description: "GLB. Binary glTF format for efficient 3D content delivery." },
  dxf: { commonUses: ["AutoCAD", "Technical drawing", "CNC machining"], description: "AutoCAD DXF. Drawing Exchange Format for CAD interoperability." },
  step: { commonUses: ["CAD interchange", "Engineering", "Manufacturing"], description: "STEP. Standard for exchanging 3D CAD data." },
  mp2: { commonUses: ["Broadcast", "Legacy audio", "DAB radio"], description: "MPEG Audio Layer II. Legacy broadcast audio format." },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { format: formatId } = await params;
  const format = getFormatById(formatId);
  if (!format) return { title: "Format not found | ConvertKit" };

  const meta = FORMAT_DESCRIPTIONS[formatId];
  const desc = meta?.description || format.name;

  return {
    title: `${format.name} Format | ConvertKit`,
    description: `Convert ${format.name} files to other formats. ${desc}`,
  };
}

export default async function FormatPage({ params }: PageProps) {
  const { format: formatId } = await params;
  const format = getFormatById(formatId);
  if (!format) notFound();

  const conversionLookup = getConversionLookup();
  const targets = conversionLookup[formatId] || [];
  const meta = FORMAT_DESCRIPTIONS[formatId];

  // Find formats that can convert TO this format
  const allConversions = getConversionLookup();
  const sources = Object.entries(allConversions)
    .filter(([_, targets]) => targets.some((t) => t.to === formatId))
    .map(([fromId]) => fromId);

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/formats"
            className="inline-flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            All formats
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Badge variant="accent" className="mb-3">
              {format.category}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink">
              {format.name}
            </h1>
            <p className="mt-3 text-lg text-ink-muted">
              {meta?.description || `Convert ${format.name} files to and from other formats.`}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {format.extensions.map((ext) => (
                <code key={ext} className="font-mono text-xs bg-canvas-warm px-2 py-1 rounded">
                  {ext}
                </code>
              ))}
              {format.mimeTypes.map((mime) => (
                <code key={mime} className="font-mono text-xs bg-canvas-warm px-2 py-1 rounded text-ink-faint">
                  {mime}
                </code>
              ))}
            </div>
          </div>

          {/* Common uses */}
          {meta?.commonUses && (
            <Card className="mb-8">
              <h2 className="text-sm font-medium text-ink-faint mb-3">
                Common uses
              </h2>
              <div className="flex flex-wrap gap-2">
                {meta.commonUses.map((use) => (
                  <Badge key={use} variant="default">
                    {use}
                  </Badge>
                ))}
              </div>
            </Card>
          )}

          {/* Convert TO */}
          {targets.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-display font-semibold text-ink mb-4">
                Convert from {format.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {targets.map((target) => (
                  <Link
                    key={target.to}
                    href={`/convert/${formatId}-to-${target.to}`}
                  >
                    <Card className="hover:shadow-medium transition-shadow">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-ink">
                            {format.name} → {target.to.toUpperCase()}
                          </p>
                          <p className="text-xs text-ink-faint mt-1">
                            {target.direct ? "Direct conversion" : `${target.path.length - 1} step pipeline`}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-ink-faint" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Convert FROM */}
          {sources.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-display font-semibold text-ink mb-4">
                Convert to {format.name}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sources.map((sourceId) => {
                  const source = getFormatById(sourceId);
                  if (!source) return null;
                  return (
                    <Link
                      key={sourceId}
                      href={`/convert/${sourceId}-to-${formatId}`}
                    >
                      <Card className="hover:shadow-medium transition-shadow">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-ink">
                              {source.name} → {format.name}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-ink-faint" />
                        </div>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* No conversions */}
          {targets.length === 0 && sources.length === 0 && (
            <Card className="mb-8">
              <p className="text-ink-muted text-center py-4">
                No conversions available for this format yet.{" "}
                <Link href="/developers" className="text-accent-600 hover:text-accent-700">
                  Build a converter
                </Link>{" "}
                to add support.
              </p>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
