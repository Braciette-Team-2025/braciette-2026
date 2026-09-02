"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createExternalSubmission } from "../../services/submissionExternalService";
import { externalSubmissionKeys } from "./useExternalSubmissionList";

export function useCreateExternalSubmission() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (formData: FormData) => createExternalSubmission(formData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: externalSubmissionKeys.lists(),
      });
      router.push("/admin/submission?tab=external");
    },

    onError: (error) => {
      console.error(
        "[createExternalSubmission] Gagal membuat submission:",
        error,
      );
    },
  });
}
