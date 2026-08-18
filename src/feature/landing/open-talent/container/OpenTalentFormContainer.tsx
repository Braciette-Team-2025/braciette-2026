"use client";

import { SuccessModal } from "@/src/feature/landing/components/SucessModalTitle";
import { OpenTalentTitle } from "../components/OpenTalentTitle";
import { OpenTalentStepOne } from "../components/OpenTalentStepOne";
import { OpenTalentStepTwo } from "../components/OpenTalentStepTwo";
import { useOpenTalentForm } from "../hooks/useOpenTalentForm";
import {
  OpenTalentFormMode,
  OpenTalentFormValues,
} from "../types/openTalentForm";
import { VoteSuccessModal } from "../../components/VoteSuccessModal";

interface OpenTalentFormContainerProps {
  mode?: OpenTalentFormMode;
  initialValues?: OpenTalentFormValues;
  resultHref?: string;
}

export function OpenTalentFormContainer({
  mode = "create",
  initialValues,
  resultHref = "/profile/open-talent",
}: OpenTalentFormContainerProps) {
  const {
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
  } = useOpenTalentForm({ initialValues });
  const displayMode: OpenTalentFormMode = hasSubmitted ? "view" : mode;

  return (
    <section
      className="relative mx-auto flex w-full flex-col items-center px-4"
      style={{
        maxWidth: "clamp(320px, 46vw, 760px)",
        paddingBlock: "clamp(2.5rem, 6vw, 5rem)",
      }}
    >
      <OpenTalentTitle />

      {step === 1 ? (
        <OpenTalentStepOne
          mode={displayMode}
          values={values}
          onFieldChange={setField}
          onNext={goToStepTwo}
          isValid={isStepOneValid}
          resultHref={resultHref}
        />
      ) : (
        <OpenTalentStepTwo
          mode={displayMode}
          values={values}
          onFieldChange={setField}
          onBack={goToStepOne}
          onSubmit={submit}
          isValid={isStepTwoValid}
          isSubmitting={isSubmitting}
          resultHref={resultHref}
        />
      )}

      <VoteSuccessModal
        onOpenChange={closeSuccessModal}
        open={isSuccessModalOpen}
        variant="applying"
        onConfirm={closeSuccessModal}
      />
    </section>
  );
}
