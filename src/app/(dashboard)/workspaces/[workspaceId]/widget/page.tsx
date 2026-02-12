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
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
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
import {
  useUpdateWidgetSettings,
  useWidgetSettings,
} from "@/hooks/use-widget-settings";
import {
  UpdateWidgetSettingsDto,
  type UpdateWidgetSettingsDto as UpdateWidgetSettingsDtoType,
} from "@/lib/api/generated";
import { cn } from "@/lib/utils";

export default function WidgetSettingsPage() {
  const t = useTranslations();
  const params = useParams();
  const workspaceId = params.workspaceId as string;

  const { data: settings, isLoading } = useWidgetSettings(workspaceId);
  const updateMutation = useUpdateWidgetSettings();

  const [formData, setFormData] = useState<UpdateWidgetSettingsDtoType>({
    themeColor: "#00b8d4",
    position: UpdateWidgetSettingsDto.position.BOTTOM_RIGHT,
    welcomeMessage: "",
    placeholder: "",
    autoOpenDelay: 0,
    businessHoursEnabled: false,
    businessHoursStart: "09:00",
    businessHoursEnd: "18:00",
  });
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        themeColor: settings.themeColor,
        position: settings.position,
        welcomeMessage: settings.welcomeMessage,
        placeholder: settings.placeholder,
        autoOpenDelay: settings.autoOpenDelay,
        businessHoursEnabled: settings.businessHoursEnabled,
        businessHoursStart: settings.businessHoursStart,
        businessHoursEnd: settings.businessHoursEnd,
      });
    }
  }, [settings]);

  const handleSave = () => {
    updateMutation.mutate(
      { workspaceId, data: formData },
      {
        onSuccess: () => {
          toast.success(t("widget.toast.saved"));
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : t("widget.toast.saveFailed"),
          );
        },
      },
    );
  };

  const installCode = `<script
  src="https://widget.helpy.dev/v1.js"
  data-project-id="${workspaceId}"
  data-color="${formData.themeColor}"
  data-position="${formData.position}"
  async
></script>`;

  const copyCode = () => {
    navigator.clipboard.writeText(installCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(t("widget.toast.codeCopied"));
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("widget.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("widget.description")}
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
                {t("widget.style")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{t("widget.themeColor")}</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={formData.themeColor}
                    onChange={(e) =>
                      setFormData({ ...formData, themeColor: e.target.value })
                    }
                    className="h-10 w-10 rounded-lg border border-border cursor-pointer"
                  />
                  <Input
                    value={formData.themeColor}
                    onChange={(e) =>
                      setFormData({ ...formData, themeColor: e.target.value })
                    }
                    className="w-32 font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>{t("widget.position")}</Label>
                <Select
                  value={formData.position}
                  onValueChange={(v) =>
                    setFormData({
                      ...formData,
                      position: v as UpdateWidgetSettingsDto.position,
                    })
                  }
                >
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bottom-right">
                      {t("widget.positionBottomRight")}
                    </SelectItem>
                    <SelectItem value="bottom-left">
                      {t("widget.positionBottomLeft")}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>{t("widget.welcomeMessage")}</Label>
                <Textarea
                  value={formData.welcomeMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, welcomeMessage: e.target.value })
                  }
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>{t("widget.placeholder")}</Label>
                <Input
                  value={formData.placeholder}
                  onChange={(e) =>
                    setFormData({ ...formData, placeholder: e.target.value })
                  }
                  placeholder={t("widget.placeholderHint")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Behavior */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">
                {t("widget.behavior")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="autoOpen">{t("widget.autoOpenDelay")}</Label>
                <Input
                  id="autoOpen"
                  type="number"
                  value={formData.autoOpenDelay}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      autoOpenDelay: Number(e.target.value),
                    })
                  }
                  min={0}
                  className="w-32"
                />
                <p className="text-xs text-muted-foreground">
                  {t("widget.autoOpenDelayHint")}
                </p>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div>
                  <Label>{t("widget.businessHours")}</Label>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t("widget.businessHoursDescription")}
                  </p>
                </div>
                <Switch
                  checked={formData.businessHoursEnabled}
                  onCheckedChange={(v) =>
                    setFormData({ ...formData, businessHoursEnabled: v })
                  }
                />
              </div>

              {formData.businessHoursEnabled && (
                <div className="flex items-center gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs">{t("widget.start")}</Label>
                    <Input
                      type="time"
                      value={formData.businessHoursStart}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          businessHoursStart: e.target.value,
                        })
                      }
                      className="w-32"
                    />
                  </div>
                  <span className="text-muted-foreground mt-5">-</span>
                  <div className="space-y-1">
                    <Label className="text-xs">{t("widget.end")}</Label>
                    <Input
                      type="time"
                      value={formData.businessHoursEnd}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
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
              <CardTitle className="text-base">
                {t("widget.installCode")}
              </CardTitle>
              <CardDescription>
                {t("widget.installCodeDescription")}
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
                  {copied ? t("widget.copied") : t("common.copy")}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Button onClick={handleSave} disabled={updateMutation.isPending}>
            {updateMutation.isPending && <Loader2 className="animate-spin" />}
            {t("common.saveChanges")}
          </Button>
        </div>

        {/* Preview */}
        <div className="lg:sticky lg:top-24 h-fit">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">
                  {t("widget.preview")}
                </CardTitle>
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
                    formData.position === "bottom-right" ? "right-4" : "left-4",
                  )}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-full shadow-lg cursor-pointer"
                    style={{ backgroundColor: formData.themeColor }}
                  >
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Welcome bubble */}
                <div
                  className={cn(
                    "absolute bottom-[72px] max-w-[200px]",
                    formData.position === "bottom-right" ? "right-4" : "left-4",
                  )}
                >
                  <div className="rounded-xl bg-card border border-border p-3 shadow-md">
                    <p className="text-xs text-card-foreground leading-relaxed">
                      {formData.welcomeMessage ||
                        t("widget.defaultWelcomeMessage")}
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
