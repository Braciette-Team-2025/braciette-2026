"use client";

import { useState } from "react";
import type { StepOneValues, StepTwoValues } from "../types/ormawa";

export function useCreateOrmawaInternal() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<StepOneValues | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleStepOneNext = (data: StepOneValues) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
  };

  const handleStepTwoSubmit = (_data: StepTwoValues) => {
    setOpenConfirm(true);
  };

  const handleConfirm = () => {
    setOpenConfirm(false);
  };

  return {
    currentStep,
    stepOneData,
    openConfirm,
    setOpenConfirm,
    handleStepOneNext,
    handleStepTwoBack,
    handleStepTwoSubmit,
    handleConfirm,
  };
}
