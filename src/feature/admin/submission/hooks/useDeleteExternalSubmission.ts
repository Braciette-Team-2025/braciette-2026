"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExternalSubmission } from "../services/submissionExternalService";
import { externalSubmissionKeys } from "./useExternalSubmissionList";

export function useDeleteExternalSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteExternalSubmission(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: externalSubmissionKeys.lists(),
      });
    },

    onError: (error) => {
      console.error("[deleteExternalSubmission] Gagal menghapus:", error);
    },
  });
}
