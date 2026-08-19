"use client";

import { ConversionCard } from "@/components/ui/conversion-card";
import type { FormatOption } from "@/components/ui/format-selector";

// Mock formats - in production this would come from the registry
const formats: FormatOption[] = [
  { id: "pdf", label: "PDF Document", extension: "pdf" },
  { id: "docx", label: "Word Document", extension: "docx" },
  { id: "png", label: "PNG Image", extension: "png" },
  { id: "jpg", label: "JPEG Image", extension: "jpg" },
  { id: "webp", label: "WebP Image", extension: "webp" },
  { id: "mp4", label: "MP4 Video", extension: "mp4" },
  { id: "mp3", label: "MP3 Audio", extension: "mp3" },
  { id: "csv", label: "CSV Data", extension: "csv" },
  { id: "json", label: "JSON Data", extension: "json" },
];

export default function ConvertPage() {
  const handleConvert = async (file: File, targetFormat: string) => {
    // In production this would call /api/convert
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return {
      success: true,
      outputUrl: "#",
      outputFilename: `${file.name.split(".")[0]}.${targetFormat}`,
      outputSize: file.size,
    };
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Convert a file
        </h1>
        <p className="text-ink-muted mt-1">
          Drop a file, choose your format, and convert instantly.
        </p>
      </div>

      <ConversionCard formats={formats} onConvert={handleConvert} />
    </div>
  );
}
