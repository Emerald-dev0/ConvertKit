import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Github,
  Code2,
  Shield,
  Users,
  Zap,
  Globe,
  Lock,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Open Source | ConvertKit",
  description:
    "ConvertKit is open source. Inspect the code, contribute, or self-host. No vendor lock-in.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const principles = [
  {
    icon: Code2,
    title: "Transparent",
    description:
      "All code is public. No black boxes, no hidden behavior.",
  },
  {
    icon: Lock,
    title: "Self-hostable",
    description:
      "Run ConvertKit on your own infrastructure. No mandatory cloud dependency.",
  },
  {
    icon: Users,
    title: "Community built",
    description:
      "Contributors welcome. Add converters, fix bugs, improve docs.",
  },
  {
    icon: Zap,
    title: "No vendor lock-in",
    description:
      "Use the core library without any ConvertKit account or service.",
  },
];

const packages = [
  {
    name: "@convertkit/core",
    description: "Core conversion engine, registry, and pathfinding.",
    install: "npm install @convertkit/core",
  },
  {
    name: "@convertkit/converter-image",
    description: "Image conversion powered by Sharp.",
    install: "npm install @convertkit/converter-image",
  },
  {
    name: "@convertkit/converter-ffmpeg",
    description: "Video and audio conversion powered by FFmpeg.",
    install: "npm install @convertkit/converter-ffmpeg",
  },
  {
    name: "@convertkit/converter-pdf",
    description: "PDF processing and text extraction.",
    install: "npm install @convertkit/converter-pdf",
  },
];

export default function OpenSourcePage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} />

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              Open source
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              Built in the open
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              ConvertKit is open source. Inspect the code, contribute, or
              self-host. No vendor lock-in, no black boxes.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="https://github.com/your-org/convertkit" target="_blank">
                <Button size="lg">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </Link>
              <Link href="/developers/docs">
                <Button variant="secondary" size="lg">
                  Read the docs
                </Button>
              </Link>
            </div>
          </div>

          {/* Principles */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              Our principles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {principles.map((principle) => (
                <Card key={principle.title}>
                  <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center mb-4">
                    <principle.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-ink mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-sm text-ink-muted">
                    {principle.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Packages */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              Packages
            </h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.name}
                  className="p-4 bg-surface border border-rule rounded-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <code className="font-mono text-sm font-medium text-accent-600">
                        {pkg.name}
                      </code>
                      <p className="text-sm text-ink-muted mt-1">
                        {pkg.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 p-2 bg-canvas-warm rounded-lg">
                    <code className="font-mono text-xs text-ink">
                      {pkg.install}
                    </code>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Local-first */}
          <section className="mb-16 p-8 bg-surface border border-rule rounded-2xl">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-50 flex items-center justify-center flex-shrink-0">
                <Globe className="w-6 h-6 text-accent-600" />
              </div>
              <div>
                <h2 className="text-xl font-display font-semibold text-ink mb-2">
                  Local-first architecture
                </h2>
                <p className="text-ink-muted">
                  ConvertKit's core library runs entirely on your machine. No
                  internet connection required, no files uploaded to external
                  servers. The hosted version is optional — the core is free
                  forever.
                </p>
              </div>
            </div>
          </section>

          {/* Contributing */}
          <section className="mb-16 p-8 bg-surface border border-rule rounded-2xl">
            <div className="text-center">
              <Shield className="w-12 h-12 text-accent-600 mx-auto mb-4" />
              <h2 className="text-2xl font-display font-semibold text-ink mb-4">
                Contributing
              </h2>
              <p className="text-ink-muted mb-6 max-w-xl mx-auto">
                We welcome contributions. Whether it's a bug fix, new converter,
                or documentation improvement — we'd love your help.
              </p>
              <Link href="/developers/docs">
                <Button variant="secondary">
                  Read the contribution guide
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center">
            <h2 className="text-2xl font-display font-semibold text-ink mb-4">
              Try ConvertKit
            </h2>
            <p className="text-ink-muted mb-6">
              Start converting files for free. No signup required.
            </p>
            <Link href="/convert">
              <Button size="lg">
                Convert a file
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
