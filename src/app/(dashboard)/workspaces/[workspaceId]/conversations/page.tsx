"use client";

import { Loader2, MessageSquare, Search } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useConversations } from "@/hooks/use-conversations";

export default function ConversationsPage() {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: conversations = [], isLoading } = useConversations(workspaceId);

  const statusConfig: Record<string, { label: string; className: string }> = {
    ACTIVE: {
      label: t("status.active"),
      className:
        "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    },
    WAITING: {
      label: t("status.waiting"),
      className:
        "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    },
    CLOSED: {
      label: t("status.closed"),
      className: "bg-muted text-muted-foreground",
    },
  };

  const timeAgo = (dateStr: string): string => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return t("time.minutesAgo", { minutes: mins });
    const hours = Math.floor(mins / 60);
    if (hours < 24) return t("time.hoursAgo", { hours });
    const days = Math.floor(hours / 24);
    return t("time.daysAgo", { days });
  };

  const filtered = conversations.filter((conv) => {
    if (statusFilter !== "all" && conv.status !== statusFilter) return false;
    if (search && !conv.customerId.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {t("conversations.title")}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {t("conversations.description")}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("conversations.searchPlaceholder")}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("common.all")}</SelectItem>
            <SelectItem value="ACTIVE">{t("status.active")}</SelectItem>
            <SelectItem value="WAITING">{t("status.waiting")}</SelectItem>
            <SelectItem value="CLOSED">{t("status.closed")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Conversations table */}
      <Card>
        <CardContent className="p-0">
          {isLoading ? (
            <div className="flex h-64 items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                {t("conversations.empty")}
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t("conversations.customer")}</TableHead>
                  <TableHead className="text-center">
                    {t("conversations.messages")}
                  </TableHead>
                  <TableHead>{t("conversations.channel")}</TableHead>
                  <TableHead>{t("conversations.status")}</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    {t("conversations.started")}
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((conv) => {
                  const status = statusConfig[conv.status] ?? {
                    label: conv.status,
                    className: "",
                  };
                  return (
                    <TableRow
                      key={conv.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() =>
                        router.push(
                          `/workspaces/${workspaceId}/conversations/${conv.id}`,
                        )
                      }
                    >
                      <TableCell>
                        <span className="font-mono text-sm font-medium">
                          {conv.customerId}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm text-muted-foreground">
                          {conv.messageCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{conv.channel}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {timeAgo(conv.createdAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Total count */}
      {filtered.length > 0 && (
        <p className="text-sm text-muted-foreground">
          {t("conversations.count", { count: filtered.length })}
        </p>
      )}
    </div>
  );
}
