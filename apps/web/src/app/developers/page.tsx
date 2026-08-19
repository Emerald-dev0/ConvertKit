import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Code2,
  Terminal,
  Plug,
  BookOpen,
  Zap,
  Shield,
  Globe,
  Github,
} from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Developers | ConvertKit",
  description:
    "File conversion infrastructure for developers. Integrate ConvertKit into your application with our API, SDKs, and CLI.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const features = [
  {
    icon: Code2,
    title: "REST API",
    description: "Simple, well-documented API for programmatic conversions.",
  },
  {
    icon: Terminal,
    title: "CLI",
    description: "Command-line interface for scripts and automation.",
  },
  {
    icon: Plug,
    title: "SDKs",
    description: "Official libraries for JavaScript, TypeScript, and more.",
  },
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API reference.",
  },
];

const codeExamples = [
  {
    label: "JavaScript",
    code: `import { ConvertKit } from 'convertkit';

const ck = new ConvertKit();

const result = await ck.convert({
  file: './document.pdf',
  to: 'docx'
});

console.log(result.url);`,
  },
  {
    label: "cURL",
    code: `curl -X POST https://api.convertkit.cloud/v1/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "targetFormat=docx"`,
  },
  {
    label: "CLI",
    code: `# Install the CLI
npm install -g convertkit

# Convert a file
convertkit convert document.pdf --to docx

# List supported formats
convertkit formats`,
  },
];

export default function DevelopersPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              For developers
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              File conversion infrastructure
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              Integrate ConvertKit into your application in minutes. Simple API,
              powerful engines, reliable results.
            </p>
            <div className="flex items-center justify-center gap-4 mt-8">
              <Link href="/developers/docs">
                <Button size="lg">
                  Read the docs
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="https://github.com/your-org/convertkit" target="_blank">
                <Button variant="secondary" size="lg">
                  <Github className="w-4 h-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </div>

          {/* Quick install */}
          <section className="mb-16 p-6 bg-surface border border-rule rounded-2xl">
            <div className="text-center mb-6">
              <h2 className="text-xl font-display font-semibold text-ink">
                Quick start
              </h2>
            </div>
            <div className="max-w-md mx-auto">
              <div className="bg-canvas-warm border border-rule rounded-xl p-4">
                <p className="text-xs text-ink-faint mb-2">Install the SDK</p>
                <code className="font-mono text-sm text-ink">npm install convertkit</code>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <Card key={feature.title}>
                  <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-ink">{feature.title}</h3>
                  <p className="text-sm text-ink-muted mt-1">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </section>

          {/* Code examples */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              Start converting in seconds
            </h2>
            <div className="space-y-4">
              {codeExamples.map((example) => (
                <div
                  key={example.label}
                  className="bg-surface border border-rule rounded-xl overflow-hidden"
                >
                  <div className="px-4 py-2 bg-canvas-warm border-b border-rule">
                    <span className="text-xs font-mono text-ink-faint">
                      {example.label}
                    </span>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="font-mono text-sm text-ink">
                      {example.code}
                    </code>
                  </pre>
                </div>
              ))}
            </div>
          </section>

          {/* Why ConvertKit */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              Why developers choose ConvertKit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  icon: Zap,
                  title: "Fast",
                  description:
                    "Optimized engines for quick, reliable conversions.",
                },
                {
                  icon: Shield,
                  title: "Private",
                  description:
                    "Files are processed locally. No uploads to external servers.",
                },
                {
                  icon: Globe,
                  title: "Extensible",
                  description:
                    "Open source. Add your own converters and plugins.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-muted mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="p-8 bg-surface border border-rule rounded-2xl text-center">
            <h2 className="text-2xl font-display font-semibold text-ink mb-4">
              Ready to build?
            </h2>
            <p className="text-ink-muted mb-6">
              Start integrating ConvertKit today. Free for basic use.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/developers/docs">
                <Button size="lg">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/developers/playground">
                <Button variant="secondary" size="lg">
                  Try the playground
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
