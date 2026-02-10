"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  Bot,
  Headphones,
  Loader2,
  Send,
  User,
  XCircle,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  useConversation,
  useUpdateConversation,
} from "@/hooks/use-conversations";
import {
  ConversationDetailResponseDto,
  ConversationMessageResponseDto,
  UpdateConversationDto,
} from "@/lib/api/generated";
import { cn } from "@/lib/utils";

const messageSchema = z.object({
  content: z.string().min(1, "Message is required"),
});

type MessageForm = z.infer<typeof messageSchema>;

const statusConfig: Record<string, { label: string; className: string }> = {
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

const roleConfig: Record<
  ConversationMessageResponseDto.role,
  { label: string; icon: typeof User }
> = {
  [ConversationMessageResponseDto.role.CUSTOMER]: {
    label: "Customer",
    icon: User,
  },
  [ConversationMessageResponseDto.role.ASSISTANT]: { label: "AI", icon: Bot },
  [ConversationMessageResponseDto.role.AGENT]: {
    label: "Agent",
    icon: Headphones,
  },
};

export default function ConversationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const workspaceId = params.workspaceId as string;
  const conversationId = params.conversationId as string;

  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: conversation, isLoading } = useConversation(
    workspaceId,
    conversationId,
  );
  const updateMutation = useUpdateConversation(workspaceId);

  const form = useForm<MessageForm>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const messages = conversation?.messages ?? [];
  const isActive =
    conversation?.status === ConversationDetailResponseDto.status.ACTIVE;

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation?.messages]);

  const handleClose = () => {
    updateMutation.mutate(
      { conversationId, data: { status: UpdateConversationDto.status.CLOSED } },
      { onSuccess: () => toast.success("Conversation closed") },
    );
  };

  const handleSend = (_data: MessageForm) => {
    // TODO: Implement send message API
    toast.info("Agent message sending not yet implemented");
    form.reset();
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!conversation) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Conversation not found.</p>
      </div>
    );
  }

  const status = statusConfig[conversation.status] ?? {
    label: conversation.status,
    className: "",
  };

  return (
    <div className="flex flex-col h-[calc(100dvh-8rem)] md:h-[calc(100dvh-5rem)]">
      {/* Header */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              router.push(`/workspaces/${workspaceId}/conversations`)
            }
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold text-foreground font-mono">
                {conversation.customerId}
              </h1>
              <Badge variant="outline" className={status.className}>
                {status.label}
              </Badge>
              <Badge variant="outline">{conversation.channel}</Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              Started {new Date(conversation.createdAt).toLocaleString("ko-KR")}{" "}
              - {messages.length} messages
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isActive && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleClose}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <XCircle className="h-4 w-4" />
              )}
              Close
            </Button>
          )}
        </div>
      </div>

      <Separator />

      {/* Messages */}
      <ScrollArea className="flex-1 py-4">
        <div className="space-y-4 px-1">
          {messages.map((msg) => {
            const config = roleConfig[msg.role];
            const Icon = config.icon;
            const isCustomer =
              msg.role === ConversationMessageResponseDto.role.CUSTOMER;
            const isAssistant =
              msg.role === ConversationMessageResponseDto.role.ASSISTANT;
            const isAgent =
              msg.role === ConversationMessageResponseDto.role.AGENT;

            return (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-2.5",
                  !isCustomer ? "justify-end" : "justify-start",
                )}
              >
                {isCustomer && (
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted mt-0.5">
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                  </div>
                )}
                <div className="max-w-[70%] space-y-1">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                      isCustomer && "bg-muted text-foreground",
                      isAssistant && "bg-primary text-primary-foreground",
                      isAgent &&
                        "bg-emerald-600 text-white dark:bg-emerald-500",
                    )}
                  >
                    {msg.content}
                  </div>
                  <div
                    className={cn(
                      "flex items-center gap-1.5 px-1",
                      !isCustomer ? "justify-end" : "justify-start",
                    )}
                  >
                    {!isCustomer && (
                      <Badge
                        variant="outline"
                        className="text-[9px] px-1 py-0 h-4"
                      >
                        {config.label}
                      </Badge>
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {new Date(msg.createdAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                {!isCustomer && (
                  <div
                    className={cn(
                      "flex h-7 w-7 shrink-0 items-center justify-center rounded-full mt-0.5",
                      isAssistant ? "bg-primary/10" : "bg-emerald-500/10",
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-3.5 w-3.5",
                        isAssistant
                          ? "text-primary"
                          : "text-emerald-600 dark:text-emerald-400",
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input - only for active conversations */}
      {isActive && (
        <>
          <Separator />
          <div className="pt-4">
            <form
              onSubmit={form.handleSubmit(handleSend)}
              className="flex gap-2"
            >
              <Input
                {...form.register("content")}
                placeholder="Type a message as agent..."
                disabled={form.formState.isSubmitting}
              />
              <Button
                type="submit"
                disabled={
                  !form.formState.isValid || form.formState.isSubmitting
                }
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
