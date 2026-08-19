import { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { Navigation } from "@/components/ui/navigation";
import { Footer } from "@/components/ui/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Pricing | ConvertKit",
  description:
    "Simple, transparent pricing. Start free, upgrade when you need more.",
};

const navItems = [
  { label: "Convert", href: "/convert" },
  { label: "Formats", href: "/formats" },
  { label: "Developers", href: "/developers" },
  { label: "Pricing", href: "/pricing" },
];

const plans = [
  {
    name: "Free",
    description: "For occasional use",
    features: [
      "Basic conversions",
      "5 MB file size limit",
      "2 conversions per day",
      "All supported formats",
      "No signup required",
    ],
    cta: "Start converting",
    ctaHref: "/convert",
    variant: "secondary" as const,
  },
  {
    name: "Pro",
    description: "For regular use",
    features: [
      "Everything in Free",
      "Larger files (50 MB)",
      "Unlimited conversions",
      "Conversion history",
      "Saved workflows",
      "No ads",
      "Priority support",
    ],
    cta: "Coming soon",
    ctaHref: "#",
    variant: "primary" as const,
    badge: "Popular",
  },
  {
    name: "Business",
    description: "For teams and businesses",
    features: [
      "Everything in Pro",
      "API access",
      "Higher usage limits",
      "Webhooks",
      "Team accounts",
      "Analytics dashboard",
      "Priority processing",
    ],
    cta: "Contact sales",
    ctaHref: "#",
    variant: "secondary" as const,
  },
  {
    name: "Enterprise",
    description: "For large organizations",
    features: [
      "Everything in Business",
      "Custom limits",
      "Dedicated support",
      "Custom integrations",
      "SLA guarantee",
      "On-premise deployment",
      "Security compliance",
    ],
    cta: "Contact sales",
    ctaHref: "#",
    variant: "secondary" as const,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navigation items={navItems} />

      <main className="py-12 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-4">
              Pricing
            </Badge>
            <h1 className="text-4xl md:text-5xl font-display font-semibold text-ink tracking-tight">
              Simple, transparent pricing
            </h1>
            <p className="mt-4 text-lg text-ink-muted max-w-2xl mx-auto">
              Start converting for free. Upgrade when you need more power.
            </p>
          </div>

          {/* Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.badge ? "border-accent-200 shadow-medium relative" : ""
                }
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="accent">{plan.badge}</Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-display font-semibold text-ink">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-ink-muted mt-1">
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-ink">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link href={plan.ctaHref}>
                  <Button variant={plan.variant} className="w-full">
                    {plan.cta}
                    {plan.variant === "primary" && (
                      <ArrowRight className="w-4 h-4" />
                    )}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          {/* FAQ */}
          <section className="mt-16 md:mt-24">
            <h2 className="text-2xl font-display font-semibold text-ink text-center mb-8">
              Frequently asked questions
            </h2>
            <div className="max-w-2xl mx-auto space-y-6">
              {[
                {
                  q: "Is there really no signup required?",
                  a: "Correct. You can convert files without creating an account. We only ask for signup when you want to save history or use advanced features.",
                },
                {
                  q: "What file size limits apply?",
                  a: "Free users can convert files up to 5 MB. Pro users get 50 MB. Business and Enterprise have custom limits.",
                },
                {
                  q: "Can I use ConvertKit commercially?",
                  a: "Yes. Our API and SDKs are designed for commercial use. See our Business and Enterprise plans for higher limits.",
                },
                {
                  q: "Is my data private?",
                  a: "Yes. Files are processed locally by default. We don't store your files unless you explicitly enable cloud storage.",
                },
              ].map((faq) => (
                <div
                  key={faq.q}
                  className="p-6 bg-surface border border-rule rounded-xl"
                >
                  <h3 className="font-semibold text-ink mb-2">{faq.q}</h3>
                  <p className="text-sm text-ink-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
