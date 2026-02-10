"use client";

import { FolderKanban, Loader2, Plus, Search, Zap } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
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
import { projectsApi } from "@/lib/api";
import type { Project } from "@/lib/types";

export default function WorkspacesPage() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const loadWorkspaces = useCallback(async () => {
    try {
      const data = await projectsApi.listProjects("default");
      setWorkspaces(data);
    } catch {
      setWorkspaces([
        {
          id: "ws-1",
          organizationId: "default",
          name: "Customer Portal",
          apiKey: "hpy_live_abc123",
          status: "active",
          createdAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "ws-2",
          organizationId: "default",
          name: "Internal Helpdesk",
          apiKey: "hpy_live_def456",
          status: "active",
          createdAt: "2025-06-15T00:00:00Z",
        },
        {
          id: "ws-3",
          organizationId: "default",
          name: "E-commerce Support",
          apiKey: "hpy_live_ghi789",
          status: "inactive",
          createdAt: "2025-08-20T00:00:00Z",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  const handleCreate = async () => {
    if (!newName.trim()) return;
    setIsCreating(true);
    try {
      const created = await projectsApi.createProject("default", {
        name: newName,
      });
      setWorkspaces((prev) => [created, ...prev]);
      setCreateOpen(false);
      setNewName("");
      router.push(`/workspaces/${created.id}`);
    } catch {
      const demo: Project = {
        id: `ws-${Date.now()}`,
        organizationId: "default",
        name: newName,
        apiKey: `hpy_live_${Math.random().toString(36).slice(2, 10)}`,
        status: "active",
        createdAt: new Date().toISOString(),
      };
      setWorkspaces((prev) => [demo, ...prev]);
      setCreateOpen(false);
      setNewName("");
      router.push(`/workspaces/${demo.id}`);
    } finally {
      setIsCreating(false);
    }
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
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="e.g. Customer Portal"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleCreate();
                }}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setCreateOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={!newName.trim() || isCreating}
              >
                {isCreating && <Loader2 className="animate-spin" />}
                Create
              </Button>
            </DialogFooter>
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
                      ws.status === "active"
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20"
                        : ""
                    }
                  >
                    {ws.status === "active" && <Zap className="h-3 w-3 mr-1" />}
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
