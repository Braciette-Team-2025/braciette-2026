"use client";

import { useState } from "react";
import type {
  OrmawaType,
  StepOneValues,
  StepTwoValues,
} from "@/src/feature/admin/submission/types/ormawa";
import CreateHeader from "@/src/feature/admin/submission/components/(Create Ormawa Intenal)/CreateHeader";
import StepOneForm from "@/src/feature/admin/submission/components/(Create Ormawa Intenal)/StepOneForm";
import StepTwoForm from "@/src/feature/admin/submission/components/(Create Ormawa Intenal)/StepTwoForm";
import ConfirmationDialog from "../components/(Create Ormawa Intenal)/(dialog)/ConfirmationDialog";

const STEPS = ["Informasi Ormawa", "Kredensial"];

export default function CreateOrmawaInternalContainer() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [stepOneData, setStepOneData] = useState<StepOneValues | null>(null);
  const [openConfirm, setOpenConfirm] = useState(false);

  const handleStepOneNext = (data: StepOneValues) => {
    setStepOneData(data);
    setCurrentStep(2);
  };

  const handleStepTwoBack = () => {
    setCurrentStep(1);
  };

  const handleStepTwoSubmit = (data: StepTwoValues) => {
    setOpenConfirm(true);
  };

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
              type={stepOneData.jenisOrmawa as OrmawaType}
              onSubmit={handleStepTwoSubmit}
            />
            <ConfirmationDialog
              open={openConfirm}
              onOpenChange={setOpenConfirm}
              title="Konfirmasi data"
              description="Pastikan seluruh data yang dimasukkan sudah benar sebelum disimpan"
              confirmText="Konfirmasi"
              onConfirm={() => setOpenConfirm(false)}
            />
            ;
          </>
        )}
      </div>
    </div>
  );
}
