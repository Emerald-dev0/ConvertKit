import { ConversionHub } from "@/components/conversion-hub";
import { ToolLink } from "@/components/tool-link";
import { Nav } from "@/components/nav";
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
    <main className="min-h-screen bg-[#F7F6F3] flex flex-col items-center py-24 px-6 md:px-12">
      <Nav />
      <div className="pt-20 w-full flex flex-col items-center">
        <ConversionHub
          initialTargetFormat={parsed.to}
          title={<>Convert <span className="text-primary">{from}</span> to <span className="text-primary">{to}</span></>}
          description={`Professional ${from} to ${to} transformation powered by the ConvertKit infrastructure. Fast, deterministic, and high-fidelity.`}
        />
      </div>

      {/* SEO Content Section */}
      <section className="mt-32 max-w-4xl w-full">
         <h2 className="text-2xl font-bold mb-8 text-center">How to convert {from} to {to}</h2>
         <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col gap-4 text-center">
               <div className="text-4xl font-display text-primary/20 font-black">01</div>
               <h4 className="font-bold">Upload</h4>
               <p className="text-muted text-sm leading-relaxed">Drag and drop your {from} file into the converter above.</p>
            </div>
            <div className="flex flex-col gap-4 text-center">
               <div className="text-4xl font-display text-primary/20 font-black">02</div>
               <h4 className="font-bold">Process</h4>
               <p className="text-muted text-sm leading-relaxed">Our universal engine identifies the structure and prepares the transformation.</p>
            </div>
            <div className="flex flex-col gap-4 text-center">
               <div className="text-4xl font-display text-primary/20 font-black">03</div>
               <h4 className="font-bold">Download</h4>
               <p className="text-muted text-sm leading-relaxed">Your high-fidelity {to} file is ready in seconds.</p>
            </div>
         </div>

         <div className="flex flex-col gap-6">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-muted text-center mb-4">Related Tools</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <ToolLink from={parsed.from} to="pdf" />
               <ToolLink from={parsed.from} to="txt" />
               <ToolLink from="png" to={parsed.to} />
               <ToolLink from="jpg" to={parsed.to} />
            </div>
         </div>
      </section>

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
