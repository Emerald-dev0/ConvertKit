import Link from "next/link";
import {
  ArrowRightLeft,
  Clock,
  Layers,
  GitBranch,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function DashboardPage() {
  // Mock data - in production this would come from the database
  const recentConversions: Array<{
    id: string;
    from: string;
    to: string;
    filename: string;
    time: string;
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Welcome back
        </h1>
        <p className="text-ink-muted mt-1">
          What would you like to convert today?
        </p>
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Link href="/app/convert">
          <Card className="hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-50 flex items-center justify-center">
                <ArrowRightLeft className="w-5 h-5 text-accent-600" />
              </div>
              <div>
                <p className="font-medium text-ink">Convert</p>
                <p className="text-xs text-ink-muted">Start a new conversion</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/app/batches">
          <Card className="hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-canvas-warm flex items-center justify-center">
                <Layers className="w-5 h-5 text-ink-muted" />
              </div>
              <div>
                <p className="font-medium text-ink">Batch convert</p>
                <p className="text-xs text-ink-muted">Multiple files at once</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/app/workflows">
          <Card className="hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-canvas-warm flex items-center justify-center">
                <GitBranch className="w-5 h-5 text-ink-muted" />
              </div>
              <div>
                <p className="font-medium text-ink">Workflows</p>
                <p className="text-xs text-ink-muted">Run saved workflows</p>
              </div>
            </div>
          </Card>
        </Link>

        <Link href="/app/history">
          <Card className="hover:shadow-medium transition-all cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-canvas-warm flex items-center justify-center">
                <Clock className="w-5 h-5 text-ink-muted" />
              </div>
              <div>
                <p className="font-medium text-ink">History</p>
                <p className="text-xs text-ink-muted">View past conversions</p>
              </div>
            </div>
          </Card>
        </Link>
      </div>

      {/* Recent conversions */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold text-ink">
            Recent conversions
          </h2>
          <Link
            href="/app/history"
            className="text-sm text-accent-600 hover:text-accent-700"
          >
            View all
          </Link>
        </div>

        {recentConversions.length === 0 ? (
          <EmptyState
            title="No conversions yet"
            description="Your conversion history will appear here. Start by converting a file."
            action={
              <Link href="/app/convert">
                <Button>
                  Convert a file
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            }
          />
        ) : (
          <Card>
            <div className="divide-y divide-rule">
              {recentConversions.map((conv) => (
                <div key={conv.id} className="flex items-center gap-4 py-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="accent">{conv.from}</Badge>
                    <ArrowRight className="w-3 h-3 text-ink-faint" />
                    <Badge variant="default">{conv.to}</Badge>
                  </div>
                  <p className="flex-1 text-sm text-ink truncate">
                    {conv.filename}
                  </p>
                  <span className="text-xs text-ink-faint">{conv.time}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </section>
    </div>
  );
}
