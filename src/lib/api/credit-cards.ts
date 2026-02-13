import { getCurrentOrgId } from "@/stores/organization-store";
import { apiClient, withTokenRefresh } from "./client";
import type { RegisterCreditCardDto } from "./generated";

const getOrgId = () => {
  const orgId = getCurrentOrgId();
  if (!orgId) throw new Error("Organization not selected");
  return orgId;
};

export const creditCardsApi = {
  list: () =>
    withTokenRefresh(() =>
      apiClient.creditCards.creditCardsControllerGetCreditCards(getOrgId()),
    ),
  create: (data: RegisterCreditCardDto) =>
    withTokenRefresh(() =>
      apiClient.creditCards.creditCardsControllerRegisterCreditCard(
        getOrgId(),
        data,
      ),
    ),
  delete: (id: string) =>
    withTokenRefresh(() =>
      apiClient.creditCards.creditCardsControllerDeleteCreditCard(
        getOrgId(),
        id,
      ),
    ),
};
