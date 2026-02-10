"use client";

import { Menu, Search, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { HelpyLogo } from "@/components/helpy-logo";
import { NotificationCenter } from "@/components/notification-center";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/stores/auth-store";

const mobileNav = [
  { label: "Workspaces", href: "/workspaces", icon: Settings },
  { label: "Profile", href: "/settings/profile", icon: User },
];

export function DashboardHeader() {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U";

  return (
    <header className="md:hidden sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3">
      <HelpyLogo size="sm" textClassName="text-foreground" />

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => {
            document.dispatchEvent(
              new KeyboardEvent("keydown", { key: "k", metaKey: true }),
            );
          }}
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>
        <NotificationCenter />
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 border-b border-border bg-background p-4 space-y-1 shadow-lg">
          <div className="flex items-center gap-3 px-3 py-2 mb-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium text-foreground">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-muted-foreground">
                {user?.email || ""}
              </p>
            </div>
          </div>

          {mobileNav.map((item) => {
            const Icon = item.icon;
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-primary"
                    : "text-foreground hover:bg-accent",
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={() => {
              logout();
              window.location.href = "/login";
            }}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-destructive hover:bg-accent transition-colors"
          >
            <Settings className="h-4 w-4" />
            Log out
          </button>
        </div>
      )}
    </header>
  );
}
