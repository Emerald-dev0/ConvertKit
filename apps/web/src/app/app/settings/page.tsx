"use client";

import { User, Bell, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-semibold text-ink">
          Settings
        </h1>
        <p className="text-ink-muted mt-1">
          Manage your account preferences.
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5 text-accent-600" />
            <div>
              <h2 className="font-semibold text-ink">Account</h2>
              <p className="text-sm text-ink-muted">
                Manage your profile and account settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Input label="Name" defaultValue="John Doe" />
            <Input
              label="Email"
              defaultValue="john@example.com"
              type="email"
            />
            <Button variant="secondary">Save changes</Button>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5 text-accent-600" />
            <div>
              <h2 className="font-semibold text-ink">Notifications</h2>
              <p className="text-sm text-ink-muted">
                Configure notification preferences
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { label: "Conversion complete", description: "Get notified when a conversion finishes" },
              { label: "Batch complete", description: "Get notified when a batch finishes" },
              { label: "Product updates", description: "Receive updates about new features" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between p-3 bg-canvas-warm rounded-lg"
              >
                <div>
                  <p className="text-sm font-medium text-ink">{item.label}</p>
                  <p className="text-xs text-ink-muted">{item.description}</p>
                </div>
                <input
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 accent-accent-500"
                />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5 text-accent-600" />
            <div>
              <h2 className="font-semibold text-ink">Privacy</h2>
              <p className="text-sm text-ink-muted">
                Control your privacy and data settings
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-canvas-warm rounded-lg">
              <p className="text-sm text-ink">
                Your conversion history is stored for 30 days. Files are stored
                for 24 hours.
              </p>
            </div>
            <Button variant="secondary">Export my data</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
