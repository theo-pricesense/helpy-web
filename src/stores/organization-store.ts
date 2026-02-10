"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface OrganizationState {
  currentOrgId: string | null;
  setCurrentOrgId: (orgId: string) => void;
  clear: () => void;
}

export const useOrganizationStore = create<OrganizationState>()(
  persist(
    (set) => ({
      currentOrgId: null,
      setCurrentOrgId: (orgId) => set({ currentOrgId: orgId }),
      clear: () => set({ currentOrgId: null }),
    }),
    {
      name: "organization-storage",
    },
  ),
);

export const getCurrentOrgId = () =>
  useOrganizationStore.getState().currentOrgId;
