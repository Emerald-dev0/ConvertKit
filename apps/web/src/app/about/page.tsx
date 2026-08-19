import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Heart, Users, Globe, Shield } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | ConvertKit",
  description:
    "ConvertKit is an open-source file conversion platform. Learn about our mission and values.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const values = [
  {
    icon: Shield,
    title: "Privacy first",
    description:
      "Your files are yours. We process them locally and never store them without your explicit consent.",
  },
  {
    icon: Globe,
    title: "Open source",
    description:
      "ConvertKit is built in the open. Inspect the code, contribute, or self-host.",
  },
  {
    icon: Users,
    title: "Community driven",
    description:
      "Built by developers, for developers. We listen to our community and ship fast.",
  },
  {
    icon: Heart,
    title: "Simple by default",
    description:
      "No signup walls, no complicated interfaces. Drop a file, convert it, download it.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">
              About
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              File conversion, done right
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              ConvertKit is an open-source file conversion platform. We believe
              converting files should be simple, fast, and private.
            </p>
          </div>

          {/* Mission */}
          <section className="mb-16 p-8 bg-surface border border-rule rounded-2xl">
            <h2 className="text-2xl font-display font-semibold text-ink mb-4">
              Our mission
            </h2>
            <p className="text-lg text-ink-muted leading-relaxed">
              We started ConvertKit because converting files shouldn't require
              uploading them to random websites, creating accounts, or dealing
              with complicated software. Everyone deserves a simple, trustworthy
              way to transform files between formats.
            </p>
          </section>

          {/* Values */}
          <section className="mb-16">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              What we believe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="p-6 bg-surface border border-rule rounded-xl"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center mb-4">
                    <value.icon className="w-5 h-5 text-accent-600" />
                  </div>
                  <h3 className="font-semibold text-ink mb-2">{value.title}</h3>
                  <p className="text-sm text-ink-muted">{value.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Open source */}
          <section className="mb-16 p-8 bg-surface border border-rule rounded-2xl">
            <div className="text-center">
              <h2 className="text-2xl font-display font-semibold text-ink mb-4">
                Built in the open
              </h2>
              <p className="text-ink-muted mb-6 max-w-xl mx-auto">
                ConvertKit is open source. We believe transparency builds trust.
                Inspect our code, contribute features, or self-host for your
                organization.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="https://github.com/your-org/convertkit" target="_blank">
                  <Button variant="secondary">
                    View on GitHub
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/developers">
                  <Button variant="ghost">
                    Read the docs
                  </Button>
                </Link>
              </div>
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
