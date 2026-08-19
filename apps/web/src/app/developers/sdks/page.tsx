import { ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const sdks = [
  {
    name: "JavaScript / TypeScript",
    package: "@convertkit/sdk",
    version: "1.0.0",
    status: "stable",
    description: "Official Node.js and browser SDK",
    install: "npm install @convertkit/sdk",
    docs: "#",
  },
  {
    name: "Python",
    package: "convertkit",
    version: "1.0.0",
    status: "stable",
    description: "Official Python SDK",
    install: "pip install convertkit",
    docs: "#",
  },
  {
    name: "Go",
    package: "github.com/convertkit/go-sdk",
    version: "1.0.0",
    status: "beta",
    description: "Official Go SDK",
    install: "go get github.com/convertkit/go-sdk",
    docs: "#",
  },
  {
    name: "Ruby",
    package: "convertkit",
    version: "0.9.0",
    status: "beta",
    description: "Community-maintained Ruby SDK",
    install: "gem install convertkit",
    docs: "#",
  },
];

export default function SdksPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">SDKs</h1>
        <p className="text-ink-muted mt-1">
          Official and community SDKs for integrating with ConvertKit.
        </p>
      </div>

      <div className="space-y-4">
        {sdks.map((sdk) => (
          <Card key={sdk.name}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-ink">{sdk.name}</h2>
                  <Badge
                    variant={
                      sdk.status === "stable" ? "success" : "warning"
                    }
                  >
                    {sdk.status}
                  </Badge>
                </div>
                <p className="text-sm text-ink-muted mt-1">{sdk.description}</p>
                <div className="flex items-center gap-4 mt-3">
                  <code className="font-mono text-xs text-ink bg-canvas-warm px-2 py-1 rounded">
                    {sdk.install}
                  </code>
                </div>
              </div>
              <a
                href={sdk.docs}
                className="flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700"
              >
                Docs
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-surface border border-rule rounded-xl">
        <h3 className="text-sm font-medium text-ink mb-2">
          Community SDKs
        </h3>
        <p className="text-sm text-ink-muted">
          Don't see your language? Community SDKs are welcome. Check our{" "}
          <a href="#" className="text-accent-600 hover:text-accent-700">
            contributing guide
          </a>{" "}
          for details on building your own SDK.
        </p>
      </div>
    </div>
  );
}
