"use client";

import { useState } from "react";
import { Key, Plus, Copy, Trash2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showNewKeyForm, setShowNewKeyForm] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const handleCreateKey = () => {
    if (!newKeyName.trim()) return;

    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      name: newKeyName,
      key: `ck_${crypto.randomUUID().replace(/-/g, "").slice(0, 32)}`,
      createdAt: new Date().toISOString(),
      lastUsed: "Never",
    };

    setKeys([...keys, newKey]);
    setNewKeyName("");
    setShowNewKeyForm(false);
  };

  const handleDeleteKey = (id: string) => {
    setKeys(keys.filter((k) => k.id !== id));
  };

  const toggleKeyVisibility = (id: string) => {
    const newVisible = new Set(visibleKeys);
    if (newVisible.has(id)) {
      newVisible.delete(id);
    } else {
      newVisible.add(id);
    }
    setVisibleKeys(newVisible);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-display font-semibold text-ink">
            API Keys
          </h1>
          <p className="text-ink-muted mt-1">
            Manage your API keys for programmatic access.
          </p>
        </div>
        <Button onClick={() => setShowNewKeyForm(true)}>
          <Plus className="w-4 h-4" />
          Create key
        </Button>
      </div>

      {/* New key form */}
      {showNewKeyForm && (
        <Card className="mb-6">
          <h2 className="text-sm font-medium text-ink-faint mb-4">
            Create new API key
          </h2>
          <div className="flex gap-3">
            <Input
              placeholder="Key name (e.g., Production, Development)"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleCreateKey}>Create</Button>
            <Button
              variant="ghost"
              onClick={() => setShowNewKeyForm(false)}
            >
              Cancel
            </Button>
          </div>
        </Card>
      )}

      {/* Keys list */}
      {keys.length === 0 ? (
        <EmptyState
          icon={<Key className="w-8 h-8" />}
          title="No API keys"
          description="Create an API key to start using the ConvertKit API programmatically."
          action={
            <Button onClick={() => setShowNewKeyForm(true)}>
              Create your first key
            </Button>
          }
        />
      ) : (
        <div className="space-y-3">
          {keys.map((key) => (
            <Card key={key.id}>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-ink">{key.name}</h3>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <code className="font-mono text-xs text-ink-muted">
                      {visibleKeys.has(key.id)
                        ? key.key
                        : key.key.slice(0, 8) + "••••••••••••"}
                    </code>
                    <button
                      onClick={() => toggleKeyVisibility(key.id)}
                      className="text-ink-faint hover:text-ink"
                    >
                      {visibleKeys.has(key.id) ? (
                        <EyeOff className="w-3 h-3" />
                      ) : (
                        <Eye className="w-3 h-3" />
                      )}
                    </button>
                    <button
                      onClick={() => navigator.clipboard.writeText(key.key)}
                      className="text-ink-faint hover:text-ink"
                    >
                      <Copy className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-xs text-ink-faint mt-2">
                    Created {new Date(key.createdAt).toLocaleDateString()} · Last
                    used {key.lastUsed}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteKey(key.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Security note */}
      <div className="mt-6 p-4 bg-warning-bg rounded-xl">
        <p className="text-sm text-warning">
          Keep your API keys secure. Do not share them or commit them to version
          control.
        </p>
      </div>
    </div>
  );
}
