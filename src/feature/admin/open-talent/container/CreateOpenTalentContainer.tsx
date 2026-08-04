"use client";

import { useCreateOpenTalent } from "../hooks/useCreateOpenTalent";
import CreateHeader from "../components/create/CreateHeader";
import StepOneForm from "../components/create/StepOneForm";
import StepTwoForm from "../components/create/StepTwoForm";
import ConfirmationDialog from "../components/modal/ConfirmationDialog";

export default function CreateOpenTalentContainer() {
  const {
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
  } = useCreateOpenTalent();

  return (
    <div className="min-h-full py-12 px-6 font-inter bg-white">
      <div className="mx-auto max-w-[715px] space-y-8">
        <CreateHeader onBack={currentStep === 2 ? handleBack : undefined} />

        {currentStep === 1 && (
          <StepOneForm
            data={stepOneData}
            onChange={(newData) =>
              setStepOneData({ ...stepOneData, ...newData })
            }
            onNext={handleNext}
          />
        )}

        {currentStep === 2 && (
          <>
            <StepTwoForm
              data={stepTwoData}
              onChange={(newData) =>
                setStepTwoData({ ...stepTwoData, ...newData })
              }
              onBack={handleBack}
              onSubmit={handleSubmitStepTwo}
            />
            <ConfirmationDialog
              open={openConfirm}
              onOpenChange={setOpenConfirm}
              title="Konfirmasi data"
              description="Pastikan seluruh data yang dimasukkan sudah benar sebelum disimpan"
              confirmText="Konfirmasi"
              onConfirm={handleConfirm}
            />
          </>
        )}
      </div>
    </div>
  );
}
