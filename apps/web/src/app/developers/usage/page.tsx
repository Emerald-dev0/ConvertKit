import { BarChart3, TrendingUp, FileText, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function UsagePage() {
  // Mock data
  const usage = {
    conversions: 0,
    filesProcessed: 0,
    apiRequests: 0,
    successful: 0,
    failed: 0,
    limits: {
      daily: { used: 0, max: 2 },
      monthly: { used: 0, max: 100 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Usage</h1>
        <p className="text-ink-muted mt-1">
          Monitor your API usage and limits.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total Conversions",
            value: usage.conversions,
            icon: TrendingUp,
          },
          {
            label: "Files Processed",
            value: usage.filesProcessed,
            icon: FileText,
          },
          {
            label: "Successful",
            value: usage.successful,
            icon: CheckCircle,
          },
          {
            label: "Failed",
            value: usage.failed,
            icon: BarChart3,
          },
        ].map((stat) => (
          <Card key={stat.label}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-canvas-warm flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-ink-muted" />
              </div>
              <div>
                <p className="text-sm text-ink-muted">{stat.label}</p>
                <p className="text-2xl font-display font-semibold text-ink">
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Limits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-sm font-medium text-ink-faint mb-4">
            Daily Limit
          </h2>
          <div className="mb-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink">
                {usage.limits.daily.used} / {usage.limits.daily.max}
              </span>
              <span className="text-ink-faint">conversions</span>
            </div>
          </div>
          <div className="h-2 bg-canvas-warm rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full"
              style={{
                width: `${(usage.limits.daily.used / usage.limits.daily.max) * 100}%`,
              }}
            />
          </div>
        </Card>

        <Card>
          <h2 className="text-sm font-medium text-ink-faint mb-4">
            Monthly Limit
          </h2>
          <div className="mb-2">
            <div className="flex justify-between text-sm">
              <span className="text-ink">
                {usage.limits.monthly.used} / {usage.limits.monthly.max}
              </span>
              <span className="text-ink-faint">conversions</span>
            </div>
          </div>
          <div className="h-2 bg-canvas-warm rounded-full overflow-hidden">
            <div
              className="h-full bg-accent-500 rounded-full"
              style={{
                width: `${(usage.limits.monthly.used / usage.limits.monthly.max) * 100}%`,
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
}
