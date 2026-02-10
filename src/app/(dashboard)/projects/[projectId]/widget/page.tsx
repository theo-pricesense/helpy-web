"use client";

import {
  Bot,
  Check,
  ClipboardCopy,
  Loader2,
  Monitor,
  Puzzle,
  Smartphone,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface WidgetSettings {
  themeColor: string;
  position: "bottom-right" | "bottom-left";
  welcomeMessage: string;
  autoOpenDelay: number;
  businessHoursEnabled: boolean;
  businessHoursStart: string;
  businessHoursEnd: string;
}

export default function WidgetSettingsPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  const [settings, setSettings] = useState<WidgetSettings>({
    themeColor: "#00b8d4",
    position: "bottom-right",
    welcomeMessage: "Hello! How can I help you today?",
    autoOpenDelay: 0,
    businessHoursEnabled: false,
    businessHoursStart: "09:00",
    businessHoursEnd: "18:00",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [copied, setCopied] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement actual API call when available
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    toast.success("Widget settings saved");
  };

  const installCode = `<script
  src="https://widget.helpy.dev/v1.js"
  data-project-id="${projectId}"
  data-color="${settings.themeColor}"
  data-position="${settings.position}"
  async
></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Widget
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Customize and install the chat widget for your website.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
        {/* Settings */}
        <div className="space-y-6">
          {/* Style */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Puzzle className="h-4 w-4 text-primary" />
                Style
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Theme Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={settings.themeColor}
                    onChange={(e) =>
                      setSettings({ ...settings, themeColor: e.target.value })
                    }
                    className="h-10 w-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input
                    value={settings.themeColor}
                    onChange={(e) =>
                      setSettings({ ...settings, themeColor: e.target.value })
                    }
                    className="w-32 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Position</Label>
                <Select
                  value={settings.position}
                  onValueChange={(v) =>
                    setSettings({
                      ...settings,
                      position: v as WidgetSettings["position"],
                    })
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    <SelectItem value="bottom-left">Bottom Left</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Welcome Message</Label>
                <Textarea
                  value={settings.welcomeMessage}
                  onChange={(e) =>
                    setSettings({ ...settings, welcomeMessage: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Behavior</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="autoOpen">Auto-open Delay (seconds)</Label>
                <Input
                  id="autoOpen"
                  type="number"
                  value={settings.autoOpenDelay}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      autoOpenDelay: Number(e.target.value),
                    })
                  }
                  min={0}
                  className="w-32"
                />
                <p className="text-xs text-muted-foreground">
                  Set to 0 to disable auto-open.
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>Business Hours</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Only show the widget during business hours.
                  </p>
                </div>
                <Switch
                  checked={settings.businessHoursEnabled}
                  onCheckedChange={(v) =>
                    setSettings({ ...settings, businessHoursEnabled: v })
                  }
                />
              </div>

              {settings.businessHoursEnabled && (
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">Start</Label>
                    <Input
                      type="time"
                      value={settings.businessHoursStart}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessHoursStart: e.target.value,
                        })
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-muted-foreground mt-5">-</span>
                  <div className="space-y-1">
                    <Label className="text-xs">End</Label>
                    <Input
                      type="time"
                      value={settings.businessHoursEnd}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          businessHoursEnd: e.target.value,
                        })
                      }
                      className="w-32"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Install code */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Installation Code</CardTitle>
              <CardDescription>
                {"Add this snippet to your website's <head> or before </body>."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="rounded-lg bg-muted p-4 text-sm font-mono overflow-x-auto text-foreground">
                  {installCode}
                </pre>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={copyCode}
                  className="absolute top-2 right-2 bg-background"
                >
                  {copied ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <ClipboardCopy className="h-3.5 w-3.5" />
                  )}
                  {copied ? "Copied" : "Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={isSaving}>
            {isSaving && <Loader2 className="animate-spin" />}
            Save Settings
          </Button>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Preview</CardTitle>
                <div className="flex items-center gap-1 rounded-lg border border-border p-0.5">
                  <button
                    type="button"
                    onClick={() => setPreviewMode("desktop")}
                    className={cn(
                      "rounded-md p-1.5 transition-colors",
                      previewMode === "desktop"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Monitor className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewMode("mobile")}
                    className={cn(
                      "rounded-md p-1.5 transition-colors",
                      previewMode === "mobile"
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Smartphone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                className={cn(
                  "relative rounded-lg border border-border bg-background overflow-hidden mx-auto transition-all",
                  previewMode === "desktop"
                    ? "w-full h-[400px]"
                    : "w-[240px] h-[420px]",
                )}
              >
                {/* Simulated website */}
                <div className="p-4 space-y-2">
                  <div className="h-3 w-24 rounded bg-muted" />
                  <div className="h-2 w-full rounded bg-muted/60" />
                  <div className="h-2 w-3/4 rounded bg-muted/60" />
                  <div className="h-2 w-5/6 rounded bg-muted/60" />
                  <div className="h-16 w-full rounded bg-muted/30 mt-4" />
                </div>

                {/* Widget button */}
                <div
                  className={cn(
                    "absolute bottom-4",
                    settings.position === "bottom-right" ? "right-4" : "left-4",
                  )}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg cursor-pointer"
                    style={{ backgroundColor: settings.themeColor }}
                  >
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Welcome bubble */}
                <div
                  className={cn(
                    "absolute bottom-[72px] max-w-[200px]",
                    settings.position === "bottom-right" ? "right-4" : "left-4",
                  )}
                >
                  <div className="rounded-xl bg-card border border-border p-3 shadow-md">
                    <p className="text-xs text-card-foreground leading-relaxed">
                      {settings.welcomeMessage}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
