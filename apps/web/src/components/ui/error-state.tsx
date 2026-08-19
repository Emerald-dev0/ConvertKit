import { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export interface ErrorStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  error?: string;
  onRetry?: () => void;
  onChooseAnother?: () => void;
  className?: string;
}

export function ErrorState({
  icon,
  title,
  description,
  error,
  onRetry,
  onChooseAnother,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      <div className="w-16 h-16 rounded-full bg-danger-bg flex items-center justify-center mb-4">
        {icon || <AlertTriangle className="w-7 h-7 text-danger" />}
      </div>

      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted max-w-sm">{description}</p>

      {error && (
        <div className="mt-4 p-3 bg-canvas-warm rounded-lg max-w-sm">
          <p className="text-xs font-mono text-ink-faint">{error}</p>
        </div>
      )}

      {(onRetry || onChooseAnother) && (
        <div className="flex items-center gap-3 mt-6">
          {onRetry && (
            <Button variant="primary" onClick={onRetry}>
              Try again
            </Button>
          )}
          {onChooseAnother && (
            <Button variant="secondary" onClick={onChooseAnother}>
              Choose another file
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
