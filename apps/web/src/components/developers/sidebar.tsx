"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  Code2,
  Terminal,
  Key,
  BarChart3,
  Webhook,
  ScrollText,
  Puzzle,
  Gauge,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Overview", href: "/developers", icon: Gauge },
  { label: "Documentation", href: "/developers/docs", icon: BookOpen },
  { label: "API Reference", href: "/developers/api", icon: Code2 },
  { label: "Playground", href: "/developers/playground", icon: Terminal },
  { label: "API Keys", href: "/developers/api-keys", icon: Key },
  { label: "Usage", href: "/developers/usage", icon: BarChart3 },
  { label: "Webhooks", href: "/developers/webhooks", icon: Webhook },
  { label: "Logs", href: "/developers/logs", icon: ScrollText },
  { label: "SDKs", href: "/developers/sdks", icon: Puzzle },
  { label: "CLI", href: "/developers/cli", icon: Terminal },
];

export function DeveloperSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-rule h-screen flex flex-col">
      <div className="px-6 py-4 border-b border-rule">
        <Link
          href="/developers"
          className="text-lg font-display font-semibold text-ink"
        >
          Developer
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => {
          const isActive =
            item.href === "/developers"
              ? pathname === "/developers"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-accent-50 text-accent-700"
                  : "text-ink-muted hover:text-ink hover:bg-canvas-warm"
              )}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
