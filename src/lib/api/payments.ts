import { getCurrentOrgId } from "@/stores/organization-store";
import { apiClient, withTokenRefresh } from "./client";

const getOrgId = () => {
  const orgId = getCurrentOrgId();
  if (!orgId) throw new Error("Organization not selected");
  return orgId;
};

export const paymentsApi = {
  list: (limit?: number, offset?: number) =>
    withTokenRefresh(() =>
      apiClient.payments.paymentsControllerGetPayments(
        getOrgId(),
        limit,
        offset,
      ),
    ),
};
