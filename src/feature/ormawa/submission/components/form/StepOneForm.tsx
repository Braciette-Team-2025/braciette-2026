"use client";

import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { MultiValueInput } from "../ui/MultiValueInput";
import { useStepOneForm } from "../../hooks/useStepOneForm";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";

interface StepOneFormProps {
  onNext?: () => void;
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepOneForm({
  onNext,
  formData,
  setFormData,
}: StepOneFormProps) {
  const { jenisOrmawa, setJenisOrmawa, isFormValid, inputFields } =
    useStepOneForm(formData, setFormData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onNext && isFormValid) {
      onNext();
    }
  };

  return (
    <form className="w-full flex flex-col gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-yellow-500 font-jakarta font-semibold text-sm md:text-md">
            Jenis Ormawa
          </label>
          <Select
            value={jenisOrmawa}
            onChange={(e) => setJenisOrmawa(e.target.value)}
            placeholder="Pilih Jenis Ormawa"
          >
            <option value="bem">BEM</option>
            <option value="dpm">DPM</option>
            <option value="hima">HIMA</option>
            <option value="ukm-penalaran">UKM Penalaran</option>
            <option value="ukm-olahraga">UKM Olahraga</option>
            <option value="ukm-kesenian">UKM Kesenian</option>
            <option value="ukm-kerohanian">UKM Kerohanian</option>
          </Select>
        </div>

        {inputFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-2">
            <label className="text-yellow-500 font-jakarta font-semibold text-sm md:text-md">
              {field.label}
            </label>
            <Input
              placeholder={field.placeholder}
              type={field.type || "text"}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              maxLength={field.maxLength}
            />
          </div>
        ))}

        <div className="flex flex-col gap-2">
          <label className="text-yellow-500 font-jakarta font-semibold text-sm md:text-md">
            Pendataan Media Sosial
          </label>
          <MultiValueInput
            values={formData.mediaSosial}
            onChange={setFormData.setMediaSosial}
            placeholder="Masukkan Link Media Sosial"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={!isFormValid}
        className="mt-2 w-full py-3 lg:py-3 rounded-[12px] lg:rounded-[12px] text-blue-900 font-jakarta text-md md:text-lg lg:text-lg"
      >
        Selanjutnya
      </Button>
    </form>
  );
}
