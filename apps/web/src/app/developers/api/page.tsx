import { Code2, Copy, Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const endpoints = [
  {
    method: "POST",
    path: "/api/convert",
    description: "Convert a file to a different format",
    parameters: [
      { name: "file", type: "File", required: true, description: "The file to convert" },
      { name: "targetFormat", type: "string", required: true, description: "Target format (e.g., pdf, docx)" },
    ],
  },
  {
    method: "GET",
    path: "/api/formats",
    description: "List all supported formats",
    parameters: [],
  },
  {
    method: "GET",
    path: "/api/conversions",
    description: "List your conversion history",
    parameters: [
      { name: "limit", type: "number", required: false, description: "Number of results (default: 20)" },
    ],
  },
];

export default function ApiPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          API Reference
        </h1>
        <p className="text-ink-muted mt-1">
          Complete reference for the ConvertKit REST API.
        </p>
      </div>

      {/* Base URL */}
      <Card className="mb-6">
        <h2 className="text-sm font-medium text-ink-faint mb-2">Base URL</h2>
        <code className="font-mono text-sm text-ink bg-canvas-warm px-3 py-2 rounded-lg block">
          https://api.convertkit.cloud/v1
        </code>
      </Card>

      {/* Endpoints */}
      <div className="space-y-4">
        {endpoints.map((endpoint) => (
          <Card key={`${endpoint.method}-${endpoint.path}`}>
            <div className="flex items-center gap-3 mb-3">
              <Badge
                variant={
                  endpoint.method === "GET" ? "success" : "accent"
                }
              >
                {endpoint.method}
              </Badge>
              <code className="font-mono text-sm text-ink">
                {endpoint.path}
              </code>
            </div>
            <p className="text-sm text-ink-muted mb-4">
              {endpoint.description}
            </p>

            {endpoint.parameters.length > 0 && (
              <div>
                <h3 className="text-xs font-medium text-ink-faint uppercase tracking-wider mb-2">
                  Parameters
                </h3>
                <div className="space-y-2">
                  {endpoint.parameters.map((param) => (
                    <div
                      key={param.name}
                      className="flex items-start gap-3 p-2 bg-canvas-warm rounded-lg"
                    >
                      <code className="font-mono text-xs text-accent-600">
                        {param.name}
                      </code>
                      <span className="text-xs text-ink-faint">
                        {param.type}
                      </span>
                      {param.required && (
                        <Badge variant="danger" className="text-[10px]">
                          required
                        </Badge>
                      )}
                      <span className="text-xs text-ink-muted">
                        {param.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
