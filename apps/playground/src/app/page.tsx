import { ConversionHub } from "@/components/conversion-hub";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center py-24 px-6 md:px-12">
      <ConversionHub />

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
