import { Card } from "@/components/ui/card";

const commands = [
  {
    command: "convertkit convert <input> <format>",
    description: "Convert a file to the specified format",
    example: "convertkit convert document.pdf docx",
  },
  {
    command: "convertkit detect <file>",
    description: "Detect the format of a file",
    example: "convertkit detect mystery-file",
  },
  {
    command: "convertkit list",
    description: "List all supported formats",
    example: "convertkit list",
  },
  {
    command: "convertkit inspect <file>",
    description: "Inspect file details and capabilities",
    example: "convertkit inspect document.pdf",
  },
];

export default function CliPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">CLI</h1>
        <p className="text-ink-muted mt-1">
          Command-line interface for ConvertKit.
        </p>
      </div>

      {/* Installation */}
      <Card className="mb-6">
        <h2 className="text-sm font-medium text-ink-faint mb-3">
          Installation
        </h2>
        <div className="p-3 bg-canvas-warm rounded-lg">
          <code className="font-mono text-sm text-ink">
            npm install -g @convertkit/cli
          </code>
        </div>
      </Card>

      {/* Commands */}
      <h2 className="text-lg font-display font-semibold text-ink mb-4">
        Commands
      </h2>
      <div className="space-y-4">
        {commands.map((cmd) => (
          <Card key={cmd.command}>
            <code className="font-mono text-sm text-accent-600">
              {cmd.command}
            </code>
            <p className="text-sm text-ink-muted mt-2">{cmd.description}</p>
            <div className="mt-3 p-3 bg-canvas-warm rounded-lg">
              <code className="font-mono text-xs text-ink">{cmd.example}</code>
            </div>
          </Card>
        ))}
      </div>

      {/* Global flags */}
      <Card className="mt-6">
        <h2 className="text-sm font-medium text-ink-faint mb-3">
          Global flags
        </h2>
        <div className="space-y-2">
          {[
            { flag: "--help", description: "Show command help" },
            { flag: "--version", description: "Show version" },
            { flag: "--verbose", description: "Enable verbose output" },
            { flag: "--json", description: "Output as JSON" },
          ].map((item) => (
            <div key={item.flag} className="flex items-center gap-3">
              <code className="font-mono text-xs text-ink">{item.flag}</code>
              <span className="text-xs text-ink-muted">{item.description}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
