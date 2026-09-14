"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExternalSubmission } from "../../services/submissionExternalService";
import { externalSubmissionKeys } from "./useExternalSubmissionList";
import type { ExternalOrmawaType } from "../../types/ormawa";

interface UpdateExternalParams {
  id: number | string;
  formData: FormData;
  /** Nilai optimistic untuk update cache lokal sebelum response API datang */
  optimisticValues?: {
    name?: string;
    type?: ExternalOrmawaType;
  };
}

export function useUpdateExternalSubmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, formData }: UpdateExternalParams) =>
      updateExternalSubmission(id, formData),

    /**
     * OPTIMISTIC UPDATE:
     * Update cache lokal langsung sebelum response API datang,
     * sehingga saat user kembali ke halaman list data sudah tampil dengan nilai baru.
     */
    onMutate: async ({ id, optimisticValues }) => {
      // Cancel in-flight refetches agar tidak overwrite optimistic update
      await queryClient.cancelQueries({
        queryKey: externalSubmissionKeys.lists(),
      });

      // Snapshot untuk rollback jika error
      const previousData = queryClient.getQueriesData({
        queryKey: externalSubmissionKeys.lists(),
      });

      if (optimisticValues) {
        // Update setiap cached list: ganti item yang id-nya cocok
        queryClient.setQueriesData(
          { queryKey: externalSubmissionKeys.lists() },
          (old: unknown) => {
            if (!old || typeof old !== "object") return old;
            const response = old as {
              data?: {
                data?: Array<Record<string, unknown>>;
                [key: string]: unknown;
              };
              [key: string]: unknown;
            };
            if (!response.data?.data) return old;
            return {
              ...response,
              data: {
                ...response.data,
                data: response.data.data.map((item) =>
                  item.id === id
                    ? {
                        ...item,
                        ...(optimisticValues.name !== undefined && {
                          name: optimisticValues.name,
                        }),
                        ...(optimisticValues.type !== undefined && {
                          type: optimisticValues.type,
                        }),
                      }
                    : item,
                ),
              },
            };
          },
        );
      }

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      // Rollback ke snapshot sebelumnya jika terjadi error
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      console.error("[updateExternalSubmission] Gagal mengubah submission");
    },

    onSuccess: (_data, { optimisticValues }) => {
      // Jika tidak ada optimistic update sebelumnya, invalidate langsung
      if (!optimisticValues) {
        queryClient.invalidateQueries({
          queryKey: externalSubmissionKeys.lists(),
        });
        return;
      }
      // Invalidate setelah delay agar server punya waktu commit update
      // sebelum refetch dipicu — mencegah data lama overwrite optimistic cache
      setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: externalSubmissionKeys.lists(),
        });
      }, 3000);
    },
  });
}
