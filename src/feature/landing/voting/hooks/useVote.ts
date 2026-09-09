"use client";

import { useCallback, useState } from "react";
import { votingService } from "../services/voting.service";
import { useAuthStore } from "@/src/feature/auth/store/authStore";

export function useVote() {
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    string | null
  >(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [pendingCategoryId, setPendingCategoryId] = useState<string | null>(
    null,
  );
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

  // Step 1: buka modal konfirmasi, simpan categoryId dulu
  const openConfirmModal = useCallback((categoryId: string) => {
    setPendingCategoryId(categoryId);
    setIsConfirmModalOpen(true);
  }, []);

  const closeConfirmModal = useCallback(() => {
    setIsConfirmModalOpen(false);
    setPendingCategoryId(null);
  }, []);

  // Step 2: dipanggil saat user klik Submit di modal konfirmasi
  const confirmVote = useCallback(async () => {
    if (!selectedOrganizationId || !pendingCategoryId || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setIsConfirmModalOpen(false);

    try {
      const result = await votingService.submitVote({
        categoryId: pendingCategoryId,
        organizationId: selectedOrganizationId,
      });

      if (result.success) {
        markAsVoted(pendingCategoryId);
        setIsSuccessModalOpen(true);
      }
    } catch (error) {
      console.error("[useVote] Failed to submit vote:", error);
      setIsConfirmModalOpen(true); // kembalikan modal jika gagal
    } finally {
      setIsSubmitting(false);
      setPendingCategoryId(null);
    }
  }, [selectedOrganizationId, pendingCategoryId, isSubmitting, markAsVoted]);

  const closeSuccessModal = useCallback(() => {
    setIsSuccessModalOpen(false);
    setSelectedOrganizationId(null);
  }, []);

  return {
    selectedOrganizationId,
    selectOrganization,
    openConfirmModal,
    closeConfirmModal,
    confirmVote,
    isSubmitting,
    isConfirmModalOpen,
    isSuccessModalOpen,
    closeSuccessModal,
  };
}
