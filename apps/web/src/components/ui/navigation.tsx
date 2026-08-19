"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface NavItem {
  label: string;
  href: string;
  description?: string;
}

export interface NavigationProps {
  items: NavItem[];
  logo?: React.ReactNode;
  cta?: React.ReactNode;
  showAuth?: boolean;
  className?: string;
}

export function Navigation({
  items,
  logo,
  cta,
  showAuth = true,
  className,
}: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-rule",
        className
      )}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            {logo || (
              <span className="text-xl font-display font-semibold text-ink">
                ConvertKit
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink-muted hover:text-ink transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            {showAuth && (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" size="sm">
                    <LogIn className="w-4 h-4" />
                    Sign in
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="primary" size="sm">
                    <UserPlus className="w-4 h-4" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
            {cta}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-canvas-warm transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div id="mobile-menu" className="md:hidden py-4 border-t border-rule">
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-ink-muted hover:text-ink hover:bg-canvas-warm rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-rule space-y-2">
                {showAuth && (
                  <>
                    <Link href="/sign-in" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">
                        <LogIn className="w-4 h-4" />
                        Sign in
                      </Button>
                    </Link>
                    <Link href="/sign-up" onClick={() => setIsOpen(false)}>
                      <Button variant="primary" className="w-full">
                        <UserPlus className="w-4 h-4" />
                        Sign up free
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
