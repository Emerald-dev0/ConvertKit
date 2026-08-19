import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  progress: number; // 0-100
  status?: "processing" | "success" | "error" | "idle";
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressIndicator({
  progress,
  status = "processing",
  label,
  showPercentage = true,
  className,
}: ProgressIndicatorProps) {
  const statusColors = {
    idle: "bg-rule",
    processing: "bg-accent-500",
    success: "bg-success",
    error: "bg-danger",
  };

  return (
    <div className={cn("space-y-2", className)}>
      {(label || showPercentage) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-sm text-ink-muted">{label}</span>}
          {showPercentage && (
            <span className="text-sm font-mono text-ink-faint">
              {Math.round(progress)}%
            </span>
          )}
        </div>
      )}

      <div className="h-2 bg-canvas-warm rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out",
            statusColors[status],
            status === "processing" && "animate-pulse-subtle"
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>

      {status === "success" && (
        <p className="text-xs text-success font-medium">Conversion complete</p>
      )}
      {status === "error" && (
        <p className="text-xs text-danger font-medium">Conversion failed</p>
      )}
    </div>
  );
}
