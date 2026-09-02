"use client";

import type { InternalOrmawaType } from "@/src/feature/admin/submission/types/ormawa";
import CreateHeader from "@/src/feature/admin/submission/components/create-ormawa-internal/CreateHeader";
import StepOneForm from "@/src/feature/admin/submission/components/create-ormawa-internal/StepOneForm";
import StepTwoForm from "@/src/feature/admin/submission/components/create-ormawa-internal/StepTwoForm";
import ConfirmationDialog from "../components/create-ormawa-internal/dialog/ConfirmationDialog";
import { useCreateOrmawaInternal } from "../hooks/useCreateOrmawaInternal";

const STEPS = ["Informasi Ormawa", "Kredensial"];

export default function CreateOrmawaInternalContainer() {
  const {
    currentStep,
    stepOneData,
    openConfirm,
    setOpenConfirm,
    handleStepOneNext,
    handleStepTwoBack,
    handleStepTwoSubmit,
    handleConfirm,
  } = useCreateOrmawaInternal();

  return (
    <div className="min-h-full py-12 px-6 font-inter">
      <div className="mx-auto max-w-[715px] space-y-8">
        <CreateHeader
          currentStep={currentStep}
          steps={STEPS}
          onBack={currentStep === 2 ? handleStepTwoBack : undefined}
        />

        {currentStep === 1 && (
          <StepOneForm
            initialValues={stepOneData ?? undefined}
            onNext={handleStepOneNext}
          />
        )}

        {currentStep === 2 && stepOneData && (
          <>
            <StepTwoForm
              type={stepOneData.jenisOrmawa as InternalOrmawaType}
              onSubmit={handleStepTwoSubmit}
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
