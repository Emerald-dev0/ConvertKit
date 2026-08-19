import Link from "next/link";
import { cn } from "@/lib/utils";

export interface FooterProps {
  className?: string;
}

const footerLinks = {
  product: [
    { label: "Convert", href: "/convert" },
    { label: "Formats", href: "/formats" },
    { label: "Pricing", href: "/pricing" },
    { label: "Workflows", href: "/workflows" },
  ],
  developers: [
    { label: "Documentation", href: "/developers/docs" },
    { label: "API", href: "/developers/api" },
    { label: "CLI", href: "/developers/cli" },
    { label: "SDKs", href: "/developers/sdks" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Open Source", href: "/open-source" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
};

export function Footer({ className }: FooterProps) {
  return (
    <footer
      className={cn(
        "bg-surface border-t border-rule",
        className
      )}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Product */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Developers */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Developers</h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-ink mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted hover:text-ink transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-rule">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-lg font-display font-semibold text-ink">
                ConvertKit
              </span>
              <span className="text-xs text-ink-faint">
                Open-source file conversion
              </span>
            </div>
            <p className="text-xs text-ink-faint">
              &copy; {new Date().getFullYear()} ConvertKit. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
