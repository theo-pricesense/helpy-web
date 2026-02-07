import { apiClient, withTokenRefresh } from "./client";
import type { UpdateMeDto } from "./generated";

export const usersApi = {
  getMe: () => withTokenRefresh(() => apiClient.users.getMe()),
  updateMe: (data: UpdateMeDto) =>
    withTokenRefresh(() => apiClient.users.updateMe(data)),
  deleteMe: () => withTokenRefresh(() => apiClient.users.deleteMe()),
};
