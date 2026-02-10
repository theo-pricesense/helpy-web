"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FolderKanban, Loader2, Plus, Search, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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
import { useOrganizations } from "@/hooks/use-organizations";
import { useCreateWorkspace, useWorkspaces } from "@/hooks/use-workspaces";
import { WorkspaceResponseDto } from "@/lib/api/generated";

const createWorkspaceSchema = z.object({
  name: z.string().min(1, "워크스페이스 이름을 입력해주세요."),
});

type CreateWorkspaceForm = z.infer<typeof createWorkspaceSchema>;

export default function WorkspacesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);

  const { data: organizations } = useOrganizations();
  const defaultOrgId = organizations?.[0]?.id ?? "";

  const { data: workspaces = [], isLoading } = useWorkspaces(defaultOrgId);
  const createMutation = useCreateWorkspace();

  const form = useForm<CreateWorkspaceForm>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: { name: "" },
  });

  const handleCreate = (data: CreateWorkspaceForm) => {
    if (!defaultOrgId) return;
    createMutation.mutate(
      { name: data.name, organizationId: defaultOrgId },
      {
        onSuccess: (created) => {
          setCreateOpen(false);
          form.reset();
          router.push(`/workspaces/${created.id}`);
        },
      },
    );
  };

  const filtered = workspaces.filter((ws) =>
    ws.name.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Workspaces
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your AI customer service workspaces.
          </p>
        </div>
        <Dialog open={createOpen} onOpenChange={setCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              New Workspace
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={form.handleSubmit(handleCreate)}>
              <DialogHeader>
                <DialogTitle>Create Workspace</DialogTitle>
                <DialogDescription>
                  A workspace represents one product or service channel.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                <Label htmlFor="ws-name">Workspace Name</Label>
                <Input
                  id="ws-name"
                  placeholder="e.g. Customer Portal"
                  autoFocus
                  {...form.register("name")}
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-destructive">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending && (
                    <Loader2 className="animate-spin" />
                  )}
                  Create
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search workspaces..."
          className="pl-9"
        />
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FolderKanban className="h-10 w-10 text-muted-foreground/40 mb-3" />
            <p className="text-sm font-medium text-foreground">
              No workspaces found
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {search
                ? "Try a different search term."
                : "Create your first workspace to get started."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((ws) => (
            <Card
              key={ws.id}
              className="group cursor-pointer transition-colors hover:border-primary/40"
              onClick={() => router.push(`/workspaces/${ws.id}`)}
            >
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <FolderKanban className="h-5 w-5 text-primary" />
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      ws.status === WorkspaceResponseDto.status.ACTIVE
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : ""
                    }
                  >
                    {ws.status === WorkspaceResponseDto.status.ACTIVE && (
                      <Zap className="h-3 w-3 mr-1" />
                    )}
                    {ws.status}
                  </Badge>
                </div>
                <div className="mt-4">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {ws.name}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    Created {new Date(ws.createdAt).toLocaleDateString("ko-KR")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
