"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    jenisPenampilan: "",
    jumlahAnggota: 1,
    linkDrive: "",
  });

  const handleNext = () => {
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  const handleSubmitStepTwo = () => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
    router.push("/admin/open-talent");
  };

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
  };
}
