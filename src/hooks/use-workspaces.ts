import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { workspacesApi } from "@/lib/api";
import type {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  WorkspaceResponseDto,
} from "@/lib/api/generated";
import { useOrganizationStore } from "@/stores/organization-store";

export const workspaceKeys = {
  all: ["workspaces"] as const,
  lists: () => [...workspaceKeys.all, "list"] as const,
  list: (orgId: string) => [...workspaceKeys.lists(), orgId] as const,
  details: () => [...workspaceKeys.all, "detail"] as const,
  detail: (id: string) => [...workspaceKeys.details(), id] as const,
};

export function useWorkspaces() {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<WorkspaceResponseDto[]>({
    queryKey: workspaceKeys.list(currentOrgId ?? ""),
    queryFn: () => workspacesApi.getWorkspaces(),
    enabled: !!currentOrgId,
  });
}

export function useWorkspace(id: string) {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<WorkspaceResponseDto>({
    queryKey: workspaceKeys.detail(id),
    queryFn: () => workspacesApi.getWorkspace(id),
    enabled: !!id && !!currentOrgId,
  });
}

export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceDto) => workspacesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
    },
  });
}

export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkspaceDto }) =>
      workspacesApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
    },
  });
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.lists() });
    },
  });
}

export function useRegenerateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workspacesApi.regenerateApiKey(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: workspaceKeys.detail(id) });
    },
  });
}
