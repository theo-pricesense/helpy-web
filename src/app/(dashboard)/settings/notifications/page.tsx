"use client";

import {
  Bell,
  Eye,
  EyeOff,
  FolderKanban,
  Loader2,
  Mail,
  Plus,
  Slack,
  X,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
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
import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from "@/hooks/use-notification-settings";
import { useWorkspaces } from "@/hooks/use-workspaces";

export default function NotificationSettingsPage() {
  const { data: workspaces = [], isLoading: workspacesLoading } =
    useWorkspaces();
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string>("");

  // Use first workspace as default when workspaces load
  const activeWorkspaceId = selectedWorkspaceId || workspaces[0]?.id || "";

  const { data: settings, isLoading: settingsLoading } =
    useNotificationSettings(activeWorkspaceId);
  const updateMutation = useUpdateNotificationSettings();

  const [showWebhook, setShowWebhook] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [localWebhookUrl, setLocalWebhookUrl] = useState<string | null>(null);

  const isLoading = workspacesLoading || settingsLoading;

  const save = (patch: Record<string, unknown>) => {
    if (!activeWorkspaceId) return;

    updateMutation.mutate(
      { workspaceId: activeWorkspaceId, data: patch },
      {
        onSuccess: () => {
          toast.success("Settings saved");
        },
        onError: () => {
          toast.error("Failed to save settings");
        },
      },
    );
  };

  const addEmail = () => {
    const email = emailInput.trim().toLowerCase();
    if (!email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      return;
    }
    if (settings?.emailRecipients.includes(email)) {
      setEmailError("Email already added");
      return;
    }

    setEmailError("");
    setEmailInput("");
    const newRecipients = [...(settings?.emailRecipients || []), email];
    save({ emailRecipients: newRecipients });
  };

  const removeEmail = (email: string) => {
    const newRecipients = (settings?.emailRecipients || []).filter(
      (e) => e !== email,
    );
    save({ emailRecipients: newRecipients });
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (workspaces.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FolderKanban className="h-12 w-12 text-muted-foreground/30 mb-4" />
        <h2 className="text-lg font-semibold text-foreground">
          No workspaces found
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Create a workspace first to configure notification settings.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">
          Notification Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Configure how you receive notifications when new conversations arrive.
        </p>
      </div>

      {/* Workspace Selector */}
      {workspaces.length > 1 && (
        <div className="space-y-2">
          <Label>Workspace</Label>
          <Select
            value={activeWorkspaceId}
            onValueChange={setSelectedWorkspaceId}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select workspace" />
            </SelectTrigger>
            <SelectContent>
              {workspaces.map((ws) => (
                <SelectItem key={ws.id} value={ws.id}>
                  <span className="flex items-center gap-2">
                    <FolderKanban className="h-3.5 w-3.5 text-muted-foreground" />
                    {ws.name}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Email Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Email Notifications</CardTitle>
                <CardDescription>Receive alerts via email</CardDescription>
              </div>
            </div>
            <Switch
              checked={settings?.emailEnabled ?? false}
              onCheckedChange={(checked) => save({ emailEnabled: checked })}
            />
          </div>
        </CardHeader>
        {settings?.emailEnabled && (
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <Label>Recipients</Label>
              <div className="flex flex-wrap gap-2">
                {(settings?.emailRecipients || []).map((email) => (
                  <Badge
                    key={email}
                    variant="secondary"
                    className="gap-1.5 py-1 pl-2.5 pr-1.5 text-xs"
                  >
                    {email}
                    <button
                      type="button"
                      onClick={() => removeEmail(email)}
                      className="rounded-full p-0.5 hover:bg-muted-foreground/20 transition-colors"
                      aria-label={`Remove ${email}`}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="team@company.com"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setEmailError("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addEmail();
                      }
                    }}
                    className={emailError ? "border-destructive" : ""}
                  />
                  {emailError && (
                    <p className="mt-1 text-xs text-destructive">
                      {emailError}
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={addEmail}
                  aria-label="Add email"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Press Enter or click + to add a recipient. Notifications will be
                sent to all listed emails.
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Slack Notifications */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                <Slack className="h-4 w-4 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base">Slack Notifications</CardTitle>
                <CardDescription>
                  Get notified in your Slack channel
                </CardDescription>
              </div>
            </div>
            <Switch
              checked={settings?.slackEnabled ?? false}
              onCheckedChange={(checked) => save({ slackEnabled: checked })}
            />
          </div>
        </CardHeader>
        {settings?.slackEnabled && (
          <CardContent className="space-y-4">
            <Separator />
            <div className="space-y-3">
              <Label htmlFor="webhookUrl">Webhook URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Input
                    id="webhookUrl"
                    type={showWebhook ? "text" : "password"}
                    placeholder="https://hooks.slack.com/services/..."
                    value={
                      localWebhookUrl ??
                      (typeof settings?.slackWebhookUrl === "string"
                        ? settings.slackWebhookUrl
                        : "")
                    }
                    onChange={(e) => setLocalWebhookUrl(e.target.value || null)}
                    onBlur={() => {
                      if (localWebhookUrl !== null) {
                        save({ slackWebhookUrl: localWebhookUrl || null });
                        setLocalWebhookUrl(null);
                      }
                    }}
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowWebhook((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label={
                      showWebhook ? "Hide webhook URL" : "Show webhook URL"
                    }
                  >
                    {showWebhook ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {"Create an Incoming Webhook in your Slack workspace: "}
                <a
                  href="https://api.slack.com/messaging/webhooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  How to create a Slack Webhook
                </a>
              </p>
            </div>
          </CardContent>
        )}
      </Card>

      {/* Notification Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Notification Events</CardTitle>
              <CardDescription>
                Choose which events trigger notifications
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-1">
          <Separator className="mb-4" />
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                New conversation
              </p>
              <p className="text-xs text-muted-foreground">
                When a customer starts a new chat session
              </p>
            </div>
            <Switch
              checked={settings?.onNewConversation ?? false}
              onCheckedChange={(checked) =>
                save({ onNewConversation: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors">
            <div className="space-y-0.5">
              <p className="text-sm font-medium text-foreground">
                Agent requested
              </p>
              <p className="text-xs text-muted-foreground">
                When a customer asks for human support during a conversation
              </p>
            </div>
            <Switch
              checked={settings?.onAgentRequested ?? false}
              onCheckedChange={(checked) => save({ onAgentRequested: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {/* Save indicator */}
      {updateMutation.isPending && (
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
          Saving...
        </div>
      )}
    </div>
  );
}
