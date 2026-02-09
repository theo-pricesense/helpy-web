"use client";

import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  MessageSquare,
  Search,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import type { ConversationResponseDto } from "@/lib/api/generated";

type ConversationStatus = ConversationResponseDto.status;

const statusConfig: Record<
  ConversationStatus,
  { label: string; className: string }
> = {
  ACTIVE: {
    label: "Active",
    className:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  WAITING: {
    label: "Waiting",
    className:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  CLOSED: { label: "Closed", className: "bg-muted text-muted-foreground" },
};

const channelLabel: Record<ConversationResponseDto.channel, string> = {
  WIDGET: "Widget",
  KAKAO: "Kakao",
  SLACK: "Slack",
};

function timeAgo(dateStr: string | undefined): string {
  if (!dateStr) return "-";
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function ConversationsPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.projectId as string;

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const perPage = 10;

  const { data: conversations = [], isLoading } = useConversations(projectId);

  // Client-side filtering
  const filteredConversations = useMemo(() => {
    return conversations.filter((c) => {
      if (statusFilter !== "all" && c.status !== statusFilter) return false;
      if (search && !c.customerId.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [conversations, statusFilter, search]);

  // Pagination
  const total = filteredConversations.length;
  const totalPages = Math.ceil(total / perPage);
  const paginatedConversations = useMemo(() => {
    const start = (page - 1) * perPage;
    return filteredConversations.slice(start, start + perPage);
  }, [filteredConversations, page]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Conversations
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage customer conversations.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search conversations..."
            className="pl-9"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="ACTIVE">Active</SelectItem>
            <SelectItem value="WAITING">Waiting</SelectItem>
            <SelectItem value="CLOSED">Closed</SelectItem>
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
          ) : paginatedConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare className="h-8 w-8 text-muted-foreground/50 mb-2" />
              <p className="text-sm text-muted-foreground">
                No conversations found.
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Channel
                  </TableHead>
                  <TableHead className="text-center">Messages</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden sm:table-cell">
                    Last Activity
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedConversations.map((conv) => {
                  const status = statusConfig[conv.status];
                  return (
                    <TableRow
                      key={conv.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() =>
                        router.push(
                          `/projects/${projectId}/conversations/${conv.id}`,
                        )
                      }
                    >
                      <TableCell>
                        <span className="font-mono text-sm font-medium">
                          {conv.customerId}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className="text-sm text-muted-foreground">
                          {channelLabel[conv.channel]}
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="text-sm text-muted-foreground">
                          {conv.messageCount}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={status.className}>
                          {status.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-muted-foreground">
                        {timeAgo(conv.lastMessageAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">{total} conversations</p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              {page} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
