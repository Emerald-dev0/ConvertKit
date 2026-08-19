import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { ConversionWizard } from "@/components/conversion-wizard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getFormatById, getConversionLookup } from "@/lib/convertkit";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseSlug(slug: string) {
  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;
  return { from: parts[0], to: parts[1] };
}

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

function RelatedConversions({ fromId, toId }: { fromId: string; toId: string }) {
  const conversionLookup = getConversionLookup();

  // Gather related pairs: other conversions from the same source + other conversions to the same target
  const related: { from: string; to: string }[] = [];
  const seen = new Set<string>();

  // Other conversions from this source format
  const sourceTargets = conversionLookup[fromId] || [];
  for (const target of sourceTargets) {
    if (target.to === toId) continue;
    const key = `${fromId}-${target.to}`;
    if (!seen.has(key)) {
      seen.add(key);
      related.push({ from: fromId, to: target.to });
    }
  }

  // Other conversions that can reach this target format
  for (const [srcId, targets] of Object.entries(conversionLookup)) {
    if (srcId === fromId) continue;
    if (targets.some((t) => t.to === toId)) {
      const key = `${srcId}-${toId}`;
      if (!seen.has(key)) {
        seen.add(key);
        related.push({ from: srcId, to: toId });
      }
    }
  }

  // If still few, add some popular conversions from the lookup
  if (related.length < 6) {
    const popularPairs: [string, string][] = [
      ["pdf", "docx"], ["png", "jpg"], ["jpg", "webp"], ["csv", "json"],
      ["mp4", "mp3"], ["xlsx", "pdf"], ["docx", "pdf"], ["md", "html"],
    ];
    for (const [from, to] of popularPairs) {
      if (from === fromId && to === toId) continue;
      const key = `${from}-${to}`;
      if (!seen.has(key) && conversionLookup[from]?.some((t) => t.to === to)) {
        seen.add(key);
        related.push({ from, to });
      }
    }
  }

  if (related.length === 0) return null;

  return (
    <section className="mt-16 md:mt-24">
      <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
        Other conversions
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {related.slice(0, 12).map(({ from, to }) => (
          <Link key={`${from}-${to}`} href={`/convert/${from}-to-${to}`}>
            <Button variant="secondary" size="sm">
              {from.toUpperCase()} → {to.toUpperCase()}
            </Button>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "ConvertKit — Turn Files Into What You Need" };

  const from = parsed.from.toUpperCase();
  const to = parsed.to.toUpperCase();
  return {
    title: `Convert ${from} to ${to} | ConvertKit`,
    description: `Convert ${from} to ${to} online. Free, fast, and private. No signup required.`,
  };
}

export default async function ConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const from = parsed.from.toUpperCase();
  const to = parsed.to.toUpperCase();
  const fromFormat = getFormatById(parsed.from);
  const toFormat = getFormatById(parsed.to);

  // Mock formats for the converter
  const formats = [
    { id: parsed.to, label: toFormat?.name || to, extension: to },
  ];

  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-ink-muted hover:text-ink transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to ConvertKit
          </Link>

          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              {from} → {to}
            </Badge>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-semibold text-ink tracking-tight">
              Convert{" "}
              <span className="text-accent-600">{from}</span> to{" "}
              <span className="text-accent-600">{to}</span>
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-xl mx-auto">
              {fromFormat && toFormat
                ? `Transform ${fromFormat.name} files to ${toFormat.name}. Fast, private, and free.`
                : `Convert ${from} files to ${to} format. Fast, private, and free.`}
            </p>
          </div>

          {/* Converter */}
          <div className="max-w-2xl mx-auto">
            <ConversionWizard
              formats={formats}
            />
          </div>

          {/* How it works */}
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              How it works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  step: "01",
                  title: "Upload",
                  description: `Select or drag your ${from} file into the converter.`,
                },
                {
                  step: "02",
                  title: "Convert",
                  description: `We'll transform it to ${to} using the optimal conversion path.`,
                },
                {
                  step: "03",
                  title: "Download",
                  description: `Get your ${to} file instantly. No signup required.`,
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-12 h-12 rounded-full bg-accent-50 flex items-center justify-center mx-auto mb-4">
                    <span className="font-mono text-sm font-semibold text-accent-600">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm text-ink-muted mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related conversions — derived from the real registry */}
          <RelatedConversions fromId={parsed.from} toId={parsed.to} />

          {/* Privacy note */}
          <section className="mt-16 md:mt-24 p-6 bg-surface border border-rule rounded-xl">
            <div className="text-center">
              <h3 className="font-semibold text-ink">Private by default</h3>
              <p className="text-sm text-ink-muted mt-2 max-w-lg mx-auto">
                Your files are processed locally and never uploaded to external servers.
                Anonymous conversions are not stored. Create an account to save your conversion history.
              </p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
