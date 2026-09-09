"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FormField from "./FormField";
import SelectField from "./SelectField";
import NumberField from "./NumberField";
import {
  stepTwoSchema,
  type StepTwoData,
} from "../../schemas/openTalentSchemas";
import { useState } from "react";

interface StepTwoFormProps {
  data: StepTwoData;
  onChange: (data: Partial<StepTwoData>) => void;
  onBack: () => void;
  onSubmit: () => void;
}

type FieldErrors = Partial<Record<keyof StepTwoData, string>>;

const JENIS_PENAMPILAN_OPTIONS = [
  { label: "Individu", value: "Individu" },
  { label: "Kelompok", value: "Kelompok" },
];

export default function StepTwoForm({
  data,
  onChange,
  onBack,
  onSubmit,
}: StepTwoFormProps) {
  const [errors, setErrors] = useState<FieldErrors>({});

  const isComplete =
    data.talentDitampilkan.trim() !== "" &&
    data.jenisPenampilan.trim() !== "" &&
    data.jumlahAnggota &&
    data.linkDrive.trim() !== "";

  const handleNext = () => {
    const result = stepTwoSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof StepTwoData;
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <FormField
        label="Talent yang Akan Ditampilkan"
        placeholder="Dance"
        value={data.talentDitampilkan}
        onChange={(val) => onChange({ talentDitampilkan: val })}
        error={errors.talentDitampilkan}
      />

      <SelectField
        label="Jenis Penampilan"
        placeholder="Individu"
        options={JENIS_PENAMPILAN_OPTIONS}
        value={data.jenisPenampilan}
        onValueChange={(val) =>
          onChange({ jenisPenampilan: val as StepTwoData["jenisPenampilan"] })
        }
      />

      {data.jenisPenampilan !== "Individu" && (
        <NumberField
          label="Jumlah Anggota"
          value={data.jumlahAnggota}
          onChange={(val) => onChange({ jumlahAnggota: val })}
        />
      )}

      <div>
        <FormField
          label="Link Drive"
          placeholder="https://drive..."
          value={data.linkDrive}
          onChange={(val) => onChange({ linkDrive: val })}
          type="url"
          error={errors.linkDrive}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button
          onClick={onBack}
          variant="outline"
          className="bg-yellow-500 hover:bg-yellow-600! text-yellow-50 px-6 h-11 text-base font-semibold rounded-[8px] border-0 cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-5 w-5" /> Kembali
        </Button>
        <Button
          onClick={handleNext}
          disabled={!isComplete}
          className="bg-yellow-500 hover:bg-yellow-600! text-yellow-50 px-8 h-11 text-base font-semibold rounded-[8px] cursor-pointer"
        >
          Konfirmasi
        </Button>
      </div>
    </div>
  );
}
