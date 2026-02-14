import { getCurrentOrgId } from "@/stores/organization-store";
import { apiClient, withTokenRefresh } from "./client";
import type { ChangePlanDto } from "./generated";

const getOrgId = () => {
  const orgId = getCurrentOrgId();
  if (!orgId) throw new Error("Organization not selected");
  return orgId;
};

export const subscriptionsApi = {
  get: () =>
    withTokenRefresh(() =>
      apiClient.subscriptions.subscriptionsControllerGetSubscription(
        getOrgId(),
      ),
    ),
  changePlan: (data: ChangePlanDto) =>
    withTokenRefresh(() =>
      apiClient.subscriptions.subscriptionsControllerChangePlan(
        getOrgId(),
        data,
      ),
    ),
  cancel: () =>
    withTokenRefresh(() =>
      apiClient.subscriptions.subscriptionsControllerCancelSubscription(
        getOrgId(),
      ),
    ),
  getUsage: () =>
    withTokenRefresh(() =>
      apiClient.subscriptionUsages.subscriptionUsagesControllerGetUsage(
        getOrgId(),
      ),
    ),
};
