"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  Copy,
  FolderKanban,
  Key,
  Loader2,
  RefreshCw,
  Trash2,
  Zap,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  useDeleteWorkspace,
  useRegenerateApiKey,
  useUpdateWorkspace,
  useWorkspace,
} from "@/hooks/use-workspaces";
import { WorkspaceResponseDto } from "@/lib/api/generated";

const updateWorkspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required"),
});

type UpdateWorkspaceForm = z.infer<typeof updateWorkspaceSchema>;

export default function WorkspaceSettingsPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;

  const [copied, setCopied] = useState(false);

  const { data: workspace, isLoading } = useWorkspace(workspaceId);
  const updateMutation = useUpdateWorkspace();
  const deleteMutation = useDeleteWorkspace();
  const regenerateMutation = useRegenerateApiKey();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateWorkspaceForm>({
    resolver: zodResolver(updateWorkspaceSchema),
  });

  useEffect(() => {
    if (workspace) {
      reset({ name: workspace.name });
    }
  }, [workspace, reset]);

  const onSave = (data: UpdateWorkspaceForm) => {
    updateMutation.mutate(
      { id: workspaceId, data: { name: data.name } },
      {
        onSuccess: (updated) => {
          reset({ name: updated.name });
          toast.success("Workspace updated");
        },
        onError: (error) => {
          toast.error(
            error instanceof Error
              ? error.message
              : "Failed to update workspace",
          );
        },
      },
    );
  };

  const handleRegenerateKey = () => {
    regenerateMutation.mutate(workspaceId, {
      onSuccess: () => {
        toast.success("API key regenerated");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : "Failed to regenerate API key",
        );
      },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(workspaceId, {
      onSuccess: () => {
        toast.success("Workspace deleted");
        router.push("/workspaces");
      },
      onError: (error) => {
        toast.error(
          error instanceof Error ? error.message : "Failed to delete workspace",
        );
      },
    });
  };

  const copyApiKey = () => {
    if (workspace?.apiKey) {
      navigator.clipboard.writeText(workspace.apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("API key copied to clipboard");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!workspace) return null;

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <FolderKanban className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {workspace.name}
            </h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge
                variant="outline"
                className={
                  workspace.status === WorkspaceResponseDto.status.ACTIVE
                    ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                    : ""
                }
              >
                {workspace.status === WorkspaceResponseDto.status.ACTIVE && (
                  <Zap className="h-3 w-3 mr-1" />
                )}
                {workspace.status}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Created{" "}
                {new Date(workspace.createdAt).toLocaleDateString("ko-KR")}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* API Key */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Key className="h-4 w-4 text-primary" />
            API Key
          </CardTitle>
          <CardDescription>
            Use this key to authenticate requests from your widget.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="flex-1 font-mono text-sm bg-muted rounded-lg px-4 py-2.5 text-foreground select-all">
              {workspace.apiKey}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={copyApiKey}
              aria-label="Copy API key"
            >
              {copied ? (
                <Check className="h-4 w-4 text-emerald-500" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline" size="sm">
                <RefreshCw className="h-4 w-4" />
                Regenerate Key
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Regenerate API Key?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will invalidate the current API key. All widgets using
                  the old key will stop working immediately.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleRegenerateKey}
                  disabled={regenerateMutation.isPending}
                >
                  {regenerateMutation.isPending && (
                    <Loader2 className="animate-spin" />
                  )}
                  Regenerate
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {/* Workspace settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Workspace Settings</CardTitle>
          <CardDescription>
            Update your workspace configuration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="workspaceName">Workspace Name</Label>
              <Input id="workspaceName" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              size="sm"
              disabled={!isDirty || updateMutation.isPending}
            >
              {updateMutation.isPending && <Loader2 className="animate-spin" />}
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-destructive/30">
        <CardHeader>
          <CardTitle className="text-base text-destructive">
            Danger Zone
          </CardTitle>
          <CardDescription>
            Irreversible actions that affect your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
                Delete Workspace
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Workspace?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  workspace &quot;{workspace.name}&quot; and all associated
                  data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {deleteMutation.isPending && (
                    <Loader2 className="animate-spin" />
                  )}
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
