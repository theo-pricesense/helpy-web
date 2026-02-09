"use client";

import {
  AlertTriangle,
  AtSign,
  Bell,
  CheckCheck,
  FileCheck,
  ThumbsDown,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type NotificationType =
  | "escalation"
  | "low_satisfaction"
  | "document_processed"
  | "mention";

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  description: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

const typeConfig: Record<
  NotificationType,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  escalation: { icon: AlertTriangle, color: "text-amber-500" },
  low_satisfaction: { icon: ThumbsDown, color: "text-destructive" },
  document_processed: { icon: FileCheck, color: "text-emerald-500" },
  mention: { icon: AtSign, color: "text-primary" },
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

export function NotificationCenter() {
  const router = useRouter();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);

  const loadNotifications = useCallback(async () => {
    // TODO: Replace with actual API call when available
    // try {
    //   const data = await notificationsApi.list();
    //   setNotifications(data);
    // } catch {
    setNotifications([
      {
        id: "n-1",
        type: "escalation",
        title: "Escalation Required",
        description: "Customer customer_8a2f is requesting human assistance.",
        read: false,
        createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
        link: "/projects/proj-1/conversations/conv-1",
      },
      {
        id: "n-2",
        type: "low_satisfaction",
        title: "Low Satisfaction Alert",
        description: "Customer rated conversation 1/5 stars.",
        read: false,
        createdAt: new Date(Date.now() - 30 * 60000).toISOString(),
        link: "/projects/proj-1/conversations/conv-2",
      },
      {
        id: "n-3",
        type: "document_processed",
        title: "Document Processed",
        description: "product-guide.pdf has been processed successfully.",
        read: true,
        createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
        link: "/projects/proj-1/documents",
      },
      {
        id: "n-4",
        type: "mention",
        title: "Mentioned by Lee Jiyeon",
        description: "You were mentioned in a conversation note.",
        read: true,
        createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
      },
    ]);
    // }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleClick = (notification: Notification) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notification.id ? { ...n, read: true } : n)),
    );
    if (notification.link) {
      router.push(notification.link);
      setOpen(false);
    }
  };

  const markAllRead = async () => {
    // TODO: Replace with actual API call when available
    // try {
    //   await notificationsApi.markAllRead();
    // } catch {
    //   // proceed anyway
    // }
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-8 w-8">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] font-bold text-destructive-foreground">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between px-4 py-3">
          <h3 className="text-sm font-semibold text-foreground">
            Notifications
          </h3>
          {unreadCount > 0 && (
            <button
              type="button"
              onClick={markAllRead}
              className="flex items-center gap-1 text-xs text-primary hover:underline"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Mark all read
            </button>
          )}
        </div>
        <Separator />
        <ScrollArea className="max-h-[360px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className="h-6 w-6 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No notifications yet
              </p>
            </div>
          ) : (
            <div>
              {notifications.map((notification) => {
                const config = typeConfig[notification.type];
                const Icon = config.icon;
                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => handleClick(notification)}
                    className={cn(
                      "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-muted/50",
                      !notification.read && "bg-primary/5",
                    )}
                  >
                    <div className={cn("mt-0.5 shrink-0", config.color)}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-2">
                        <p
                          className={cn(
                            "text-sm truncate",
                            !notification.read
                              ? "font-medium text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {notification.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70">
                        {timeAgo(notification.createdAt)}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </ScrollArea>
        <Separator />
        <div className="px-4 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground"
            asChild
          >
            <a href="/settings/notifications">Notification Settings</a>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
