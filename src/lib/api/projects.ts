import { apiClient, withTokenRefresh } from "./client";
import type { CreateProjectDto, UpdateProjectDto } from "./generated";

export const projectsApi = {
  getProjects: (organizationId: string) =>
    withTokenRefresh(() => apiClient.projects.getProjects(organizationId)),
  getProject: (id: string) =>
    withTokenRefresh(() => apiClient.projects.getProject(id)),
  create: (data: CreateProjectDto) =>
    withTokenRefresh(() => apiClient.projects.createProject(data)),
  update: (id: string, data: UpdateProjectDto) =>
    withTokenRefresh(() => apiClient.projects.updateProject(id, data)),
  delete: (id: string) =>
    withTokenRefresh(() => apiClient.projects.deleteProject(id)),
  regenerateApiKey: (id: string) =>
    withTokenRefresh(() => apiClient.projects.regenerateApiKey(id)),
};
