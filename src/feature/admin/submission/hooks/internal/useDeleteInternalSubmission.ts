"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteInternalSubmission } from "../../services/submissionInternalService";
import { internalSubmissionKeys } from "./useInternalSubmissionList";

export function useDeleteInternalSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteInternalSubmission(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: internalSubmissionKeys.lists(),
      });
    },

    onError: (error) => {
      console.error("[deleteInternalSubmission] Gagal menghapus:", error);
    },
  });
}
