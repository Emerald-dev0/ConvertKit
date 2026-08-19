"use client";

import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "./button";

export interface DownloadButtonProps extends Omit<ButtonProps, "children"> {
  filename?: string;
  url: string;
  variant?: "primary" | "secondary";
  showFilename?: boolean;
}

export function DownloadButton({
  filename,
  url,
  variant = "primary",
  showFilename = true,
  className,
  ...props
}: DownloadButtonProps) {
  return (
    <a href={url} download={filename || undefined} className="inline-flex">
      <Button
        variant={variant}
        className={cn("gap-2", className)}
        {...props}
      >
        <Download className="w-4 h-4" />
        {showFilename && filename ? (
          <span className="truncate max-w-[200px]">{filename}</span>
        ) : (
          "Download"
        )}
      </Button>
    </a>
  );
}
