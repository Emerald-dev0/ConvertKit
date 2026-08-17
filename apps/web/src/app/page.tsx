import { ConversionHub } from "@/components/conversion-hub";
import { ToolLink } from "@/components/tool-link";
import {
  ShieldCheck,
  Zap,
  Lock,
  FileStack,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full border-b border-[#EAEAEA] bg-white/80 backdrop-blur-md z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-mono text-lg">C</div>
            ConvertKit
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted">
            <Link href="#features" className="hover:text-foreground transition-colors">Features</Link>
            <Link href="#conversions" className="hover:text-foreground transition-colors">Tools</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Pricing</Link>
            <Link href="https://github.com/Emerald-dev0/ConvertKit" className="hover:text-foreground transition-colors">GitHub</Link>
          </div>
          <button className="bg-foreground text-white px-5 py-2 rounded-md text-sm font-bold hover:bg-[#333333] transition-all active:scale-95">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 px-6">
        <ConversionHub />
      </section>

      {/* Trust Bar */}
      <div className="max-w-4xl mx-auto border-y border-[#EAEAEA] py-8 flex flex-wrap justify-center gap-12 grayscale opacity-50">
         <span className="font-mono uppercase tracking-widest text-xs">PDF.js</span>
         <span className="font-mono uppercase tracking-widest text-xs">Sharp</span>
         <span className="font-mono uppercase tracking-widest text-xs">FFmpeg</span>
         <span className="font-mono uppercase tracking-widest text-xs">Tesseract</span>
         <span className="font-mono uppercase tracking-widest text-xs">LibreOffice</span>
      </div>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Built for Reliability.</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">
              ConvertKit is not just another website. It is an industrial-grade orchestration layer
              built on the world\u0027s most trusted conversion engines.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Lock className="text-blue-600" />}
              title="Local-First Security"
              description="All conversions run on your infrastructure. No file ever leaves your environment, ensuring 100% privacy."
            />
            <FeatureCard
              icon={<Zap className="text-orange-600" />}
              title="Intelligent Pathfinding"
              description="Our BFS-based engine automatically chains converters to solve complex multi-step transformations."
            />
            <FeatureCard
              icon={<ShieldCheck className="text-green-600" />}
              title="Deterministic Output"
              description="Built on standard-compliant engines like FFmpeg and PDF.js, ensuring predictable, high-fidelity results."
            />
          </div>
        </div>
      </section>

      {/* Conversion Hub / SEO Grid */}
      <section id="conversions" className="py-32 px-6 bg-[#FBFBFA]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12 border-b border-[#EAEAEA] pb-6 flex items-center gap-3">
            <FileStack className="text-primary" />
            Conversion Utilities
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <ToolLink from="pdf" to="txt" />
            <ToolLink from="png" to="jpg" />
            <ToolLink from="jpg" to="webp" />
            <ToolLink from="md" to="html" />
            <ToolLink from="csv" to="json" />
            <ToolLink from="xlsx" to="pdf" />
            <ToolLink from="docx" to="pdf" />
            <ToolLink from="mp3" to="mp4" />
          </div>
        </div>
      </section>

      {/* Pricing Section (Shell) */}
      <section id="pricing" className="py-32 px-6 bg-white border-t border-[#EAEAEA]">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-16">Simple, Developer-Friendly.</h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
             <div className="document-card rounded-xl p-12 text-left border-2 border-primary/20">
                <h3 className="text-2xl font-bold mb-2">Open Source</h3>
                <p className="text-muted mb-8 italic">Self-host forever.</p>
                <div className="text-5xl font-display font-bold mb-8">$0</div>
                <ul className="space-y-4 text-sm mb-12">
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Core Engine \u0026 SDK</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> CLI Terminal Tool</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Standard Converters</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Community Support</li>
                </ul>
                <Link href="https://github.com/Emerald-dev0/ConvertKit" className="block text-center border border-foreground py-3 rounded-lg font-bold hover:bg-foreground hover:text-white transition-all">
                  Fork on GitHub
                </Link>
             </div>
             <div className="document-card rounded-xl p-12 text-left bg-foreground text-white">
                <div className="flex justify-between items-center mb-2">
                   <h3 className="text-2xl font-bold">Pro Platform</h3>
                   <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">Coming Soon</span>
                </div>
                <p className="text-gray-400 mb-8 italic">Zero infra management.</p>
                <div className="text-5xl font-display font-bold mb-8">$19<span className="text-lg font-normal text-gray-500">/mo</span></div>
                <ul className="space-y-4 text-sm mb-12">
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Managed Infrastructure</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Advanced AI Extraction</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> High-Scale Batch Processing</li>
                   <li className="flex items-center gap-2"><CheckCircle size={16} className="text-primary" /> Team API Keys</li>
                </ul>
                <button className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
                  Join Waitlist
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Professional Footer */}
      <footer className="bg-foreground text-[#F7F6F3] py-24 px-6 border-t border-[#333333]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
             <div className="flex items-center gap-2 font-display text-2xl font-bold mb-6">
                <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-mono text-lg text-white">C</div>
                ConvertKit
             </div>
             <p className="text-gray-400 text-sm leading-relaxed">
               Providing reliable, high-performance file conversion infrastructure
               for developers around the world.
             </p>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Engine</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
               <Link href="/convert/pdf-to-txt" className="hover:text-white transition-colors">PDF Extraction</Link>
               <Link href="/convert/png-to-jpg" className="hover:text-white transition-colors">Image Processing</Link>
               <Link href="/convert/mp3-to-mp4" className="hover:text-white transition-colors">Multimedia</Link>
               <Link href="/convert/csv-to-json" className="hover:text-white transition-colors">Data Transformation</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Resources</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
               <Link href="#" className="hover:text-white transition-colors">Documentation</Link>
               <Link href="#" className="hover:text-white transition-colors">CLI Reference</Link>
               <Link href="#" className="hover:text-white transition-colors">API Keys</Link>
               <Link href="https://github.com/Emerald-dev0/ConvertKit" className="hover:text-white transition-colors">Source Code</Link>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-sm uppercase tracking-widest text-primary">Company</h4>
            <div className="flex flex-col gap-4 text-sm text-gray-400">
               <Link href="#" className="hover:text-white transition-colors">About Us</Link>
               <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
               <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
               <span className="text-xs mt-4 text-gray-600">Built by @Emerald-dev0</span>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-[#333333] pt-8 flex justify-between items-center text-[10px] font-mono uppercase tracking-[0.2em] text-gray-600">
           <div>\u00a9 2026 ConvertKit Universal Engine.</div>
           <div>v0.1.0-STABLE</div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="document-card rounded-xl p-10 flex flex-col gap-6">
      <div className="p-3 bg-[#F7F6F3] rounded-lg w-fit">
        {icon}
      </div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-muted text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function CheckCircle({ size, className }: { size: number, className?: string }) {
  return (
    <div className={`w-${size} h-${size} bg-primary/10 rounded-full flex items-center justify-center ${className}`}>
      <div className="w-1 h-1 bg-primary rounded-full" />
    </div>
  );
}
