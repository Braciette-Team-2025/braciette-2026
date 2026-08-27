"use client";

import { useState } from "react";
import {
  openTalentFormService,
  OpenTalentSubmitError,
} from "../services/openTalentForm.service";
import { EMPTY_OPEN_TALENT_FORM_VALUES } from "../constants/performanceType";
import { OpenTalentFormValues } from "../types/openTalentForm";
import { isValidDriveLink } from "../utils/validation";

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
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    // Ubah field apapun setelah submit gagal -> bersihkan pesan error lama,
    // supaya tidak nyangkut nampilin error basi begitu user mulai benerin.
    if (submitError) setSubmitError(null);
  };

  const isStepOneValid = Boolean(
    values.leaderName.trim() &&
    values.faculty.trim() &&
    values.leaderContact.trim(),
  );

  const isDriveLinkValid = isValidDriveLink(values.driveLink);

  // Pesan error di bawah field Link Drive — cuma tampil kalau user SUDAH
  // isi sesuatu tapi formatnya salah, bukan begitu field masih kosong.
  const driveLinkError =
    values.driveLink.trim().length > 0 && !isDriveLinkValid
      ? "Link harus diawali https://drive.google.com/"
      : null;

  const isStepTwoValid = Boolean(
    values.talent.trim() &&
    values.performanceType &&
    values.driveLink.trim() &&
    isDriveLinkValid,
  );

  const goToStepTwo = () => {
    if (isStepOneValid) setStep(2);
  };

  const goToStepOne = () => setStep(1);

  const submit = async () => {
    if (!isStepTwoValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await openTalentFormService.submit(values);
      setIsSuccessModalOpen(true);
    } catch (error) {
      setSubmitError(
        error instanceof OpenTalentSubmitError
          ? error.message
          : "Gagal mengirim pendaftaran, coba lagi.",
      );
    } finally {
      setIsSubmitting(false);
    }
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
    driveLinkError,
    goToStepTwo,
    goToStepOne,
    submit,
    isSubmitting,
    isSuccessModalOpen,
    closeSuccessModal,
    hasSubmitted,
    submitError,
  };
}
