import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 rounded-full bg-canvas-warm flex items-center justify-center mb-4">
          <div className="text-ink-faint">{icon}</div>
        </div>
      )}

      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 text-sm text-ink-muted max-w-sm">{description}</p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
