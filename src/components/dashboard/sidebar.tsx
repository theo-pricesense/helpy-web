"use client";

import {
  BarChart3,
  Bell,
  Bot,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  FolderKanban,
  LayoutGrid,
  LogOut,
  MessageSquare,
  Plus,
  Puzzle,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HelpyLogo } from "@/components/helpy-logo";
import { NotificationCenter } from "@/components/notification-center";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UpgradeBanner } from "@/components/upgrade-banner";
import { useWorkspaces } from "@/hooks/use-workspaces";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const mainNav = [
  { label: "Conversations", segment: "conversations", icon: MessageSquare },
  { label: "Documents", segment: "documents", icon: FileText },
  { label: "AI Settings", segment: "ai", icon: Bot },
  { label: "Analytics", segment: "analytics", icon: BarChart3 },
  { label: "Widget", segment: "widget", icon: Puzzle },
];

const settingsNav = [
  { label: "Members", href: "/settings/members", icon: Users },
  { label: "Billing", href: "/settings/billing", icon: CreditCard },
  { label: "Notifications", href: "/settings/notifications", icon: Bell },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const { data: workspaces = [] } = useWorkspaces();
  const [activeWsId, setActiveWsId] = useState<string | null>(null);
  const isSettingsActive = pathname.startsWith("/settings");
  const [settingsOpen, setSettingsOpen] = useState(isSettingsActive);

  const activeWs =
    workspaces.find((ws) => ws.id === activeWsId) ?? workspaces[0] ?? null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  // Auto-expand settings submenu when on a settings page
  useEffect(() => {
    if (isSettingsActive) setSettingsOpen(true);
  }, [isSettingsActive]);

  // Sync active workspace from URL
  useEffect(() => {
    const match = pathname.match(/\/workspaces\/([^/]+)/);
    if (match) {
      setActiveWsId(match[1]);
    }
  }, [pathname]);

  // Set initial active workspace
  useEffect(() => {
    if (!activeWsId && workspaces.length > 0) {
      setActiveWsId(workspaces[0].id);
    }
  }, [activeWsId, workspaces]);

  const switchWorkspace = (wsId: string) => {
    setActiveWsId(wsId);
    router.push(`/workspaces/${wsId}/conversations`);
  };

  return (
    <aside className="hidden md:flex md:w-60 flex-col border-r border-sidebar-border bg-sidebar h-dvh sticky top-0">
      {/* Top: Logo */}
      <div className="px-4 pt-4 pb-1">
        <HelpyLogo size="sm" textClassName="text-sidebar-foreground" />
      </div>

      {/* Workspace Switcher - compact dropdown */}
      <div className="px-3 pt-2 pb-1">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-2.5 py-2 text-left transition-colors hover:bg-sidebar-accent outline-none">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary/10">
              <FolderKanban className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate leading-tight">
                {activeWs?.name || "Select workspace"}
              </p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-xs font-medium text-muted-foreground">
                Workspaces
              </p>
            </div>
            {workspaces.map((ws) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => switchWorkspace(ws.id)}
                className="gap-2"
              >
                <FolderKanban className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="flex-1 truncate">{ws.name}</span>
                {ws.id === activeWs?.id && (
                  <Check className="h-3.5 w-3.5 text-primary" />
                )}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/workspaces" className="gap-2">
                <LayoutGrid className="h-3.5 w-3.5" />
                All Workspaces
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push("/onboarding")}
              className="gap-2"
            >
              <Plus className="h-3.5 w-3.5" />
              New Workspace
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Search */}
      <div className="px-3 pt-1.5 pb-2">
        <button
          type="button"
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
          }}
          className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs text-muted-foreground hover:bg-sidebar-accent transition-colors"
        >
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="hidden lg:inline-flex items-center gap-0.5 text-[10px] font-mono text-muted-foreground/60">
            {"⌘K"}
          </kbd>
        </button>
      </div>

      {/* Main Navigation - the primary focus */}
      <nav className="flex-1 overflow-y-auto px-3">
        {activeWs ? (
          <>
            <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Navigation
            </p>
            <div className="space-y-0.5">
              {mainNav.map((item) => {
                const href = `/workspaces/${activeWs.id}/${item.segment}`;
                const isActive =
                  pathname === href || pathname.startsWith(href + "/");
                const Icon = item.icon;
                return (
                  <Link
                    key={item.segment}
                    href={href}
                    className={cn(
                      "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                      isActive
                        ? "bg-sidebar-accent text-primary font-medium"
                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    />
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="mt-4">
              <p className="px-2 pb-1.5 pt-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Workspace
              </p>
              <Link
                href={`/workspaces/${activeWs.id}/settings`}
                className={cn(
                  "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                  pathname === `/workspaces/${activeWs.id}/settings`
                    ? "bg-sidebar-accent text-primary font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                )}
              >
                <Settings
                  className={cn(
                    "h-4 w-4",
                    pathname === `/workspaces/${activeWs.id}/settings`
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                />
                Workspace Settings
              </Link>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <FolderKanban className="h-8 w-8 text-muted-foreground/30 mb-2" />
            <p className="text-xs text-muted-foreground">
              No workspace selected
            </p>
            <button
              type="button"
              onClick={() => router.push("/onboarding")}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Create one
            </button>
          </div>
        )}
      </nav>

      {/* Upgrade Banner for free/starter */}
      <UpgradeBanner plan="free" />

      {/* Bottom: Settings (collapsible) + User */}
      <div className="border-t border-sidebar-border px-3 py-2 space-y-0.5">
        <button
          type="button"
          onClick={() => setSettingsOpen((v) => !v)}
          className={cn(
            "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-sm transition-colors",
            isSettingsActive
              ? "text-primary font-medium"
              : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
          )}
        >
          <Settings
            className={cn(
              "h-4 w-4",
              isSettingsActive ? "text-primary" : "text-muted-foreground",
            )}
          />
          <span className="flex-1 text-left">Settings</span>
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform",
              settingsOpen && "rotate-180",
            )}
          />
        </button>

        {settingsOpen && (
          <div className="ml-3 border-l border-sidebar-border pl-2 space-y-0.5">
            {settingsNav.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-2 py-1 text-[13px] transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-primary font-medium"
                      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-3.5 w-3.5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-sidebar-border">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex flex-1 items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-sidebar-accent transition-colors outline-none min-w-0">
              <Avatar className="h-6 w-6">
                <AvatarFallback className="bg-primary/10 text-primary text-[10px] font-medium">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm text-sidebar-foreground truncate">
                {user?.name || "User"}
              </span>
              <ChevronDown className="h-3 w-3 text-muted-foreground shrink-0 ml-auto" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" side="top" className="w-48">
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
          <NotificationCenter />
        </div>
      </div>
    </aside>
  );
}
