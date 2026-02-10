import { apiClient, withTokenRefresh } from "./client";
import type { CreateWorkspaceDto, UpdateWorkspaceDto } from "./generated";

export const workspacesApi = {
  getWorkspaces: (organizationId: string) =>
    withTokenRefresh(() => apiClient.workspaces.getWorkspaces(organizationId)),
  getWorkspace: (id: string) =>
    withTokenRefresh(() => apiClient.workspaces.getWorkspace(id)),
  create: (data: CreateWorkspaceDto) =>
    withTokenRefresh(() => apiClient.workspaces.createWorkspace(data)),
  update: (id: string, data: UpdateWorkspaceDto) =>
    withTokenRefresh(() => apiClient.workspaces.updateWorkspace(id, data)),
  delete: (id: string) =>
    withTokenRefresh(() => apiClient.workspaces.deleteWorkspace(id)),
  regenerateApiKey: (id: string) =>
    withTokenRefresh(() => apiClient.workspaces.regenerateApiKey(id)),
};
