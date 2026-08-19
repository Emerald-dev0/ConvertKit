import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ format: string }>;
}

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const formatData: Record<
  string,
  {
    name: string;
    description: string;
    commonUses: string[];
    conversions: { to: string; description: string }[];
  }
> = {
  pdf: {
    name: "PDF",
    description:
      "Portable Document Format. Widely used for documents that need to be viewed consistently across devices.",
    commonUses: ["Documents", "Reports", "Forms", "E-books", "Print-ready files"],
    conversions: [
      { to: "docx", description: "Edit PDF content in Microsoft Word" },
      { to: "txt", description: "Extract plain text from PDF" },
      { to: "png", description: "Convert PDF pages to images" },
      { to: "html", description: "View PDF content in a web browser" },
    ],
  },
  png: {
    name: "PNG",
    description:
      "Portable Network Graphics. Lossless image format with transparency support.",
    commonUses: ["Web graphics", "Screenshots", "Logos", "Images with transparency"],
    conversions: [
      { to: "jpg", description: "Compress for smaller file sizes" },
      { to: "webp", description: "Modern format with better compression" },
      { to: "pdf", description: "Create image documents" },
      { to: "svg", description: "Convert to scalable vector graphics" },
    ],
  },
  mp4: {
    name: "MP4",
    description:
      "MPEG-4 Part 14. Standard container for video and audio on the web.",
    commonUses: ["Video playback", "Streaming", "Social media", "Presentations"],
    conversions: [
      { to: "mp3", description: "Extract audio from video" },
      { to: "wav", description: "Convert to uncompressed audio" },
      { to: "gif", description: "Create animated GIFs from video" },
      { to: "webm", description: "Convert to web-optimized video" },
    ],
  },
  csv: {
    name: "CSV",
    description:
      "Comma-Separated Values. Simple format for tabular data.",
    commonUses: ["Spreadsheets", "Data export", "Database dumps", "Data analysis"],
    conversions: [
      { to: "json", description: "Convert to structured JSON data" },
      { to: "xlsx", description: "Open in Microsoft Excel" },
      { to: "xml", description: "Convert to XML format" },
    ],
  },
  docx: {
    name: "DOCX",
    description:
      "Microsoft Word Document. Standard format for editable documents.",
    commonUses: ["Letters", "Reports", "Resumes", "Collaborative editing"],
    conversions: [
      { to: "pdf", description: "Create read-only documents" },
      { to: "txt", description: "Extract plain text" },
      { to: "html", description: "Publish to the web" },
      { to: "md", description: "Convert to Markdown" },
    ],
  },
  jpg: {
    name: "JPG",
    description:
      "JPEG image format. Widely supported with lossy compression for smaller files.",
    commonUses: ["Photographs", "Web images", "Social media", "Email attachments"],
    conversions: [
      { to: "png", description: "Add transparency support" },
      { to: "webp", description: "Modern format with better compression" },
      { to: "pdf", description: "Create image documents" },
    ],
  },
  mp3: {
    name: "MP3",
    description:
      "MPEG Audio Layer III. Universal audio format with lossy compression.",
    commonUses: ["Music", "Podcasts", "Audiobooks", "Audio sharing"],
    conversions: [
      { to: "wav", description: "Convert to uncompressed audio" },
      { to: "aac", description: "Convert to AAC format" },
      { to: "ogg", description: "Convert to open format" },
      { to: "flac", description: "Convert to lossless format" },
    ],
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { format } = await params;
  const data = formatData[format];
  if (!data) return { title: "Format not found | ConvertKit" };

  return {
    title: `${data.name} Format | ConvertKit`,
    description: `Convert ${data.name} files to other formats. ${data.description}`,
  };
}

export default async function FormatPage({ params }: PageProps) {
  const { format } = await params;
  const data = formatData[format];

  if (!data) notFound();

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/formats"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All formats
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink">
                  {data.name}
                </h1>
                <Badge variant="accent">.{format}</Badge>
              </div>
            </div>
            <p className="text-lg text-ink-muted max-w-2xl">{data.description}</p>
          </div>

          {/* Common uses */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-semibold text-ink mb-4">
              Common uses
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.commonUses.map((use) => (
                <Badge key={use} variant="default">
                  {use}
                </Badge>
              ))}
            </div>
          </section>

          {/* Conversions */}
          <section className="mb-12">
            <h2 className="text-xl font-display font-semibold text-ink mb-4">
              Convert from {data.name}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.conversions.map((conv) => (
                <Link
                  key={conv.to}
                  href={`/convert/${format}-to-${conv.to}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-medium transition-all group-hover:border-accent-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-medium text-accent-600">
                            {format.toUpperCase()}
                          </span>
                          <ArrowRight className="w-4 h-4 text-ink-faint" />
                          <span className="font-mono text-sm font-medium text-ink">
                            {conv.to.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-sm text-ink-muted mt-1">
                          {conv.description}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-ink-faint group-hover:text-accent-600 transition-colors" />
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-8 bg-surface border border-rule rounded-2xl text-center">
            <h2 className="text-2xl font-display font-semibold text-ink mb-4">
              Convert {data.name} files instantly
            </h2>
            <p className="text-ink-muted mb-6">
              Drop a file, choose your format, and convert. No signup required.
            </p>
            <Link href="/convert">
              <Button size="lg">
                Convert a {data.name} file
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
