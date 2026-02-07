"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
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
import { useCallback, useEffect, useState } from "react";
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
import { projectsApi } from "@/lib/api";
import type { ProjectResponseDto } from "@/lib/api/generated";

const updateProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

type UpdateProjectForm = z.infer<typeof updateProjectSchema>;

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [project, setProject] = useState<ProjectResponseDto | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProjectForm>({
    resolver: zodResolver(updateProjectSchema),
  });

  const loadProject = useCallback(async () => {
    try {
      const data = await projectsApi.getProject(projectId);
      setProject(data);
      reset({ name: data.name });
    } catch {
      toast.error("Failed to load project");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, reset]);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const onSave = async (data: UpdateProjectForm) => {
    setIsSaving(true);
    try {
      const updated = await projectsApi.update(projectId, {
        name: data.name,
      });
      setProject(updated);
      reset({ name: updated.name });
      toast.success("Project updated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update project",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleRegenerateKey = async () => {
    setIsRegenerating(true);
    try {
      const result = await projectsApi.regenerateApiKey(projectId);
      setProject((prev) => (prev ? { ...prev, apiKey: result.apiKey } : prev));
      toast.success("API key regenerated");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to regenerate API key",
      );
    } finally {
      setIsRegenerating(false);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await projectsApi.delete(projectId);
      toast.success("Project deleted");
      router.push("/organizations");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete project",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const copyApiKey = () => {
    if (project?.apiKey) {
      navigator.clipboard.writeText(project.apiKey);
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

  if (!project) return null;

  return (
    <div className="max-w-2xl space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <FolderKanban className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                {project.name}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {project.status && (
                  <Badge
                    variant="default"
                    className={
                      project.status === "ACTIVE"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : ""
                    }
                  >
                    {project.status === "ACTIVE" && (
                      <Zap className="h-3 w-3 mr-1" />
                    )}
                    {project.status}
                  </Badge>
                )}
                <span className="text-xs text-muted-foreground">
                  Created{" "}
                  {new Date(project.createdAt).toLocaleDateString("ko-KR")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Key */}
      {project.apiKey && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Key className="h-4 w-4 text-primary" />
              API Key
            </CardTitle>
            <CardDescription>
              Use this key to authenticate requests from your application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 font-mono text-sm bg-muted rounded-lg px-4 py-2.5 text-foreground select-all">
                {project.apiKey}
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
                    This will invalidate the current API key. All applications
                    using the old key will stop working immediately.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleRegenerateKey}
                    disabled={isRegenerating}
                  >
                    {isRegenerating && <Loader2 className="animate-spin" />}
                    Regenerate
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      )}

      {/* Project settings */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Project Settings</CardTitle>
          <CardDescription>Update your project configuration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input id="projectName" {...register("name")} />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button type="submit" size="sm" disabled={!isDirty || isSaving}>
              {isSaving && <Loader2 className="animate-spin" />}
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
            Irreversible actions that affect your project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="h-4 w-4" />
                Delete Project
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Project?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the
                  project &quot;{project.name}&quot; and all associated data.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting && <Loader2 className="animate-spin" />}
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
