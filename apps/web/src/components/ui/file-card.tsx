"use client";

import { X, FileImage, FileText, Film, Music, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "./badge";

export interface FileCardProps {
  file: File;
  onRemove?: () => void;
  className?: string;
}

const formatIcons: Record<string, typeof FileImage> = {
  "image/": FileImage,
  "video/": Film,
  "audio/": Music,
  "application/pdf": FileText,
  "text/": FileText,
  "application/json": Database,
  "text/csv": Database,
};

function getFileIcon(type: string) {
  for (const [prefix, Icon] of Object.entries(formatIcons)) {
    if (type.startsWith(prefix)) return Icon;
  }
  return FileText;
}

function formatFileSize(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

function getFileExtension(name: string) {
  return name.split(".").pop()?.toUpperCase() || "";
}

export function FileCard({ file, onRemove, className }: FileCardProps) {
  const Icon = getFileIcon(file.type);
  const ext = getFileExtension(file.name);

  return (
    <div
      className={cn(
        "flex items-center gap-4 p-4 bg-surface border border-rule rounded-xl",
        className
      )}
    >
      <div className="w-12 h-12 rounded-lg bg-canvas-warm flex items-center justify-center flex-shrink-0">
        <Icon className="w-6 h-6 text-ink-muted" />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-ink truncate">{file.name}</p>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="accent">{ext}</Badge>
          <span className="text-xs text-ink-faint">
            {formatFileSize(file.size)}
          </span>
        </div>
      </div>

      {onRemove && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="p-1.5 rounded-lg text-ink-faint hover:text-ink hover:bg-canvas-warm transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label={`Remove ${file.name}`}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
