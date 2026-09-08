"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { createOpenTalent } from "../services/openTalentService";

export function useCreateOpenTalent() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [openConfirm, setOpenConfirm] = useState(false);

  const [stepOneData, setStepOneData] = useState({
    namaKetua: "",
    asalFakultas: "",
    kontakKetua: "",
  });

  const [stepTwoData, setStepTwoData] = useState({
    talentDitampilkan: "",
    jenisPenampilan: "Individu",
    jumlahAnggota: 1,
    linkDrive: "",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      createOpenTalent({
        leader_name: stepOneData.namaKetua,
        leader_faculty: stepOneData.asalFakultas,
        leader_wa_contact: stepOneData.kontakKetua,
        talent_name: stepTwoData.talentDitampilkan,
        performance_type: stepTwoData.jenisPenampilan,
        member_count:
          stepTwoData.jenisPenampilan !== "Individu"
            ? stepTwoData.jumlahAnggota
            : 0,
        drive_link: stepTwoData.linkDrive,
      }),
    onSuccess: () => {
      setOpenConfirm(false);
      router.push("/admin/open-talent");
    },
    onError: (error) => {
      console.error("[createOpenTalent] Gagal menyimpan data:", error);
      setOpenConfirm(false);
    },
  });

  const handleNext = () => setCurrentStep(2);
  const handleBack = () => setCurrentStep(1);
  const handleSubmitStepTwo = () => setOpenConfirm(true);
  const handleConfirm = () => mutate();

  return {
    currentStep,
    openConfirm,
    setOpenConfirm,
    stepOneData,
    setStepOneData,
    stepTwoData,
    setStepTwoData,
    handleNext,
    handleBack,
    handleSubmitStepTwo,
    handleConfirm,
    isPending,
  };
}
