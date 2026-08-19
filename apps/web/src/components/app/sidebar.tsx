"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ArrowRightLeft,
  Clock,
  FolderOpen,
  Layers,
  GitBranch,
  Star,
  Settings,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { label: "Overview", href: "/app", icon: LayoutDashboard },
  { label: "Convert", href: "/app/convert", icon: ArrowRightLeft },
  { label: "History", href: "/app/history", icon: Clock },
  { label: "Files", href: "/app/files", icon: FolderOpen },
  { label: "Batches", href: "/app/batches", icon: Layers },
  { label: "Workflows", href: "/app/workflows", icon: GitBranch },
  { label: "Favorites", href: "/app/favorites", icon: Star },
];

const bottomItems = [
  { label: "Settings", href: "/app/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-rule h-screen flex flex-col">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-rule">
        <Link href="/" className="text-lg font-display font-semibold text-ink">
          ConvertKit
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive =
            item.href === "/app"
              ? pathname === "/app"
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

      {/* Bottom items */}
      <div className="px-3 py-4 border-t border-rule space-y-1">
        {bottomItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
              pathname === item.href
                ? "bg-accent-50 text-accent-700"
                : "text-ink-muted hover:text-ink hover:bg-canvas-warm"
            )}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}

        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-ink-muted hover:text-ink hover:bg-canvas-warm transition-colors">
          <LogOut className="w-5 h-5" />
          Sign out
        </button>
      </div>
    </aside>
  );
}
