"use client";

import {
  BarChart3,
  Bot,
  ChevronDown,
  ChevronRight,
  FileText,
  FolderKanban,
  LogOut,
  MessageSquare,
  Plus,
  Puzzle,
  Search,
  Settings,
  User,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HelpyLogo } from "@/components/helpy-logo";
import { NotificationCenter } from "@/components/notification-center";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { organizationsApi, projectsApi } from "@/lib/api";
import type { Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const workspaceSubNav = [
  { label: "Conversations", segment: "conversations", icon: MessageSquare },
  { label: "Documents", segment: "documents", icon: FileText },
  { label: "AI Settings", segment: "ai", icon: Bot },
  { label: "Widget", segment: "widget", icon: Puzzle },
  { label: "Analytics", segment: "analytics", icon: BarChart3 },
  { label: "Settings", segment: "", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [workspaces, setWorkspaces] = useState<Project[]>([]);
  const [expandedWorkspace, setExpandedWorkspace] = useState<string | null>(
    null,
  );

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const loadWorkspaces = useCallback(async () => {
    try {
      const orgs = await organizationsApi.getMyOrganizations();
      if (orgs.length > 0) {
        const data = await projectsApi.getProjects(orgs[0].id);
        setWorkspaces(data);
      }
    } catch {
      setWorkspaces([
        {
          id: "ws-1",
          organizationId: "org-1",
          name: "Customer Portal",
          apiKey: "hpy_live_xxx",
          status: "active",
          createdAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "ws-2",
          organizationId: "org-1",
          name: "Internal Helpdesk",
          apiKey: "hpy_live_yyy",
          status: "active",
          createdAt: "2025-05-22T00:00:00Z",
        },
        {
          id: "ws-3",
          organizationId: "org-1",
          name: "Legacy Support",
          apiKey: "hpy_live_zzz",
          status: "inactive",
          createdAt: "2024-11-01T00:00:00Z",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  useEffect(() => {
    const match = pathname.match(/\/workspaces\/([^/]+)/);
    if (match) setExpandedWorkspace(match[1]);
  }, [pathname]);

  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r border-sidebar-border bg-sidebar h-dvh sticky top-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-3">
        <HelpyLogo size="sm" textClassName="text-sidebar-foreground" />
      </div>

      <Separator className="bg-sidebar-border mx-3" />

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <nav className="px-3 py-3 space-y-1">
          {/* Quick Search trigger */}
          <button
            type="button"
            onClick={() => {
              document.dispatchEvent(
                new KeyboardEvent("keydown", { key: "k", metaKey: true }),
              );
            }}
            className="flex w-full items-center gap-3 rounded-lg px-2 py-1.5 text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
          >
            <Search className="h-4 w-4" />
            <span className="flex-1 text-left">Search...</span>
            <kbd className="hidden lg:inline-flex items-center gap-0.5 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] font-mono text-muted-foreground">
              <span className="text-xs">{"⌘"}</span>K
            </kbd>
          </button>

          {/* Workspaces */}
          <div className="pt-3">
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Workspaces
              </p>
              <button
                type="button"
                onClick={() => router.push("/onboarding")}
                className="text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="space-y-0.5">
              {workspaces.map((ws) => {
                const isExpanded = expandedWorkspace === ws.id;
                const isWsActive = pathname.startsWith(`/workspaces/${ws.id}`);

                return (
                  <Collapsible
                    key={ws.id}
                    open={isExpanded}
                    onOpenChange={() =>
                      setExpandedWorkspace(isExpanded ? null : ws.id)
                    }
                  >
                    <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-sidebar-accent group">
                      <ChevronRight
                        className={cn(
                          "h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform",
                          isExpanded && "rotate-90",
                        )}
                      />
                      <FolderKanban
                        className={cn(
                          "h-4 w-4 shrink-0",
                          isWsActive ? "text-primary" : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "truncate flex-1 text-left",
                          isWsActive
                            ? "text-sidebar-foreground font-medium"
                            : "text-sidebar-foreground/80",
                        )}
                      >
                        {ws.name}
                      </span>
                      {ws.status === "inactive" && (
                        <Badge
                          variant="secondary"
                          className="h-4 px-1 text-[9px]"
                        >
                          off
                        </Badge>
                      )}
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="ml-5 border-l border-sidebar-border pl-2 py-0.5 space-y-0.5">
                        {workspaceSubNav.map((sub) => {
                          const href = sub.segment
                            ? `/workspaces/${ws.id}/${sub.segment}`
                            : `/workspaces/${ws.id}`;
                          const isActive = sub.segment
                            ? pathname === href ||
                              pathname.startsWith(href + "/")
                            : pathname === href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.segment || "settings"}
                              href={href}
                              className={cn(
                                "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                                isActive
                                  ? "bg-sidebar-accent text-primary font-medium"
                                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                              )}
                            >
                              <SubIcon className="h-3.5 w-3.5" />
                              {sub.label}
                            </Link>
                          );
                        })}
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

              {workspaces.length === 0 && (
                <p className="px-2 py-3 text-xs text-muted-foreground text-center">
                  No workspaces yet
                </p>
              )}
            </div>
          </div>
        </nav>
      </ScrollArea>

      {/* Bottom: Settings + User */}
      <div className="border-t border-sidebar-border">
        <div className="flex items-center justify-between px-3 pt-2 pb-1">
          <Link
            href="/settings/profile"
            className={cn(
              "flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors",
              pathname === "/settings/profile"
                ? "bg-sidebar-accent text-primary font-medium"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
          <NotificationCenter />
        </div>
        <div className="px-3 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent transition-colors outline-none">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {user?.name || "User"}
                </p>
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <div className="px-2 py-1.5">
                <p className="text-sm font-medium">{user?.name || "User"}</p>
                <p className="text-xs text-muted-foreground">
                  {user?.email || ""}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings/profile">
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  logout();
                  window.location.href = "/login";
                }}
                className="text-destructive focus:text-destructive"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </aside>
  );
}
