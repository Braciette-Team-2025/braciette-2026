"use client";

import StepOneForm from "../components/form/StepOneForm";
import StepTwoForm from "../components/form/StepTwoForm";
import SubmissionCard from "../components/SubmissionCard";
import SubmissionHeader from "../components/SubmissionHeader";
import ModalThankyou from "../components/PopupThankyou";
import { useSubmissionContainer } from "../hooks/useSubmissionContainer";

export default function SubmissionContainer() {
  const {
    step,
    handleNext,
    handleBack,
    handleReset,
    formData,
    setFormData,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
  } = useSubmissionContainer();

  return (
    <>
      <div className="py-17 flex flex-col items-center">
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
                onSubmitSuccess={() => setIsSuccessModalOpen(true)}
                formData={formData}
                setFormData={setFormData}
              />
            )}
          </SubmissionCard>
        </div>
      </div>

      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#191919]/40">
          <ModalThankyou onClose={handleReset} />
        </div>
      )}
    </>
  );
}
