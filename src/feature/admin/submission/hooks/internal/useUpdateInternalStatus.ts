import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInternalSubmissionStatus } from "../../services/submissionInternalService";
import { internalSubmissionKeys } from "./useInternalSubmissionList";

interface UpdateInternalStatusParams {
  id: string;
  status: "accepted" | "pending" | "rejected";
}

export function useUpdateInternalStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: UpdateInternalStatusParams) =>
      updateInternalSubmissionStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: internalSubmissionKeys.all,
      });
    },
    onError: (error) => {
      console.error("[updateInternalStatus] Gagal memperbarui status:", error);
    },
  });
}
