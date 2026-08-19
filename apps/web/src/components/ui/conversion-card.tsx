"use client";

import { useState, useCallback } from "react";
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Loader2,
  RefreshCw,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { FileDropzone } from "./file-dropzone";
import { FileCard } from "./file-card";
import { FormatSelector, type FormatOption } from "./format-selector";
import { ProgressIndicator } from "./progress-indicator";
import { DownloadButton } from "./download-button";
import { Badge } from "./badge";

export interface ConversionResult {
  success: boolean;
  outputUrl?: string;
  outputFilename?: string;
  outputSize?: number;
  error?: string;
}

export interface ConversionCardProps {
  formats: FormatOption[];
  onConvert: (file: File, targetFormat: string) => Promise<ConversionResult>;
  className?: string;
}

type ConversionState = "idle" | "selected" | "converting" | "completed" | "failed";

export function ConversionCard({
  formats,
  onConvert,
  className,
}: ConversionCardProps) {
  const [state, setState] = useState<ConversionState>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState("");
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    setFile(files[0]);
    setState("selected");
    setResult(null);
    setError(null);
  }, []);

  const handleRemoveFile = useCallback(() => {
    setFile(null);
    setTargetFormat("");
    setState("idle");
    setResult(null);
    setError(null);
  }, []);

  const handleConvert = useCallback(async () => {
    if (!file || !targetFormat) return;

    setState("converting");
    setProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      const conversionResult = await onConvert(file, targetFormat);
      clearInterval(progressInterval);

      if (conversionResult.success) {
        setProgress(100);
        setResult(conversionResult);
        setState("completed");
      } else {
        setError(conversionResult.error || "Conversion failed");
        setState("failed");
      }
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "Conversion failed");
      setState("failed");
    }
  }, [file, targetFormat, onConvert]);

  const handleRetry = useCallback(() => {
    setState("selected");
    setProgress(0);
    setError(null);
  }, []);

  const handleConvertAnother = useCallback(() => {
    setFile(null);
    setTargetFormat("");
    setState("idle");
    setProgress(0);
    setResult(null);
    setError(null);
  }, []);

  return (
    <div
      className={cn(
        "bg-surface border border-rule rounded-2xl shadow-soft overflow-hidden",
        className
      )}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-rule">
        <h3 className="text-lg font-semibold text-ink">Convert a file</h3>
        <p className="text-sm text-ink-muted mt-1">
          Drop a file, choose your format, and convert instantly.
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* State: Idle - Show dropzone */}
        {state === "idle" && (
          <FileDropzone
            onFilesSelected={handleFilesSelected}
            multiple={false}
          />
        )}

        {/* State: Selected - Show file + format selector */}
        {state === "selected" && file && (
          <div className="space-y-4">
            <FileCard file={file} onRemove={handleRemoveFile} />

            <FormatSelector
              formats={formats}
              value={targetFormat}
              onChange={setTargetFormat}
            />

            <Button
              onClick={handleConvert}
              disabled={!targetFormat}
              className="w-full"
              size="lg"
            >
              Convert to {targetFormat.toUpperCase() || "..."}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* State: Converting - Show progress */}
        {state === "converting" && file && (
          <div className="space-y-4">
            <FileCard file={file} />

            <div className="flex items-center gap-3 p-4 bg-accent-50 rounded-xl">
              <Loader2 className="w-5 h-5 text-accent-600 animate-spin" />
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">
                  Converting to {targetFormat.toUpperCase()}...
                </p>
                <ProgressIndicator
                  progress={progress}
                  status="processing"
                  showPercentage={true}
                  className="mt-2"
                />
              </div>
            </div>
          </div>
        )}

        {/* State: Completed - Show success + download */}
        {state === "completed" && result && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-success-bg rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-success" />
              <div>
                <p className="text-sm font-medium text-success">
                  Conversion complete
                </p>
                {result.outputFilename && (
                  <p className="text-xs text-success/80 mt-0.5">
                    {result.outputFilename}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {result.outputUrl && (
                <DownloadButton
                  url={result.outputUrl}
                  filename={result.outputFilename}
                  className="flex-1"
                />
              )}
              <Button
                variant="secondary"
                onClick={handleConvertAnother}
              >
                Convert another
              </Button>
            </div>
          </div>
        )}

        {/* State: Failed - Show error */}
        {state === "failed" && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-4 bg-danger-bg rounded-xl">
              <XCircle className="w-5 h-5 text-danger" />
              <div>
                <p className="text-sm font-medium text-danger">
                  Conversion failed
                </p>
                {error && (
                  <p className="text-xs text-danger/80 mt-0.5">{error}</p>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button onClick={handleRetry} className="flex-1">
                <RefreshCw className="w-4 h-4" />
                Try again
              </Button>
              <Button variant="secondary" onClick={handleConvertAnother}>
                Choose another file
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Footer - Always visible */}
      <div className="px-6 py-3 bg-canvas-warm border-t border-rule">
        <div className="flex items-center justify-between text-xs text-ink-faint">
          <span>No signup required for basic conversions</span>
          <Badge variant="success">Free</Badge>
        </div>
      </div>
    </div>
  );
}
