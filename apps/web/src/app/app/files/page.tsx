import { FolderOpen, Download, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

export default function FilesPage() {
  // Mock data
  const files: Array<{
    id: string;
    name: string;
    format: string;
    size: string;
    date: string;
  }> = [];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">Files</h1>
        <p className="text-ink-muted mt-1">
          Your converted files. Files are stored temporarily.
        </p>
      </div>

      {/* Retention notice */}
      <div className="mb-6 p-4 bg-warning-bg rounded-xl">
        <p className="text-sm text-warning">
          Files are stored for 24 hours after conversion. Download important
          files promptly.
        </p>
      </div>

      {files.length === 0 ? (
        <EmptyState
          icon={<FolderOpen className="w-8 h-8" />}
          title="No files yet"
          description="Converted files will appear here. Files are stored temporarily for download."
        />
      ) : (
        <div className="space-y-2">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center gap-4 p-4 bg-surface border border-rule rounded-xl"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-ink">{file.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="accent">{file.format}</Badge>
                  <span className="text-xs text-ink-faint">{file.size}</span>
                  <span className="text-xs text-ink-faint">{file.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
