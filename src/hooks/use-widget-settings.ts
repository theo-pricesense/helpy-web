import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspacesApi } from "@/lib/api";
import type {
  UpdateWidgetSettingsDto,
  WidgetSettingsResponseDto,
} from "@/lib/api/generated";
import { useOrganizationStore } from "@/stores/organization-store";

export const widgetSettingsKeys = {
  all: ["widgetSettings"] as const,
  detail: (workspaceId: string) =>
    [...widgetSettingsKeys.all, workspaceId] as const,
};

export function useWidgetSettings(workspaceId: string) {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<WidgetSettingsResponseDto>({
    queryKey: widgetSettingsKeys.detail(workspaceId),
    queryFn: () => workspacesApi.getWidgetSettings(workspaceId),
    enabled: !!workspaceId && !!currentOrgId,
  });
}

export function useUpdateWidgetSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      workspaceId,
      data,
    }: {
      workspaceId: string;
      data: UpdateWidgetSettingsDto;
    }) => workspacesApi.updateWidgetSettings(workspaceId, data),
    onSuccess: (_, { workspaceId }) => {
      queryClient.invalidateQueries({
        queryKey: widgetSettingsKeys.detail(workspaceId),
      });
    },
  });
}
