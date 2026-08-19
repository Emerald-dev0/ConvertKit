import { BookOpen, Search, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

const docsSections = [
  {
    title: "Getting Started",
    description: "Quick start guide and installation",
    items: [
      { title: "Installation", href: "#" },
      { title: "Quick Start", href: "#" },
      { title: "Configuration", href: "#" },
    ],
  },
  {
    title: "Core Concepts",
    description: "Understanding the conversion engine",
    items: [
      { title: "Converter Registry", href: "#" },
      { title: "Format Detection", href: "#" },
      { title: "Pathfinding", href: "#" },
    ],
  },
  {
    title: "API Reference",
    description: "Complete API documentation",
    items: [
      { title: "REST API", href: "#" },
      { title: "JavaScript SDK", href: "#" },
      { title: "CLI Commands", href: "#" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Documentation
        </h1>
        <p className="text-ink-muted mt-1">
          Learn how to integrate ConvertKit into your application.
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search documentation..."
            className="w-full pl-10 pr-4 py-3 bg-surface border border-rule rounded-lg text-ink placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none"
          />
        </div>
      </div>

      {/* Docs sections */}
      <div className="space-y-6">
        {docsSections.map((section) => (
          <Card key={section.title}>
            <h2 className="text-lg font-display font-semibold text-ink mb-2">
              {section.title}
            </h2>
            <p className="text-sm text-ink-muted mb-4">{section.description}</p>
            <div className="space-y-2">
              {section.items.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between p-3 bg-canvas-warm rounded-lg hover:bg-accent-50 transition-colors"
                >
                  <span className="text-sm text-ink">{item.title}</span>
                  <ChevronRight className="w-4 h-4 text-ink-faint" />
                </a>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
