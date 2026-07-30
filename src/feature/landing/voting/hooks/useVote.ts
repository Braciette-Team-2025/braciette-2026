"use client";

import { useCallback, useState } from "react";
import { votingService } from "../services/voting.service";

export function useVote() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const selectOrganization = useCallback((organizationId: string) => {
    setSelectedOrganizationId((current) =>
      current === organizationId ? null : organizationId,
    );
  }, []);

  const confirmVote = useCallback(
    async (categoryId: string) => {
      if (!selectedOrganizationId) return;

      setIsSubmitting(true);
      const result = await votingService.submitVote({
        categoryId,
        organizationId: selectedOrganizationId,
      });
      setIsSubmitting(false);

      if (result.success) {
        setIsSuccessModalOpen(true);
      }
    },
    [selectedOrganizationId],
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
