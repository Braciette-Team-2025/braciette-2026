"use client";

import { ArrowLeft } from "lucide-react";
import { OpenTalentFormCard } from "./OpenTalentFormCard";
import { OpenTalentField } from "./OpenTalentField";
import { OpenTalentSelectField } from "./OpenTalentSelectField";
import { OpenTalentMemberStepper } from "./OpenTalentMemberStepper";
import { OpenTalentButton } from "./OpenTalentButton";
import { PERFORMANCE_TYPE_OPTIONS } from "../constants/performanceType";
import {
  OpenTalentFormMode,
  OpenTalentFormValues,
  PerformanceType,
} from "../types/openTalentForm";

type StepTwoField = "talent" | "performanceType" | "memberCount" | "driveLink";

interface OpenTalentStepTwoProps {
  mode: OpenTalentFormMode;
  values: OpenTalentFormValues;
  onFieldChange: <K extends StepTwoField>(
    field: K,
    value: OpenTalentFormValues[K],
  ) => void;
  onBack: () => void;
  onSubmit: () => void;
  isValid: boolean;
  isSubmitting: boolean;
  driveLinkError?: string | null;
  submitError?: string | null;
  resultHref: string;
}

export function OpenTalentStepTwo({
  mode,
  values,
  onFieldChange,
  onBack,
  onSubmit,
  isValid,
  isSubmitting,
  driveLinkError,
  submitError,
  resultHref,
}: OpenTalentStepTwoProps) {
  const isViewMode = mode === "view";
  const isIndividual = values.performanceType === "Individu";

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
            label="Talent yang Ditampilkan"
            value={values.talent}
            placeholder="Talent yang Ditampilkan"
            readOnly={isViewMode}
            onChange={(value) => onFieldChange("talent", value)}
          />

          <OpenTalentSelectField
            label="Jenis Penampilan"
            value={values.performanceType}
            placeholder="Jenis Penampilan"
            options={PERFORMANCE_TYPE_OPTIONS}
            disabled={isViewMode}
            onChange={(value) =>
              onFieldChange("performanceType", value as PerformanceType)
            }
          />

          <OpenTalentMemberStepper
            label="Jumlah Anggota"
            value={values.memberCount}
            disabled={isIndividual || isViewMode}
            onChange={(value) => onFieldChange("memberCount", value)}
          />

          <div
            className="flex flex-col"
            style={{ gap: "clamp(0.375rem, 0.6vw, 0.5rem)" }}
          >
            <OpenTalentField
              label={isViewMode ? "Link Google Drive" : "Link Drive"}
              value={values.driveLink}
              placeholder={isViewMode ? "Link Google Drive" : "Link Drive"}
              readOnly={isViewMode}
              error={isViewMode ? null : driveLinkError}
              onChange={(value) => onFieldChange("driveLink", value)}
            />
            {!isViewMode && !driveLinkError && (
              <p
                className="text-blue-100/70"
                style={{ fontSize: "clamp(0.7rem, 0.85vw, 0.8rem)" }}
              >
                Pastikan link diawali https://drive.google.com/ dan sudah
                diberikan akses &quot;anyone can view&quot;
              </p>
            )}
          </div>

          {submitError && (
            <p
              className="rounded-lg border border-red-400/60 bg-red-500/10 text-red-300"
              style={{
                fontSize: "clamp(0.75rem, 0.9vw, 0.85rem)",
                padding: "clamp(0.6rem, 1vw, 0.75rem)",
              }}
            >
              {submitError}
            </p>
          )}
        </div>
      </OpenTalentFormCard>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <OpenTalentButton
          label="Back"
          icon={ArrowLeft}
          iconPosition="left"
          onClick={onBack}
        />

        {isViewMode ? (
          <OpenTalentButton label="Hasil Open Talent" href={resultHref} />
        ) : (
          <OpenTalentButton
            label={isSubmitting ? "Mengirim..." : "Confirm"}
            onClick={onSubmit}
            disabled={!isValid || isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
