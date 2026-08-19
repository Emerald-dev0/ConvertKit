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

export default function NotFound() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} showAuth={true} />

      <main className="flex flex-col items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-lg text-center">
          {/* Custom illustration */}
          <div className="mb-8">
            <svg
              viewBox="0 0 240 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full max-w-xs mx-auto"
              aria-hidden="true"
            >
              {/* Background circle */}
              <circle cx="120" cy="90" r="80" fill="#F5F4F0" />

              {/* Main document */}
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

              {/* Document lines (content) */}
              <rect x="86" y="60" width="68" height="4" rx="2" fill="#E5E5E5" />
              <rect x="86" y="72" width="52" height="4" rx="2" fill="#E5E5E5" />
              <rect x="86" y="84" width="60" height="4" rx="2" fill="#E5E5E5" />
              <rect x="86" y="96" width="44" height="4" rx="2" fill="#E5E5E5" />

              {/* Question mark circle */}
              <circle cx="150" cy="50" r="20" fill="#E07A5F" />
              <text
                x="150"
                y="56"
                textAnchor="middle"
                fill="white"
                fontSize="24"
                fontWeight="600"
                fontFamily="Georgia, serif"
              >
                ?
              </text>

              {/* Floating pieces (transformation concept) */}
              <rect
                x="40"
                y="70"
                width="20"
                height="16"
                rx="3"
                fill="#E07A5F"
                opacity="0.2"
                transform="rotate(-15 50 78)"
              />
              <rect
                x="180"
                y="100"
                width="16"
                height="12"
                rx="3"
                fill="#E07A5F"
                opacity="0.15"
                transform="rotate(10 188 106)"
              />
              <circle cx="50" cy="120" r="6" fill="#E07A5F" opacity="0.1" />
              <circle cx="190" cy="60" r="8" fill="#E07A5F" opacity="0.1" />

              {/* Subtle arrows (transformation) */}
              <path
                d="M60 140 L80 130"
                stroke="#E07A5F"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
              />
              <path
                d="M160 140 L180 130"
                stroke="#E07A5F"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
              />
            </svg>
          </div>

          {/* 404 number */}
          <p className="font-mono text-6xl font-bold text-accent-500 mb-4">
            404
          </p>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-display font-semibold text-ink mb-4">
            Page not found
          </h1>

          {/* Description */}
          <p className="text-lg text-ink-muted mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
            Let's get you back to converting files.
          </p>

          {/* Actions */}
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

          {/* Helpful links */}
          <div className="mt-12 pt-8 border-t border-rule">
            <p className="text-sm text-ink-faint mb-4">Popular conversions</p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                ["pdf", "docx"],
                ["png", "jpg"],
                ["jpg", "webp"],
                ["csv", "json"],
                ["mp4", "mp3"],
              ].map(([from, to]) => (
                <Link
                  key={`${from}-${to}`}
                  href={`/convert/${from}-to-${to}`}
                  className="text-sm font-mono text-ink-muted hover:text-accent-600 transition-colors px-3 py-1.5 bg-canvas-warm rounded-lg hover:bg-accent-50"
                >
                  {from.toUpperCase()} → {to.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
