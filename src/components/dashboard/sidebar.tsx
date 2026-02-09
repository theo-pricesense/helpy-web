"use client";

import {
  BarChart3,
  Bot,
  Building2,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronsUpDown,
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
import { Button } from "@/components/ui/button";
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
import type { Organization, Project } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const projectSubNav = [
  { label: "Conversations", segment: "conversations", icon: MessageSquare },
  { label: "Documents", segment: "documents", icon: FileText },
  { label: "AI Settings", segment: "ai", icon: Bot },
  { label: "Widget", segment: "widget", icon: Puzzle },
  { label: "Analytics", segment: "analytics", icon: BarChart3 },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [currentOrg, setCurrentOrg] = useState<Organization | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  const loadOrgs = useCallback(async () => {
    try {
      const data = await organizationsApi.getMyOrganizations();
      setOrganizations(data);
      if (data.length > 0 && !currentOrg) {
        setCurrentOrg(data[0]);
      }
    } catch {
      const demo: Organization[] = [
        {
          id: "org-1",
          name: "Acme Corp",
          createdAt: "2025-01-15T00:00:00Z",
          memberCount: 12,
        },
        {
          id: "org-2",
          name: "Startup Inc",
          createdAt: "2025-06-01T00:00:00Z",
          memberCount: 4,
        },
      ];
      setOrganizations(demo);
      if (!currentOrg) setCurrentOrg(demo[0]);
    }
  }, [currentOrg]);

  const loadProjects = useCallback(async () => {
    if (!currentOrg) return;
    try {
      const data = await projectsApi.getProjects(currentOrg.id);
      setProjects(data);
    } catch {
      setProjects([
        {
          id: "proj-1",
          organizationId: currentOrg.id,
          name: "Customer Portal",
          apiKey: "hpy_live_xxx",
          status: "active",
          createdAt: "2025-03-10T00:00:00Z",
        },
        {
          id: "proj-2",
          organizationId: currentOrg.id,
          name: "Internal Helpdesk",
          apiKey: "hpy_live_yyy",
          status: "active",
          createdAt: "2025-05-22T00:00:00Z",
        },
        {
          id: "proj-3",
          organizationId: currentOrg.id,
          name: "Legacy Support",
          apiKey: "hpy_live_zzz",
          status: "inactive",
          createdAt: "2024-11-01T00:00:00Z",
        },
      ]);
    }
  }, [currentOrg]);

  useEffect(() => {
    loadOrgs();
  }, [loadOrgs]);
  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Auto-expand project based on URL
  useEffect(() => {
    const match = pathname.match(/\/projects\/([^/]+)/);
    if (match) setExpandedProject(match[1]);
  }, [pathname]);

  const switchOrg = (org: Organization) => {
    setCurrentOrg(org);
    setProjects([]);
    setExpandedProject(null);
  };

  const orgInitials = currentOrg?.name
    ? currentOrg.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "?";

  return (
    <aside className="hidden md:flex md:w-64 flex-col border-r border-sidebar-border bg-sidebar h-dvh sticky top-0">
      {/* Logo */}
      <div className="px-4 pt-4 pb-2">
        <HelpyLogo size="sm" textClassName="text-sidebar-foreground" />
      </div>

      {/* Organization Switcher */}
      <div className="px-3 py-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-3 rounded-lg px-2 py-2 hover:bg-sidebar-accent transition-colors outline-none">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
              {orgInitials}
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                {currentOrg?.name || "Select Organization"}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {currentOrg?.memberCount ?? 0} members
              </p>
            </div>
            <ChevronsUpDown className="h-4 w-4 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[232px]">
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => switchOrg(org)}
                className="flex items-center gap-3"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary text-xs font-bold">
                  {org.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{org.name}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {org.memberCount ?? 0} members
                  </p>
                </div>
                {currentOrg?.id === org.id && (
                  <Check className="h-4 w-4 text-primary shrink-0" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                href="/organizations"
                className="flex items-center gap-2 text-muted-foreground"
              >
                <Building2 className="h-4 w-4" />
                Manage organizations
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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

          {/* Projects */}
          <div className="pt-3">
            <div className="flex items-center justify-between px-2 pb-2">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Projects
              </p>
              <Link
                href={
                  currentOrg
                    ? `/organizations/${currentOrg.id}/projects`
                    : "/organizations"
                }
                className="text-muted-foreground hover:text-foreground"
              >
                <Plus className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="space-y-0.5">
              {projects.map((project) => {
                const isExpanded = expandedProject === project.id;
                const isProjectActive = pathname.startsWith(
                  `/projects/${project.id}`,
                );

                return (
                  <Collapsible
                    key={project.id}
                    open={isExpanded}
                    onOpenChange={() =>
                      setExpandedProject(isExpanded ? null : project.id)
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
                          isProjectActive
                            ? "text-primary"
                            : "text-muted-foreground",
                        )}
                      />
                      <span
                        className={cn(
                          "truncate flex-1 text-left",
                          isProjectActive
                            ? "text-sidebar-foreground font-medium"
                            : "text-sidebar-foreground/80",
                        )}
                      >
                        {project.name}
                      </span>
                      {project.status === "inactive" && (
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
                        {projectSubNav.map((sub) => {
                          const href = `/projects/${project.id}/${sub.segment}`;
                          const isActive = pathname === href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.segment}
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
                        <Link
                          href={`/projects/${project.id}`}
                          className={cn(
                            "flex items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] transition-colors",
                            pathname === `/projects/${project.id}`
                              ? "bg-sidebar-accent text-primary font-medium"
                              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                          )}
                        >
                          <Settings className="h-3.5 w-3.5" />
                          Settings
                        </Link>
                      </div>
                    </CollapsibleContent>
                  </Collapsible>
                );
              })}

              {projects.length === 0 && (
                <p className="px-2 py-3 text-xs text-muted-foreground text-center">
                  No projects yet
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
              {currentOrg && (
                <DropdownMenuItem asChild>
                  <Link href={`/settings/organization/${currentOrg.id}`}>
                    <Building2 className="mr-2 h-4 w-4" />
                    Organization Settings
                  </Link>
                </DropdownMenuItem>
              )}
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
