import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

export default function Error500() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} />

      <main className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-lg text-center">
          {/* Illustration */}
          <div className="mb-8">
            <svg
              viewBox="0 0 240 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-xs mx-auto"
              aria-hidden="true"
            >
              <circle cx="120" cy="90" r="80" fill="#F5F4F0" />
              <rect
                x="70"
                y="40"
                width="100"
                height="120"
                rx="8"
                fill="white"
                stroke="#E5E5E5"
                strokeWidth="2"
              />
              <rect x="86" y="60" width="68" height="4" rx="2" fill="#E5E5E5" />
              <rect x="86" y="72" width="52" height="4" rx="2" fill="#E5E5E5" />
              <rect x="86" y="84" width="60" height="4" rx="2" fill="#E5E5E5" />
              <circle cx="150" cy="50" r="20" fill="#AE2012" />
              <text
                x="150"
                y="56"
                textAnchor="middle"
                fill="white"
                fontSize="20"
                fontWeight="600"
                fontFamily="Georgia, serif"
              >
                !
              </text>
            </svg>
          </div>

          <p className="font-mono text-6xl font-bold text-danger mb-4">500</p>

          <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink mb-4">
            Server error
          </h1>
          <p className="text-lg text-ink-muted mb-8 max-w-md mx-auto">
            Something went wrong on our end. Please try again in a moment.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/">
              <Button size="lg">
                <Home className="w-4 h-4" />
                Back to ConvertKit
              </Button>
            </Link>
            <Link href="/convert">
              <Button variant="secondary" size="lg">
                Convert a file
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
