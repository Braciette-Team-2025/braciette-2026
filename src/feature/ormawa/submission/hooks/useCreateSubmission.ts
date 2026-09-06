"use client";

import { useMutation } from "@tanstack/react-query";
import { createInternalSubmission } from "../services/submissionService";

interface UseCreateSubmissionOptions {
  onSubmitSuccess?: () => void;
}

export function useCreateSubmission({
  onSubmitSuccess,
}: UseCreateSubmissionOptions = {}) {
  return useMutation({
    mutationFn: (formData: FormData) => createInternalSubmission(formData),

    onSuccess: () => {
      if (onSubmitSuccess) onSubmitSuccess();
    },

    onError: (error) => {
      console.error("[useCreateSubmission] Gagal membuat submission:", error);
    },
  });
}
