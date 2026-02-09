import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type {
  ConversationDetailResponseDto,
  ConversationResponseDto,
  UpdateConversationDto,
} from "@/lib/api/generated";

export const conversationKeys = {
  all: ["conversations"] as const,
  lists: () => [...conversationKeys.all, "list"] as const,
  list: (projectId: string) =>
    [...conversationKeys.lists(), projectId] as const,
  details: () => [...conversationKeys.all, "detail"] as const,
  detail: (projectId: string, conversationId: string) =>
    [...conversationKeys.details(), projectId, conversationId] as const,
};

export function useConversations(projectId: string) {
  return useQuery<ConversationResponseDto[]>({
    queryKey: conversationKeys.list(projectId),
    queryFn: () => apiClient.conversations.getConversations(projectId),
    enabled: !!projectId,
  });
}

export function useConversation(projectId: string, conversationId: string) {
  return useQuery<ConversationDetailResponseDto>({
    queryKey: conversationKeys.detail(projectId, conversationId),
    queryFn: () =>
      apiClient.conversations.getConversation(projectId, conversationId),
    enabled: !!projectId && !!conversationId,
  });
}

export function useUpdateConversation(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      conversationId,
      data,
    }: {
      conversationId: string;
      data: UpdateConversationDto;
    }) =>
      apiClient.conversations.updateConversation(
        projectId,
        conversationId,
        data,
      ),
    onSuccess: (_, { conversationId }) => {
      queryClient.invalidateQueries({
        queryKey: conversationKeys.detail(projectId, conversationId),
      });
      queryClient.invalidateQueries({
        queryKey: conversationKeys.list(projectId),
      });
    },
  });
}
