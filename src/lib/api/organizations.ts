import { apiClient, withTokenRefresh } from "./client";
import type { UpdateOrganizationDto } from "./generated";

export const organizationsApi = {
  getMyOrganizations: () =>
    withTokenRefresh(() => apiClient.organizations.getMyOrganizations()),
  getOrganization: (id: string) =>
    withTokenRefresh(() => apiClient.organizations.getOrganization(id)),
  updateOrganization: (id: string, data: UpdateOrganizationDto) =>
    withTokenRefresh(() =>
      apiClient.organizations.updateOrganization(id, data),
    ),
};
