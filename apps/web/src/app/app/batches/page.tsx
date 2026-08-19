import Link from "next/link";
import { Layers, ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

export default function BatchesPage() {
  // Mock data
  const batches: Array<{
    id: string;
    name: string;
    fileCount: number;
    completed: number;
    status: "processing" | "completed" | "failed";
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">
            Batch conversion
          </h1>
          <p className="text-ink-muted mt-1">
            Convert multiple files at once.
          </p>
        </div>
        <Link href="/app/convert">
          <Button>
            <Plus className="w-4 h-4" />
            New batch
          </Button>
        </Link>
      </div>

      {batches.length === 0 ? (
        <EmptyState
          icon={<Layers className="w-8 h-8" />}
          title="No batches yet"
          description="Start a batch conversion to process multiple files at once."
          action={
            <Link href="/app/convert">
              <Button>
                Start a batch
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="space-y-4">
          {batches.map((batch) => (
            <Card key={batch.id}>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-ink">{batch.name}</h3>
                  <p className="text-sm text-ink-muted mt-1">
                    {batch.fileCount} files
                  </p>
                </div>
                <Badge
                  variant={
                    batch.status === "completed"
                      ? "success"
                      : batch.status === "failed"
                      ? "danger"
                      : "accent"
                  }
                >
                  {batch.status}
                </Badge>
              </div>
              {batch.status === "processing" && (
                <ProgressIndicator
                  progress={(batch.completed / batch.fileCount) * 100}
                  status="processing"
                  className="mt-4"
                />
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
