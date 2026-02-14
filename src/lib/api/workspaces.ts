import { getCurrentOrgId } from "@/stores/organization-store";
import { apiClient, withTokenRefresh } from "./client";
import type {
  CreateWorkspaceDto,
  UpdateNotificationSettingsDto,
  UpdateWidgetSettingsDto,
  UpdateWorkspaceDto,
} from "./generated";

const getOrgId = () => {
  const orgId = getCurrentOrgId();
  if (!orgId) throw new Error("Organization not selected");
  return orgId;
};

export const workspacesApi = {
  getWorkspaces: () =>
    withTokenRefresh(() => apiClient.workspaces.getWorkspaces(getOrgId())),
  getWorkspace: (id: string) =>
    withTokenRefresh(() => apiClient.workspaces.getWorkspace(getOrgId(), id)),
  create: (data: CreateWorkspaceDto) =>
    withTokenRefresh(() =>
      apiClient.workspaces.createWorkspace(getOrgId(), data),
    ),
  update: (id: string, data: UpdateWorkspaceDto) =>
    withTokenRefresh(() =>
      apiClient.workspaces.updateWorkspace(getOrgId(), id, data),
    ),
  delete: (id: string) =>
    withTokenRefresh(() =>
      apiClient.workspaces.deleteWorkspace(getOrgId(), id),
    ),
  regenerateApiKey: (id: string) =>
    withTokenRefresh(() =>
      apiClient.workspaces.regenerateApiKey(getOrgId(), id),
    ),
  getWidgetSettings: (id: string) =>
    withTokenRefresh(() =>
      apiClient.workspaces.getWidgetSettings(getOrgId(), id),
    ),
  updateWidgetSettings: (id: string, data: UpdateWidgetSettingsDto) =>
    withTokenRefresh(() =>
      apiClient.workspaces.updateWidgetSettings(getOrgId(), id, data),
    ),
  getNotificationSettings: (id: string) =>
    withTokenRefresh(() =>
      apiClient.workspaces.getNotificationSettings(getOrgId(), id),
    ),
  updateNotificationSettings: (
    id: string,
    data: UpdateNotificationSettingsDto,
  ) =>
    withTokenRefresh(() =>
      apiClient.workspaces.updateNotificationSettings(getOrgId(), id, data),
    ),
};
