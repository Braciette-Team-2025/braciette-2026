"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [values, setValues] = useState<OpenTalentFormValues>(
    initialValues ?? EMPTY_OPEN_TALENT_FORM_VALUES,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof OpenTalentFormValues, string>>
  >({});

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

    // Bersihkan error field yang sedang diedit
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

    if (submitError) setSubmitError(null);
  };

  const isDriveLinkValid = isValidDriveLink(values.driveLink);

  const driveLinkError =
    values.driveLink.trim().length > 0 && !isDriveLinkValid
      ? "Link harus diawali https://drive.google.com/"
      : null;

  const goToStepTwo = () => {
    const errors: Partial<Record<keyof OpenTalentFormValues, string>> = {};

    if (!values.leaderName.trim()) {
      errors.leaderName = "Nama lengkap ketua wajib diisi";
    }
    if (!values.faculty.trim()) {
      errors.faculty = "Asal fakultas wajib diisi";
    }
    if (!values.leaderContact.trim()) {
      errors.leaderContact = "Kontak ketua wajib diisi";
    } else if (!values.leaderContact.startsWith("08")) {
      errors.leaderContact = "Nomor HP harus diawali dengan 08";
    } else if (values.leaderContact.trim().length < 10) {
      errors.leaderContact = "Nomor HP minimal 10 digit";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStep(2);
  };

  const goToStepOne = () => {
    setFieldErrors({});
    setStep(1);
  };

  const submit = async () => {
    const errors: Partial<Record<keyof OpenTalentFormValues, string>> = {};

    if (!values.talent.trim()) {
      errors.talent = "Talent yang ditampilkan wajib diisi";
    }
    if (!values.driveLink.trim()) {
      errors.driveLink = "Link Drive wajib diisi";
    } else if (!isDriveLinkValid) {
      errors.driveLink = "Link harus diawali https://drive.google.com/";
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

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
    router.push("/profile/open-talent");
  };

  return {
    step,
    values,
    setField,
    fieldErrors,
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
