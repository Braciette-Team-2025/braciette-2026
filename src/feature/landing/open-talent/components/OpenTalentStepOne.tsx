"use client";

import { ArrowRight } from "lucide-react";
import { OpenTalentFormCard } from "./OpenTalentFormCard";
import { OpenTalentField } from "./OpenTalentField";
import { OpenTalentButton } from "./OpenTalentButton";
import {
  OpenTalentFormMode,
  OpenTalentFormValues,
} from "../types/openTalentForm";

interface OpenTalentStepOneProps {
  mode: OpenTalentFormMode;
  values: OpenTalentFormValues;
  onFieldChange: (
    field: "leaderName" | "faculty" | "leaderContact",
    value: string,
  ) => void;
  onNext: () => void;
  isValid: boolean;
  resultHref: string;
}

export function OpenTalentStepOne({
  mode,
  values,
  onFieldChange,
  onNext,
  isValid,
  resultHref,
}: OpenTalentStepOneProps) {
  const isViewMode = mode === "view";

  return (
    <div
      className="flex w-full flex-col"
      style={{ gap: "clamp(1.25rem, 2.5vw, 2rem)" }}
    >
      <OpenTalentFormCard>
        <div
          className="flex flex-col"
          style={{ gap: "clamp(1.1rem, 2vw, 1.5rem)" }}
        >
          <OpenTalentField
            label="Nama Lengkap Ketua"
            value={values.leaderName}
            placeholder="Nama Lengkap Ketua"
            readOnly={isViewMode}
            onChange={(value) => onFieldChange("leaderName", value)}
          />
          <OpenTalentField
            label="Asal Fakultas Ketua"
            value={values.faculty}
            placeholder="Asal Fakultas Ketua"
            readOnly={isViewMode}
            onChange={(value) => onFieldChange("faculty", value)}
          />
          <OpenTalentField
            label="Kontak Ketua"
            value={values.leaderContact}
            placeholder="Kontak Ketua"
            readOnly={isViewMode}
            onChange={(value) => onFieldChange("leaderContact", value)}
          />
        </div>
      </OpenTalentFormCard>

      <div className="flex justify-end">
        {isViewMode ? (
          <OpenTalentButton label="Hasil Open Talent" href={resultHref} />
        ) : (
          <OpenTalentButton
            label="Next"
            icon={ArrowRight}
            onClick={onNext}
            disabled={!isValid}
          />
        )}
      </div>
    </div>
  );
}
