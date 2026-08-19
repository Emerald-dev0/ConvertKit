"use client";

import { useState } from "react";
import { Play, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PlaygroundPage() {
  const [method, setMethod] = useState("POST");
  const [endpoint, setEndpoint] = useState("/api/convert");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    // Mock response
    await new Promise((r) => setTimeout(r, 1000));
    setResponse(
      JSON.stringify(
        {
          success: true,
          outputUrl: "/temp/example-output.pdf",
          format: "pdf",
          pipeline: ["PDF Text Converter"],
        },
        null,
        2
      )
    );
    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Playground
        </h1>
        <p className="text-ink-muted mt-1">
          Test the ConvertKit API interactively.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Request */}
        <Card>
          <h2 className="text-sm font-medium text-ink-faint mb-4">Request</h2>

          <div className="flex gap-2 mb-4">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="px-3 py-2 bg-canvas-warm border border-rule rounded-lg text-sm font-mono"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
            </select>
            <input
              type="text"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
              className="flex-1 px-3 py-2 bg-canvas-warm border border-rule rounded-lg text-sm font-mono"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs text-ink-faint mb-2">
              Headers
            </label>
            <div className="p-3 bg-canvas-warm border border-rule rounded-lg">
              <code className="text-xs text-ink">
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-xs text-ink-faint mb-2">Body</label>
            <textarea
              className="w-full h-32 px-3 py-2 bg-canvas-warm border border-rule rounded-lg text-sm font-mono resize-none"
              placeholder='{"targetFormat": "pdf"}'
            />
          </div>

          <Button onClick={handleRun} disabled={loading} className="w-full">
            {loading ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Running...
              </span>
            ) : (
              <>
                <Play className="w-4 h-4" />
                Send request
              </>
            )}
          </Button>
        </Card>

        {/* Response */}
        <Card>
          <h2 className="text-sm font-medium text-ink-faint mb-4">Response</h2>

          {response ? (
            <div className="relative">
              <pre className="p-4 bg-canvas-warm border border-rule rounded-lg overflow-x-auto">
                <code className="text-xs text-ink">{response}</code>
              </pre>
              <button
                onClick={() => navigator.clipboard.writeText(response)}
                className="absolute top-2 right-2 p-1.5 bg-surface border border-rule rounded-lg hover:bg-canvas-warm"
              >
                <Copy className="w-3 h-3 text-ink-faint" />
              </button>
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center bg-canvas-warm border border-rule rounded-lg">
              <p className="text-sm text-ink-faint">
                Send a request to see the response
              </p>
            </div>
          )}
        </Card>
      </div>

      {/* Code examples */}
      <Card className="mt-6">
        <h2 className="text-sm font-medium text-ink-faint mb-4">
          Code examples
        </h2>
        <div className="space-y-3">
          {[
            {
              label: "cURL",
              code: `curl -X POST https://api.convertkit.cloud/v1/api/convert \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "file=@document.pdf" \\
  -F "targetFormat=docx"`,
            },
            {
              label: "JavaScript",
              code: `const response = await fetch('https://api.convertkit.cloud/v1/api/convert', {
  method: 'POST',
  headers: { 'Authorization': 'Bearer YOUR_API_KEY' },
  body: formData
});`,
            },
          ].map((example) => (
            <div key={example.label} className="p-3 bg-canvas-warm rounded-lg">
              <p className="text-xs text-ink-faint mb-2">{example.label}</p>
              <code className="text-xs text-ink">{example.code}</code>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
