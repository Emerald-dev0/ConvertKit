import { Search, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function HistoryPage() {
  // Mock data
  const history: Array<{
    id: string;
    from: string;
    to: string;
    filename: string;
    date: string;
    size: string;
    status: "success" | "failed";
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">
            Conversion history
          </h1>
          <p className="text-ink-muted mt-1">
            View and download your past conversions.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" />
          <input
            type="text"
            placeholder="Search conversions..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface border border-rule rounded-lg text-sm text-ink placeholder:text-ink-faint focus:border-accent-500 focus:ring-2 focus:ring-accent-100 focus:outline-none"
          />
        </div>
      </div>

      {history.length === 0 ? (
        <EmptyState
          title="No conversion history"
          description="Your past conversions will appear here. Start by converting a file."
          action={
            <Button onClick={() => (window.location.href = "/app/convert")}>
              Convert a file
            </Button>
          }
        />
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-rule">
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    Format
                  </th>
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    File
                  </th>
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    Date
                  </th>
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    Size
                  </th>
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    Status
                  </th>
                  <th className="pb-3 text-xs font-medium text-ink-faint uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {history.map((item) => (
                  <tr key={item.id} className="hover:bg-canvas-warm">
                    <td className="py-3">
                      <div className="flex items-center gap-1">
                        <Badge variant="accent">{item.from}</Badge>
                        <ArrowRight className="w-3 h-3 text-ink-faint" />
                        <Badge variant="default">{item.to}</Badge>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-ink truncate max-w-[200px]">
                      {item.filename}
                    </td>
                    <td className="py-3 text-sm text-ink-muted">{item.date}</td>
                    <td className="py-3 text-sm text-ink-muted">{item.size}</td>
                    <td className="py-3">
                      <Badge
                        variant={item.status === "success" ? "success" : "danger"}
                      >
                        {item.status}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
}
