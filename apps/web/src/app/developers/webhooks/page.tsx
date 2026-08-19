"use client";

import { useState } from "react";
import { Webhook, Plus, Trash2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

interface Webhook {
  id: string;
  url: string;
  events: string[];
  active: boolean;
  createdAt: string;
}

export default function WebhooksPage() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newUrl, setNewUrl] = useState("");

  const handleCreate = () => {
    if (!newUrl.trim()) return;

    const newWebhook: Webhook = {
      id: crypto.randomUUID(),
      url: newUrl,
      events: ["conversion.completed", "conversion.failed"],
      active: true,
      createdAt: new Date().toISOString(),
    };

    setWebhooks([...webhooks, newWebhook]);
    setNewUrl("");
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setWebhooks(webhooks.filter((w) => w.id !== id));
  };

  const toggleActive = (id: string) => {
    setWebhooks(
      webhooks.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">
            Webhooks
          </h1>
          <p className="text-ink-muted mt-1">
            Get notified when conversions complete or fail.
          </p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4" />
          Add webhook
        </Button>
      </div>

      {showForm && (
        <Card className="mb-6">
          <h2 className="text-sm font-medium text-ink-faint mb-4">
            New webhook endpoint
          </h2>
          <div className="flex gap-3">
            <Input
              placeholder="https://your-app.com/webhooks/convertkit"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCreate}>Create</Button>
            <Button variant="ghost" onClick={() => setShowForm(false)}>
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {webhooks.length === 0 ? (
        <EmptyState
          icon={<Webhook className="w-8 h-8" />}
          title="No webhooks"
          description="Add a webhook endpoint to receive notifications about your conversions."
          action={
            <Button onClick={() => setShowForm(true)}>
              Add your first webhook
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {webhooks.map((webhook) => (
            <Card key={webhook.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <code className="font-mono text-sm text-ink">
                      {webhook.url}
                    </code>
                    <Badge variant={webhook.active ? "success" : "default"}>
                      {webhook.active ? "Active" : "Paused"}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {webhook.events.map((event) => (
                      <Badge key={event} variant="outline">
                        {event}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-ink-faint mt-2">
                    Created {new Date(webhook.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive(webhook.id)}
                  >
                    {webhook.active ? (
                      <XCircle className="w-4 h-4" />
                    ) : (
                      <CheckCircle className="w-4 h-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(webhook.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-6 p-4 bg-surface border border-rule rounded-xl">
        <h3 className="text-sm font-medium text-ink mb-2">Event types</h3>
        <ul className="text-sm text-ink-muted space-y-1">
          <li>
            <code className="font-mono text-xs">conversion.completed</code> —
            Conversion finished successfully
          </li>
          <li>
            <code className="font-mono text-xs">conversion.failed</code> —
            Conversion failed
          </li>
        </ul>
      </div>
    </div>
  );
}
