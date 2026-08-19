"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileImage,
  FileText,
  Film,
  Music,
  Database,
  Github,
  Zap,
  Shield,
  Globe,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { ConversionCard } from "@/components/ui/conversion-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { FormatOption } from "@/components/ui/format-selector";

// Example formats - in production this would come from the registry
const exampleFormats: FormatOption[] = [
  { id: "pdf", label: "PDF Document", extension: "pdf" },
  { id: "docx", label: "Word Document", extension: "docx" },
  { id: "png", label: "PNG Image", extension: "png" },
  { id: "jpg", label: "JPEG Image", extension: "jpg" },
  { id: "webp", label: "WebP Image", extension: "webp" },
  { id: "mp4", label: "MP4 Video", extension: "mp4" },
  { id: "mp3", label: "MP3 Audio", extension: "mp3" },
  { id: "csv", label: "CSV Data", extension: "csv" },
  { id: "json", label: "JSON Data", extension: "json" },
];

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
    formats: ["PDF", "DOCX", "TXT", "MD", "HTML"],
    description: "Transform documents between formats while preserving content.",
  },
  {
    name: "Images",
    icon: FileImage,
    formats: ["PNG", "JPG", "WEBP", "GIF", "SVG"],
    description: "Convert images with quality control and format optimization.",
  },
  {
    name: "Video",
    icon: Film,
    formats: ["MP4", "MOV", "AVI", "MKV", "WEBM"],
    description: "Transcode video files with codec and quality options.",
  },
  {
    name: "Audio",
    icon: Music,
    formats: ["MP3", "WAV", "AAC", "FLAC", "OGG"],
    description: "Convert audio formats with bitrate and quality settings.",
  },
  {
    name: "Data",
    icon: Database,
    formats: ["CSV", "JSON", "XML", "TSV"],
    description: "Transform structured data between common formats.",
  },
];

const features = [
  {
    icon: Zap,
    title: "Fast conversions",
    description: "Built on optimized engines for quick, reliable file transformation.",
  },
  {
    icon: Shield,
    title: "Private by default",
    description: "Files are processed locally. No uploads to external servers.",
  },
  {
    icon: Globe,
    title: "Works everywhere",
    description: "Use in the browser, via CLI, or integrate with your application.",
  },
];

export default function HomePage() {
  // Mock conversion handler - in production this would call /api/convert
  const handleConvert = async (file: File, targetFormat: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      outputUrl: "#",
      outputFilename: `${file.name.split(".")[0]}.${targetFormat}`,
      outputSize: file.size,
    };
  };

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Free &middot; No signup required
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold text-ink tracking-tight">
              Convert anything.
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              Turn documents, images, video, audio and data into the formats you need.
              Fast, private, and free for basic use.
            </p>
          </div>

          {/* Converter in the hero */}
          <div className="max-w-2xl mx-auto">
            <ConversionCard
              formats={exampleFormats}
              onConvert={handleConvert}
            />
          </div>

          <p className="text-center text-sm text-ink-faint mt-6">
            Supported formats: PDF, DOCX, PNG, JPG, WEBP, MP4, MP3, CSV, JSON, and more.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-surface border-y border-rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-6 h-6 text-accent-600" />
                </div>
                <h3 className="text-lg font-semibold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm text-ink-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Format Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink">
              Supports all major formats
            </h2>
            <p className="mt-4 text-lg text-ink-muted">
              Documents, images, video, audio, and data — all in one place.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formatCategories.map((category) => (
              <Card key={category.name} className="hover:shadow-medium transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-canvas-warm flex items-center justify-center flex-shrink-0">
                    <category.icon className="w-5 h-5 text-ink-muted" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">{category.name}</h3>
                    <p className="text-sm text-ink-muted mt-1">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {category.formats.map((format) => (
                        <Badge key={format} variant="default">
                          {format}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source Section */}
      <section className="py-16 md:py-24 bg-surface border-y border-rule">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="default" className="mb-4">
                Open Source
              </Badge>
              <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink">
                Built in the open
              </h2>
              <p className="mt-4 text-lg text-ink-muted">
                ConvertKit is open source. Inspect the code, contribute, or self-host.
                No black boxes, no vendor lock-in.
              </p>
              <div className="flex items-center gap-4 mt-8">
                <Link href="https://github.com/your-org/convertkit" target="_blank">
                  <Button variant="secondary">
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </Button>
                </Link>
                <Link href="/developers">
                  <Button variant="ghost">
                    Read the docs
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <div className="bg-canvas-warm rounded-2xl p-8 border border-rule">
              <div className="font-mono text-sm space-y-2">
                <p className="text-ink-faint"># Install the CLI</p>
                <p className="text-ink">npm install -g convertkit</p>
                <p className="text-ink-faint mt-4"># Convert a file</p>
                <p className="text-ink">convertkit convert input.pdf --to docx</p>
                <p className="text-ink-faint mt-4"># Or use the API</p>
                <p className="text-ink">curl -X POST /api/convert \</p>
                <p className="text-ink pl-4">-F &quot;file=@input.pdf&quot; \</p>
                <p className="text-ink pl-4">-F &quot;targetFormat=docx&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-semibold text-ink">
            Ready to convert?
          </h2>
          <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
            Start converting files for free. No signup required.
          </p>
          <div className="flex items-center justify-center gap-4 mt-8">
            <Link href="/convert">
              <Button size="lg">
                Convert a file
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/developers">
              <Button variant="secondary" size="lg">
                Explore the API
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
