import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspacesApi } from "@/lib/api";
import type {
  NotificationSettingsResponseDto,
  UpdateNotificationSettingsDto,
} from "@/lib/api/generated";
import { useOrganizationStore } from "@/stores/organization-store";

export const notificationSettingsKeys = {
  all: ["notificationSettings"] as const,
  detail: (workspaceId: string) =>
    [...notificationSettingsKeys.all, workspaceId] as const,
};

export function useNotificationSettings(workspaceId: string) {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<NotificationSettingsResponseDto>({
    queryKey: notificationSettingsKeys.detail(workspaceId),
    queryFn: () => workspacesApi.getNotificationSettings(workspaceId),
    enabled: !!workspaceId && !!currentOrgId,
  });
}

export function useUpdateNotificationSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: UpdateNotificationSettingsDto;
    }) => workspacesApi.updateNotificationSettings(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: notificationSettingsKeys.detail(workspaceId),
      });
    },
  });
}
