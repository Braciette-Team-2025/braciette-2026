"use client";

import type { InternalOrmawaType } from "@/src/feature/admin/submission/types/ormawa";
import CreateHeader from "@/src/feature/admin/submission/components/create-ormawa-internal/CreateHeader";
import StepOneForm from "@/src/feature/admin/submission/components/create-ormawa-internal/StepOneForm";
import StepTwoForm from "@/src/feature/admin/submission/components/create-ormawa-internal/StepTwoForm";
import ConfirmationDialog from "../components/create-ormawa-internal/dialog/ConfirmationDialog";
import { useEditInternalSubmission } from "../hooks/internal/useEditInternalSubmission";
import type { InternalSubmissionDetail } from "../types/ormawa";

const STEPS = ["Informasi Ormawa", "Kredensial"];

interface EditOrmawaInternalContainerProps {
  initialData: InternalSubmissionDetail;
}

export default function EditOrmawaInternalContainer({
  initialData,
}: EditOrmawaInternalContainerProps) {
  const {
    currentStep,
    stepOneData,
    stepOneInitial,
    stepTwoInitial,
    openConfirm,
    setOpenConfirm,
    isPending,
    handleStepOneNext,
    handleStepTwoBack,
    handleStepTwoSubmit,
    handleConfirm,
  } = useEditInternalSubmission(initialData);

  return (
    <div className="min-h-full py-12 px-6 font-inter">
      <div className="mx-auto max-w-[715px] space-y-8">
        <CreateHeader
          currentStep={currentStep}
          steps={STEPS}
          title="Edit Organisasi Mahasiswa"
          onBack={currentStep === 2 ? handleStepTwoBack : undefined}
        />

        {currentStep === 1 && (
          <StepOneForm
            initialValues={stepOneData ?? stepOneInitial}
            onNext={handleStepOneNext}
          />
        )}

        {currentStep === 2 && (stepOneData ?? stepOneInitial) && (
          <>
            <StepTwoForm
              type={
                (stepOneData ?? stepOneInitial)
                  .jenisOrmawa as InternalOrmawaType
              }
              initialValues={stepTwoInitial}
              onSubmit={handleStepTwoSubmit}
            />
            <ConfirmationDialog
              open={openConfirm}
              onOpenChange={setOpenConfirm}
              title="Konfirmasi perubahan"
              description="Pastikan seluruh data yang diubah sudah benar sebelum disimpan"
              confirmText={isPending ? "Menyimpan..." : "Konfirmasi"}
              loading={isPending}
              onConfirm={handleConfirm}
            />
          </>
        )}
      </div>
    </div>
  );
}
