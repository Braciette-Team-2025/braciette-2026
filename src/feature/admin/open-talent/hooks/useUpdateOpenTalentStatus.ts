"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpenTalentStatus } from "../services/openTalentService";
import { openTalentKeys } from "./useOpenTalentListQuery";
import type { OpenTalentStatus } from "../types";

export function useUpdateOpenTalentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: OpenTalentStatus }) =>
      updateOpenTalentStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: openTalentKeys.lists(),
      });
    },
    onError: (error) => {
      console.error(
        "[updateOpenTalentStatus] Gagal memperbarui status:",
        error,
      );
    },
  });
}
