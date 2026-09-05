"use client";

import { useCallback, useState } from "react";
import { votingService } from "../services/voting.service";
import { useAuthStore } from "@/src/feature/auth/store/authStore";

export function useVote() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const markAsVoted = useAuthStore((state) => state.markAsVoted);

  const selectOrganization = useCallback(
    (organizationId: string) => {
      if (isSubmitting) {
        return;
      }

      setSelectedOrganizationId((current) =>
        current === organizationId ? null : organizationId,
      );
    },
    [isSubmitting],
  );

  const confirmVote = useCallback(
    async (categoryId: string) => {
      if (!selectedOrganizationId || isSubmitting) {
        return;
      }

      setIsSubmitting(true);

      try {
        const result = await votingService.submitVote({
          categoryId,
          organizationId: selectedOrganizationId,
        });

        if (result.success) {
          // Update status voting di Zustand
          markAsVoted(categoryId);

          setIsSuccessModalOpen(true);
        }
      } catch (error) {
        console.error("[useVote] Failed to submit vote:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [selectedOrganizationId, isSubmitting, markAsVoted],
  );

  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
    setSelectedOrganizationId(null);
  }, []);

  return {
    selectedOrganizationId,
    selectOrganization,
    confirmVote,
    isSubmitting,
    isSuccessModalOpen,
    closeSuccessModal,
  };
}
