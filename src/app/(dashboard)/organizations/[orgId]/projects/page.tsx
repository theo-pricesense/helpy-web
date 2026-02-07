"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Calendar,
  FolderKanban,
  Loader2,
  Plus,
  Settings,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { organizationsApi, projectsApi } from "@/lib/api";
import type {
  OrganizationResponseDto,
  ProjectResponseDto,
} from "@/lib/api/generated";

const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required"),
});

type CreateProjectForm = z.infer<typeof createProjectSchema>;

export default function ProjectsPage() {
  const params = useParams();
  const router = useRouter();
  const orgId = params.orgId as string;

  const [organization, setOrganization] =
    useState<OrganizationResponseDto | null>(null);
  const [projects, setProjects] = useState<ProjectResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateProjectForm>({
    resolver: zodResolver(createProjectSchema),
  });

  const loadData = useCallback(async () => {
    try {
      const [orgData, projectsData] = await Promise.all([
        organizationsApi.getOrganization(orgId),
        projectsApi.getProjects(orgId),
      ]);
      setOrganization(orgData);
      setProjects(projectsData);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setIsLoading(false);
    }
  }, [orgId]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onCreateProject = async (data: CreateProjectForm) => {
    setIsCreating(true);
    try {
      const newProject = await projectsApi.create({
        organizationId: orgId,
        name: data.name,
      });
      setProjects((prev) => [...prev, newProject]);
      toast.success("Project created successfully");
      setDialogOpen(false);
      reset();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create project",
      );
    } finally {
      setIsCreating(false);
    }
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
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/organizations"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">
              {organization?.name || "Organization"}
            </h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Manage your AI customer service projects.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/settings/organization/${orgId}`)}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
                <DialogDescription>
                  Add a new AI customer service project to {organization?.name}.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit(onCreateProject)}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="projectName">Project Name</Label>
                    <Input
                      id="projectName"
                      placeholder="e.g. Customer Portal"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating && <Loader2 className="animate-spin" />}
                    Create
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Projects grid */}
      {projects.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted mb-4">
              <FolderKanban className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">
              No projects yet
            </h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">
              Create your first project to start building AI support.
            </p>
            <Button size="sm" onClick={() => setDialogOpen(true)}>
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="cursor-pointer hover:border-primary/50 hover:shadow-md transition-all group"
              onClick={() => router.push(`/projects/${project.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <FolderKanban className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-base">
                        {project.name}
                      </CardTitle>
                    </div>
                  </div>
                  {project.status && (
                    <Badge
                      variant={
                        project.status === "ACTIVE" ? "default" : "secondary"
                      }
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
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("ko-KR")}
                  </span>
                </div>
                {project.apiKey && (
                  <div className="font-mono text-xs text-muted-foreground bg-muted rounded-md px-2 py-1 truncate">
                    {project.apiKey.slice(0, 16)}...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
