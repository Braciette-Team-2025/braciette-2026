"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateInternalSubmission } from "../../services/submissionInternalService";
import { internalSubmissionKeys } from "./useInternalSubmissionList";
import type {
  InternalSubmissionDetail,
  InternalOrmawaType,
  StepOneValues,
  StepTwoValues,
} from "../../types/ormawa";

export function useEditInternalSubmission(
  initialData: InternalSubmissionDetail,
) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<StepOneValues | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [pendingStepTwo, setPendingStepTwo] = useState<StepTwoValues | null>(
    null,
  );

  /**
   * Ref untuk menyimpan nilai form terbaru agar bisa diakses dari onMutate closure
   * tanpa perlu depends pada state React (yang mungkin sudah stale).
   */
  const stepOneDataRef = useRef<StepOneValues | null>(null);

  const { mutate: update, isPending } = useMutation({
    mutationFn: (formData: FormData) =>
      updateInternalSubmission(initialData.id, formData),

    /**
     * OPTIMISTIC UPDATE:
     * Update cache lokal secara langsung sebelum response API datang,
     * sehingga saat user kembali ke halaman list, data sudah tampil dengan nilai baru.
     */
    onMutate: async () => {
      // Cancel in-flight refetches agar tidak overwrite optimistic update
      await queryClient.cancelQueries({ queryKey: internalSubmissionKeys.all });

      // Snapshot semua cached list queries untuk rollback jika error
      const previousData = queryClient.getQueriesData({
        queryKey: internalSubmissionKeys.lists(),
      });

      // Nilai optimistic: ambil dari ref (selalu up-to-date)
      const latestStepOne = stepOneDataRef.current;

      // Update setiap cached list: ganti item yang id-nya cocok dengan nilai baru
      queryClient.setQueriesData(
        { queryKey: internalSubmissionKeys.lists() },
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
                item.id === initialData.id
                  ? {
                      ...item,
                      name: latestStepOne?.namaOrmawa ?? item.name,
                      type: latestStepOne?.jenisOrmawa ?? item.type,
                      pic: latestStepOne?.pic ?? item.pic,
                      pic_contact: latestStepOne?.kontakPic ?? item.pic_contact,
                    }
                  : item,
              ),
            },
          };
        },
      );

      return { previousData };
    },

    onError: (_err, _vars, context) => {
      // Rollback ke snapshot sebelumnya jika terjadi error
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      console.error("[useEditInternalSubmission] Gagal memperbarui");
      setOpenConfirm(false);
    },

    onSuccess: () => {
      setOpenConfirm(false);
      // Navigate dulu — user melihat data optimistic
      router.push("/admin/submission?tab=internal");
      // Invalidate setelah delay agar server punya waktu commit update
      // sebelum refetch dipicu — mencegah data lama overwrite optimistic cache
      setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: internalSubmissionKeys.all });
      }, 3000);
    },
  });

  const handleStepOneNext = (data: StepOneValues) => {
    setStepOneData(data);
    // Simpan juga ke ref agar tersedia saat onMutate closure dipanggil
    stepOneDataRef.current = data;
    setCurrentStep(2);
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
  };

  const handleStepTwoSubmit = (data: StepTwoValues) => {
    setPendingStepTwo(data);
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    if (!stepOneData || !pendingStepTwo) return;

    const formData = new FormData();

    // Step 1 fields
    formData.append("name", stepOneData.namaOrmawa);
    formData.append("type", stepOneData.jenisOrmawa);
    formData.append("cabinet_name", stepOneData.namaKabinet);
    formData.append("pic", stepOneData.pic);
    formData.append("pic_contact", stepOneData.kontakPic);
    formData.append("short_description", stepOneData.deskripsi);
    formData.append("major_program", stepOneData.programKerja);

    // Step 2 fields
    formData.append("drive_link", pendingStepTwo.driveLink);
    formData.append(
      "nominations",
      pendingStepTwo.selectedNominations.join(","),
    );
    formData.append(
      "social_medias",
      JSON.stringify(initialData.social_medias ?? []),
    );

    if (pendingStepTwo.competitions?.length > 0) {
      pendingStepTwo.competitions.forEach((comp) => {
        if (comp.name.trim()) {
          formData.append("competitions[]", comp.name);
        }
      });
    }

    update(formData);
  };

  /**
   * Initial values untuk pre-fill form dari data sebelumnya
   */
  const stepOneInitial: StepOneValues = {
    jenisOrmawa: initialData.type as InternalOrmawaType,
    namaOrmawa: initialData.name,
    namaKabinet: initialData.cabinet_name ?? "",
    pic: initialData.pic ?? "",
    kontakPic: initialData.pic_contact ?? "",
    deskripsi: initialData.short_description ?? "",
    programKerja: initialData.major_program ?? "",
  };

  const stepTwoInitial: Partial<StepTwoValues> = {
    selectedNominations: initialData.nominations ?? [],
    driveLink: initialData.drive_link ?? "",
  };

  return {
    currentStep,
    stepOneData,
    stepOneInitial,
    stepTwoInitial,
    openConfirm,
    setOpenConfirm,
    isPending,
    handleStepOneNext,
    handleStepTwoBack,
    handleStepTwoSubmit,
    handleConfirm,
  };
}
