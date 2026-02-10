import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type {
  InviteMemberDto,
  OrganizationInvitationResponseDto,
  OrganizationMemberResponseDto,
  OrganizationResponseDto,
  OrganizationWithRoleResponseDto,
  UpdateMemberRoleDto,
  UpdateOrganizationDto,
} from "@/lib/api/generated";
import { useOrganizationStore } from "@/stores/organization-store";

const organizationsApi = apiClient.organizations;

export const organizationKeys = {
  all: ["organizations"] as const,
  lists: () => [...organizationKeys.all, "list"] as const,
  list: () => [...organizationKeys.lists()] as const,
  details: () => [...organizationKeys.all, "detail"] as const,
  detail: (id: string) => [...organizationKeys.details(), id] as const,
  members: (orgId: string) =>
    [...organizationKeys.all, "members", orgId] as const,
  invitations: (orgId: string) =>
    [...organizationKeys.all, "invitations", orgId] as const,
};

export function useOrganizations() {
  return useQuery<OrganizationWithRoleResponseDto[]>({
    queryKey: organizationKeys.list(),
    queryFn: () => organizationsApi.getMyOrganizations(),
  });
}

export function useOrganization(id: string) {
  return useQuery<OrganizationResponseDto>({
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

export function useOrganizationMembers() {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<OrganizationMemberResponseDto[]>({
    queryKey: organizationKeys.members(currentOrgId ?? ""),
    queryFn: () => organizationsApi.getOrganizationMembers(currentOrgId!),
    enabled: !!currentOrgId,
  });
}

export function useOrganizationInvitations() {
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useQuery<OrganizationInvitationResponseDto[]>({
    queryKey: organizationKeys.invitations(currentOrgId ?? ""),
    queryFn: () => organizationsApi.getOrganizationInvitations(currentOrgId!),
    enabled: !!currentOrgId,
  });
}

export function useInviteMember() {
  const queryClient = useQueryClient();
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useMutation({
    mutationFn: (data: InviteMemberDto) =>
      organizationsApi.inviteMember(currentOrgId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.invitations(currentOrgId!),
      });
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(currentOrgId!),
      });
    },
  });
}

export function useCancelInvitation() {
  const queryClient = useQueryClient();
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useMutation({
    mutationFn: (invitationId: string) =>
      organizationsApi.cancelInvitation(invitationId, currentOrgId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.invitations(currentOrgId!),
      });
    },
  });
}

export function useUpdateMemberRole() {
  const queryClient = useQueryClient();
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useMutation({
    mutationFn: ({
      memberId,
      data,
    }: {
      memberId: string;
      data: UpdateMemberRoleDto;
    }) => organizationsApi.updateMemberRole(memberId, currentOrgId!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(currentOrgId!),
      });
    },
  });
}

export function useRemoveMember() {
  const queryClient = useQueryClient();
  const currentOrgId = useOrganizationStore((s) => s.currentOrgId);

  return useMutation({
    mutationFn: (memberId: string) =>
      organizationsApi.removeMember(memberId, currentOrgId!),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: organizationKeys.members(currentOrgId!),
      });
    },
  });
}
