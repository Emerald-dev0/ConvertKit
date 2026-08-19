import Link from "next/link";
import { GitBranch, ArrowRight, Play, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function WorkflowsPage() {
  // Mock data
  const workflows: Array<{
    id: string;
    name: string;
    inputFormats: string[];
    outputFormat: string;
    options: Record<string, string>;
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">
            Workflows
          </h1>
          <p className="text-ink-muted mt-1">
            Save and reuse your conversion settings.
          </p>
        </div>
      </div>

      {workflows.length === 0 ? (
        <EmptyState
          icon={<GitBranch className="w-8 h-8" />}
          title="No workflows yet"
          description="Create workflows to save your frequently used conversion settings."
          action={
            <Link href="/app/convert">
              <Button>
                Create a workflow
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {workflows.map((workflow) => (
            <Card key={workflow.id}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-medium text-ink">{workflow.name}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    {workflow.inputFormats.map((fmt) => (
                      <Badge key={fmt} variant="accent">
                        {fmt}
                      </Badge>
                    ))}
                    <ArrowRight className="w-3 h-3 text-ink-faint" />
                    <Badge variant="default">{workflow.outputFormat}</Badge>
                  </div>
                </div>
              </div>

              {Object.keys(workflow.options).length > 0 && (
                <div className="mb-4 p-3 bg-canvas-warm rounded-lg">
                  {Object.entries(workflow.options).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-xs">
                      <span className="text-ink-muted">{key}</span>
                      <span className="text-ink font-mono">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" className="flex-1">
                  <Play className="w-4 h-4" />
                  Run
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
