import { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getFormatEntries, getConversionLookup } from "@/lib/convertkit";

export const metadata: Metadata = {
  title: "Supported Formats | ConvertKit",
  description:
    "Browse all file formats supported by ConvertKit. Documents, images, video, audio, data, ebooks, and more.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const CATEGORY_META: Record<string, { icon: string; description: string }> = {
  document: { icon: "📄", description: "Transform documents between formats while preserving content." },
  data: { icon: "📊", description: "Convert spreadsheets and structured data between common formats." },
  presentation: { icon: "📽️", description: "Convert presentations and slide decks." },
  image: { icon: "🖼️", description: "Convert images with quality control and format optimization." },
  raw: { icon: "📷", description: "Process camera RAW files from major manufacturers." },
  video: { icon: "🎬", description: "Transcode video files with codec and quality options." },
  audio: { icon: "🎵", description: "Convert audio formats with bitrate and quality settings." },
  ebook: { icon: "📚", description: "Convert ebooks between reader formats." },
  archive: { icon: "📦", description: "Convert between archive and compression formats." },
  font: { icon: "🔤", description: "Convert fonts between web and desktop formats." },
  vector: { icon: "✏️", description: "Convert vector graphics between design formats." },
  cad: { icon: "📐", description: "Convert CAD and technical drawing formats." },
  "3d": { icon: "🧊", description: "Convert 3D model and scene formats." },
  scientific: { icon: "🔬", description: "Convert scientific and medical image formats." },
  subtitle: { icon: "💬", description: "Convert subtitle and caption formats." },
};

const CATEGORY_ORDER = [
  "document", "data", "presentation", "image", "raw", "video", "audio",
  "ebook", "archive", "font", "vector", "cad", "3d", "scientific", "subtitle",
];

export default function FormatsPage() {
  const allFormats = getFormatEntries();
  const conversionLookup = getConversionLookup();

  const grouped = new Map<string, typeof allFormats>();
  for (const format of allFormats) {
    const cat = format.category || "other";
    if (!grouped.has(cat)) grouped.set(cat, []);
    grouped.get(cat)!.push(format);
  }

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              {allFormats.length}+ formats
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              Supported formats
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              Browse every format ConvertKit can read, write, and convert between.
            </p>
          </div>

          {/* Categories */}
          <div className="space-y-12">
            {CATEGORY_ORDER.map((cat) => {
              const formats = grouped.get(cat);
              if (!formats || formats.length === 0) return null;
              const meta = CATEGORY_META[cat] || { icon: "📁", description: "" };

              return (
                <section key={cat}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{meta.icon}</span>
                    <div>
                      <h2 className="text-xl font-display font-semibold text-ink capitalize">
                        {cat === "3d" ? "3D Models" : cat}
                      </h2>
                      <p className="text-sm text-ink-muted">{meta.description}</p>
                    </div>
                    <Badge variant="default" className="ml-auto">
                      {formats.length} formats
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {formats.map((format) => {
                      const targets = conversionLookup[format.id] || [];
                      const targetCount = targets.length;

                      return (
                        <Link key={format.id} href={`/formats/${format.id}`}>
                          <Card className="hover:shadow-medium transition-shadow h-full">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-ink">
                                  {format.name}
                                </h3>
                                <p className="text-xs text-ink-faint font-mono mt-1">
                                  {format.extensions.join(", ")}
                                </p>
                              </div>
                              {targetCount > 0 && (
                                <Badge variant="accent" className="text-[10px]">
                                  {targetCount} conversions
                                </Badge>
                              )}
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
