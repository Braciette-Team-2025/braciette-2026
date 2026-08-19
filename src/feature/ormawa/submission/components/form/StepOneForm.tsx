import { Input } from "../ui/Input";
import { Select } from "../ui/Select";
import { Button } from "../ui/Button";
import { MultiSocialMediaInput } from "../ui/MultiSocialMediaInput";
import { useStepOneForm } from "../../hooks/useStepOneForm";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";
import { JenisOrmawa, LABEL_ORMAWA } from "../../constants/submission";
import ModalThankyou from "../PopupThankyou";

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
    <form className="flex flex-col gap-4 lg:gap-12" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-4  lg:gap-8">
        <div className="flex flex-col gap-1 md:gap-2">
          <label className="text-yellow-500 font-jakarta font-semibold text-sm md:text-md">
            Jenis Ormawa
          </label>
          <Select
            value={jenisOrmawa}
            onChange={(e) => setJenisOrmawa(e.target.value as JenisOrmawa)}
            placeholder="Pilih Jenis Ormawa"
          >
            {Object.values(JenisOrmawa).map((value) => (
              <option key={value} value={value}>
                {LABEL_ORMAWA[value]}
              </option>
            ))}
          </Select>
        </div>

        {inputFields.map((field) => (
          <div key={field.id} className="flex flex-col gap-1 md:gap-2">
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
          <MultiSocialMediaInput
            values={formData.mediaSosial}
            onChange={setFormData.setMediaSosial}
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
