"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExternalSubmission } from "../../services/submissionExternalService";
import { externalSubmissionKeys } from "./useExternalSubmissionList";

export function useUpdateExternalSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      formData,
    }: {
      id: number | string;
      formData: FormData;
    }) => updateExternalSubmission(id, formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: externalSubmissionKeys.lists(),
      });
    },

    onError: (error) => {
      console.error(
        "[updateExternalSubmission] Gagal mengubah submission:",
        error,
      );
    },
  });
}
