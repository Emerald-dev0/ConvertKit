import { ConversionHub } from "@/components/conversion-hub";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function parseSlug(slug: string) {
  const parts = slug.split("-to-");
  if (parts.length !== 2) return null;
  return { from: parts[0], to: parts[1] };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) return { title: "ConvertKit | Universal Engine" };

  const from = parsed.from.toUpperCase();
  const to = parsed.to.toUpperCase();

  return {
    title: `Convert ${from} to ${to} | ConvertKit`,
    description: `High-fidelity ${from} to ${to} conversion powered by the ConvertKit Universal Engine. Open-source, local-first, and secure.`,
    openGraph: {
      title: `Free ${from} to ${to} Converter`,
      description: `Fast and reliable ${from} to ${to} conversion using industrial-grade engines.`,
    }
  };
}

export default async function ConversionPage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  const from = parsed.from.toUpperCase();
  const to = parsed.to.toUpperCase();

  return (
    <main className="min-h-screen flex flex-col items-center py-24 px-6 md:px-12">
      <ConversionHub
        initialTargetFormat={parsed.to}
        title={<>Convert <span className="text-primary">{from}</span> to <span className="text-primary">{to}</span></>}
        description={`Professional ${from} to ${to} transformation powered by the ConvertKit infrastructure. Fast, deterministic, and high-fidelity.`}
      />

      {/* Technical Footer */}
      <footer className="mt-32 max-w-4xl w-full border-t border-[#EAEAEA] pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-xs font-mono uppercase tracking-widest text-muted">
        <div>@convertkit/core v0.1.0</div>
        <div className="flex gap-8">
          <a href="#" className="hover:text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-primary transition-colors">Documentation</a>
          <a href="#" className="hover:text-primary transition-colors">NACOS OAU</a>
        </div>
      </footer>
    </main>
  );
}
