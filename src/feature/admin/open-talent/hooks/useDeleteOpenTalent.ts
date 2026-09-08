"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteOpenTalent } from "../services/openTalentService";
import { openTalentKeys } from "./useOpenTalentListQuery";

export function useDeleteOpenTalent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteOpenTalent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: openTalentKeys.lists(),
      });
    },
    onError: (error) => {
      console.error("[deleteOpenTalent] Gagal menghapus data:", error);
    },
  });
}
