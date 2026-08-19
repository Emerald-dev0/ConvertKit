import { ScrollText, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function LogsPage() {
  // Mock logs
  const logs: Array<{
    id: string;
    timestamp: string;
    method: string;
    path: string;
    status: number;
    duration: string;
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">Logs</h1>
          <p className="text-ink-muted mt-1">
            View API request logs and debug information.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button variant="ghost" size="sm">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </div>

      {logs.length === 0 ? (
        <EmptyState
          icon={<ScrollText className="w-8 h-8" />}
          title="No logs yet"
          description="API request logs will appear here once you start making requests."
        />
      ) : (
        <Card>
          <div className="divide-y divide-rule">
            {logs.map((log) => (
              <div key={log.id} className="p-4 hover:bg-canvas-warm">
                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      log.status < 400
                        ? "success"
                        : log.status < 500
                          ? "warning"
                          : "danger"
                    }
                  >
                    {log.status}
                  </Badge>
                  <span className="font-mono text-xs text-ink-muted">
                    {log.method}
                  </span>
                  <span className="font-mono text-xs text-ink">{log.path}</span>
                  <span className="text-xs text-ink-faint ml-auto">
                    {log.duration}
                  </span>
                  <span className="text-xs text-ink-faint">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="mt-6 p-4 bg-surface border border-rule rounded-xl">
        <h3 className="text-sm font-medium text-ink mb-2">Log retention</h3>
        <p className="text-sm text-ink-muted">
          Logs are retained for 7 days on the free plan, 30 days on Pro, and 90
          days on Business.
        </p>
      </div>
    </div>
  );
}
