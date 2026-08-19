"use client";

import { useCallback, useState, useRef, type DragEvent } from "react";
import { Upload } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FileDropzone({
  onFilesSelected,
  accept,
  multiple = false,
  disabled = false,
  className,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragIn = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragOut = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (disabled) return;

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        onFilesSelected(multiple ? files : [files[0]]);
      }
    },
    [disabled, multiple, onFilesSelected]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        onFilesSelected(multiple ? files : [files[0]]);
      }
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    },
    [multiple, onFilesSelected]
  );

  return (
    <div
      onDragEnter={handleDragIn}
      onDragLeave={handleDragOut}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "relative flex flex-col items-center justify-center gap-4 p-12 border-2 border-dashed rounded-xl transition-all cursor-pointer",
        isDragging
          ? "border-accent-500 bg-accent-50"
          : "border-rule hover:border-accent-300 hover:bg-canvas-warm",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
        disabled={disabled}
      />

      <div
        className={cn(
          "w-16 h-16 rounded-full flex items-center justify-center transition-colors",
          isDragging ? "bg-accent-100" : "bg-canvas-warm"
        )}
      >
        <Upload
          className={cn(
            "w-7 h-7 transition-colors",
            isDragging ? "text-accent-600" : "text-ink-faint"
          )}
        />
      </div>

      <div className="text-center">
        <p className="text-lg font-medium text-ink">
          {isDragging ? "Drop your file here" : "Drop files here"}
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          or click to browse from your device
        </p>
      </div>

      {accept && (
        <p className="text-xs text-ink-faint">
          Accepted formats: {accept.split(",").join(", ")}
        </p>
      )}
    </div>
  );
}
