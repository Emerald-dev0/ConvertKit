"use client";

import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormatOption {
  id: string;
  label: string;
  extension: string;
  description?: string;
}

export interface FormatSelectorProps {
  formats: FormatOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export function FormatSelector({
  formats,
  value,
  onChange,
  label = "Convert to",
  disabled = false,
  className,
}: FormatSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const selected = formats.find((f) => f.id === value);

  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="block text-sm font-medium text-ink-light">{label}</label>

      <div className="relative">
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "w-full flex items-center justify-between gap-3 px-4 py-3 bg-surface border border-rule rounded-lg text-left transition-all",
            "hover:border-rule-dark focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none",
            disabled && "opacity-50 cursor-not-allowed",
            isOpen && "border-accent-500 ring-2 ring-accent-100"
          )}
        >
          {selected ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-medium uppercase tracking-tight text-accent-600">
                {selected.extension}
              </span>
              <span className="text-sm text-ink">{selected.label}</span>
            </div>
          ) : (
            <span className="text-sm text-ink-faint">Select format</span>
          )}
          <ChevronDown
            className={cn(
              "w-4 h-4 text-ink-faint transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-surface border border-rule rounded-lg shadow-large overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              {formats.map((format) => (
                <button
                  key={format.id}
                  type="button"
                  onClick={() => {
                    onChange(format.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    format.id === value
                      ? "bg-accent-50 text-accent-700"
                      : "hover:bg-canvas-warm text-ink"
                  )}
                >
                  <span className="font-mono text-xs font-medium uppercase tracking-tight text-ink-muted w-12">
                    {format.extension}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{format.label}</p>
                    {format.description && (
                      <p className="text-xs text-ink-faint mt-0.5">
                        {format.description}
                      </p>
                    )}
                  </div>
                  {format.id === value && (
                    <Check className="w-4 h-4 text-accent-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
