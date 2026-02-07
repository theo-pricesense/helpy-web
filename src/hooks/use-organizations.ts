import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { organizationsApi } from "@/lib/api";
import type { UpdateOrganizationDto } from "@/lib/api/generated";
import type { Organization } from "@/lib/types";

export const organizationKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationKeys.all, "list"] as const,
  list: () => [...organizationKeys.lists()] as const,
  details: () => [...organizationKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,
};

export function useOrganizations() {
  return useQuery<Organization[]>({
    queryKey: organizationKeys.list(),
    queryFn: () => organizationsApi.getMyOrganizations(),
  });
}

export function useOrganization(id: string) {
  return useQuery<Organization>({
    queryKey: organizationKeys.detail(id),
    queryFn: () => organizationsApi.getOrganization(id),
    enabled: !!id,
  });
}

export function useUpdateOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationDto }) =>
      organizationsApi.updateOrganization(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: organizationKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: organizationKeys.lists() });
    },
  });
}
