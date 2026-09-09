"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FormField from "./FormField";
import {
  stepOneSchema,
  type StepOneData,
} from "../../schemas/openTalentSchemas";
import { useState } from "react";

interface StepOneFormProps {
  data: StepOneData;
  onChange: (data: Partial<StepOneData>) => void;
  onNext: () => void;
}

type FieldErrors = Partial<Record<keyof StepOneData, string>>;

export default function StepOneForm({
  data,
  onChange,
  onNext,
}: StepOneFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const isComplete =
    data.namaKetua.trim() !== "" &&
    data.asalFakultas.trim() !== "" &&
    data.kontakKetua.trim() !== "";

  const handleNext = () => {
    const result = stepOneSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof StepOneData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onNext();
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Nama Lengkap Ketua"
        placeholder="Nama Lengkap"
        value={data.namaKetua}
        onChange={(val) => onChange({ namaKetua: val })}
        error={errors.namaKetua}
      />

      <FormField
        label="Asal Fakultas Ketua"
        placeholder="Asal Fakultas"
        value={data.asalFakultas}
        onChange={(val) => onChange({ asalFakultas: val })}
        error={errors.asalFakultas}
      />

      <FormField
        label="Kontak Ketua"
        placeholder="08XXXXXXXXXXXXX"
        value={data.kontakKetua}
        onChange={(val) => onChange({ kontakKetua: val })}
        type="tel"
        error={errors.kontakKetua}
      />

      <div className="flex justify-end pt-4">
        <Button
          onClick={handleNext}
          disabled={!isComplete}
          className="bg-yellow-500 hover:bg-yellow-600! cursor-pointer text-yellow-50 px-6 h-11 text-base font-semibold rounded-[8px]"
        >
          Selanjutnya <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
