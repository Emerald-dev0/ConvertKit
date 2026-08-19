import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-canvas-warm rounded-lg",
        className
      )}
      aria-hidden="true"
    />
  );
}

export function FormatCardSkeleton() {
  return (
    <div className="bg-surface border border-rule rounded-xl p-6">
      <div className="flex items-start gap-4">
        <Skeleton className="w-10 h-10 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
            <Skeleton className="h-6 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ConversionPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Converter card */}
      <div className="bg-surface border border-rule rounded-2xl p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-40 w-full rounded-xl" />
        <div className="flex gap-4">
          <Skeleton className="h-12 flex-1 rounded-lg" />
          <Skeleton className="h-12 w-40 rounded-lg" />
        </div>
      </div>

      {/* Related conversions */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormatDetailSkeleton() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-5 w-96" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Convert to section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>

      {/* Convert from section */}
      <div className="space-y-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-16 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

export function FormatListSkeleton() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-5 w-96" />
      </div>

      {/* Categories */}
      {[1, 2, 3, 4].map((cat) => (
        <div key={cat} className="space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-20 rounded-xl" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
