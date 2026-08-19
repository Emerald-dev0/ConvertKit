import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  FileImage,
  Film,
  Music,
  Database,
  ArrowRight,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Supported Formats | ConvertKit",
  description:
    "Browse all file formats supported by ConvertKit. Documents, images, video, audio, and data formats.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const formatCategories = [
  {
    name: "Documents",
    icon: FileText,
    description: "Transform documents between formats while preserving content.",
    formats: [
      { id: "pdf", name: "PDF", description: "Portable Document Format" },
      { id: "docx", name: "DOCX", description: "Microsoft Word Document" },
      { id: "txt", name: "TXT", description: "Plain Text" },
      { id: "md", name: "MD", description: "Markdown" },
      { id: "html", name: "HTML", description: "HyperText Markup Language" },
      { id: "pptx", name: "PPTX", description: "PowerPoint Presentation" },
      { id: "xlsx", name: "XLSX", description: "Excel Spreadsheet" },
    ],
  },
  {
    name: "Images",
    icon: FileImage,
    description: "Convert images with quality control and format optimization.",
    formats: [
      { id: "png", name: "PNG", description: "Portable Network Graphics" },
      { id: "jpg", name: "JPG", description: "JPEG Image" },
      { id: "jpeg", name: "JPEG", description: "Joint Photographic Experts Group" },
      { id: "webp", name: "WEBP", description: "WebP Image" },
      { id: "gif", name: "GIF", description: "Graphics Interchange Format" },
      { id: "svg", name: "SVG", description: "Scalable Vector Graphics" },
    ],
  },
  {
    name: "Video",
    icon: Film,
    description: "Transcode video files with codec and quality options.",
    formats: [
      { id: "mp4", name: "MP4", description: "MPEG-4 Part 14" },
      { id: "mov", name: "MOV", description: "QuickTime Movie" },
      { id: "avi", name: "AVI", description: "Audio Video Interleave" },
      { id: "mkv", name: "MKV", description: "Matroska Video" },
      { id: "webm", name: "WEBM", description: "WebM Video" },
    ],
  },
  {
    name: "Audio",
    icon: Music,
    description: "Convert audio formats with bitrate and quality settings.",
    formats: [
      { id: "mp3", name: "MP3", description: "MPEG Audio Layer III" },
      { id: "wav", name: "WAV", description: "Waveform Audio File" },
      { id: "aac", name: "AAC", description: "Advanced Audio Coding" },
      { id: "flac", name: "FLAC", description: "Free Lossless Audio Codec" },
      { id: "ogg", name: "OGG", description: "Ogg Vorbis" },
    ],
  },
  {
    name: "Data",
    icon: Database,
    description: "Transform structured data between common formats.",
    formats: [
      { id: "csv", name: "CSV", description: "Comma-Separated Values" },
      { id: "json", name: "JSON", description: "JavaScript Object Notation" },
      { id: "xml", name: "XML", description: "Extensible Markup Language" },
      { id: "tsv", name: "TSV", description: "Tab-Separated Values" },
    ],
  },
];

export default function FormatsPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              All formats
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              Supported formats
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              Convert between documents, images, video, audio, and data formats.
              All conversions are free, fast, and private.
            </p>
          </div>

          {/* Format categories */}
          <div className="space-y-12">
            {formatCategories.map((category) => (
              <section key={category.name}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                    <category.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-display font-semibold text-ink">
                      {category.name}
                    </h2>
                    <p className="text-sm text-ink-muted">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.formats.map((format) => (
                    <Link
                      key={format.id}
                      href={`/formats/${format.id}`}
                      className="group"
                    >
                      <Card className="h-full hover:shadow-medium transition-all group-hover:border-accent-200">
                        <div className="flex items-start justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-lg font-semibold text-accent-600">
                                {format.name}
                              </span>
                              <Badge variant="default">.{format.id}</Badge>
                            </div>
                            <p className="text-sm text-ink-muted mt-1">
                              {format.description}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-accent-600 transition-colors" />
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
