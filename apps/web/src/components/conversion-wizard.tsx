"use client";

import { ConversionCard } from "@/components/ui/conversion-card";
import type { FormatOption } from "@/components/ui/format-selector";

interface ConversionWizardProps {
  formats: FormatOption[];
}

export function ConversionWizard({ formats }: ConversionWizardProps) {
  const handleConvert = async (file: File, targetFormat: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("targetFormat", targetFormat);

    try {
      const response = await fetch("/api/convert", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const error = await response.json();
        return { success: false, error: error.error || "Conversion failed" };
      }

      const result = await response.json();
      return {
        success: true,
        outputUrl: result.outputUrl,
        outputFilename: result.outputFilename || `${file.name.split(".")[0]}.${targetFormat}`,
        outputSize: result.outputSize || file.size,
      };
    } catch {
      return { success: false, error: "Network error. Please try again." };
    }
  };

  return <ConversionCard formats={formats} onConvert={handleConvert} />;
}
