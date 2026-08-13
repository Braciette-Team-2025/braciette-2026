"use client";

import StepOneForm from "../components/form/StepOneForm";
import StepTwoForm from "../components/form/StepTwoForm";
import SubmissionCard from "../components/SubmissionCard";
import SubmissionHeader from "../components/SubmissionHeader";
import { useSubmissionContainer } from "../hooks/useSubmissionContainer";

export default function SubmissionContainer() {
  const { step, handleNext, handleBack, formData, setFormData } =
    useSubmissionContainer();

  return (
    <div className="font-jakarta py-17 flex flex-col items-center">
      <div className="flex flex-col w-fit gap-10">
        <SubmissionHeader />
        <SubmissionCard currentStep={step}>
          {step === 1 && (
            <StepOneForm
              onNext={handleNext}
              formData={formData}
              setFormData={setFormData}
            />
          )}
          {step === 2 && (
            <StepTwoForm
              onBack={handleBack}
              formData={formData}
              setFormData={setFormData}
            />
          )}
        </SubmissionCard>
      </div>
    </div>
  );
}
