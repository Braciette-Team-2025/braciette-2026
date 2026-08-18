"use client";

import { useState } from "react";
import { openTalentFormService } from "../services/openTalentForm.service";
import { EMPTY_OPEN_TALENT_FORM_VALUES } from "../constants/performanceType";
import { OpenTalentFormValues } from "../types/openTalentForm";

interface UseOpenTalentFormOptions {
  initialValues?: OpenTalentFormValues;
}

export function useOpenTalentForm({
  initialValues,
}: UseOpenTalentFormOptions = {}) {
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<OpenTalentFormValues>(
    initialValues ?? EMPTY_OPEN_TALENT_FORM_VALUES,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const setField = <K extends keyof OpenTalentFormValues>(
    field: K,
    value: OpenTalentFormValues[K],
  ) => {
    setValues((prev) => {
      const next = { ...prev, [field]: value };

      if (field === "performanceType" && value === "Individu") {
        next.memberCount = 1;
      }

      return next;
    });
  };

  const isStepOneValid = Boolean(
    values.leaderName.trim() &&
    values.faculty.trim() &&
    values.leaderContact.trim(),
  );

  const isStepTwoValid = Boolean(
    values.talent.trim() && values.performanceType && values.driveLink.trim(),
  );

  const goToStepTwo = () => {
    if (isStepOneValid) setStep(2);
  };

  const goToStepOne = () => setStep(1);

  const submit = async () => {
    if (!isStepTwoValid) return;
    setIsSubmitting(true);
    await openTalentFormService.submit(values);
    setIsSubmitting(false);
    setIsSuccessModalOpen(true);
  };

  const closeSuccessModal = () => {
    setIsSuccessModalOpen(false);
    setHasSubmitted(true);
  };

  return {
    step,
    values,
    setField,
    isStepOneValid,
    isStepTwoValid,
    goToStepTwo,
    goToStepOne,
    submit,
    isSubmitting,
    isSuccessModalOpen,
    closeSuccessModal,
    hasSubmitted,
  };
}
