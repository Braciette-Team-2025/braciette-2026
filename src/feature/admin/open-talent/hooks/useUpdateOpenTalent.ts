"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateOpenTalent } from "../services/openTalentService";
import { openTalentKeys } from "./useOpenTalentListQuery";
import type { OpenTalentPayload } from "../types";

export function useUpdateOpenTalent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: OpenTalentPayload }) =>
      updateOpenTalent(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: openTalentKeys.lists(),
      });
    },
    onError: (error) => {
      console.error("[updateOpenTalent] Gagal memperbarui data:", error);
    },
  });
}
