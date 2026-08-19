import StepTwoFormBEM from "./StepTwoFormBEM";
import StepTwoFormUKM from "./StepTwoFormUKM";
import { Button } from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";
import StepTwoFormDPM from "./StepTwoFormDPM";
import StepTwoFormHIMA from "./StepTwoFormHIMA";
import { useStepTwoForm } from "../../hooks/useStepTwoForm";

interface StepTwoFormProps {
  onBack?: () => void;
  onSubmitSuccess?: () => void;
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoForm({
  onBack,
  onSubmitSuccess,
  formData,
  setFormData,
}: StepTwoFormProps) {
  const { jenisOrmawa } = formData;

  const content = (() => {
    if (jenisOrmawa === "bem") {
      return <StepTwoFormBEM formData={formData} setFormData={setFormData} />;
    }
    if (jenisOrmawa.startsWith("ukm")) {
      return <StepTwoFormUKM formData={formData} setFormData={setFormData} />;
    }
    if (jenisOrmawa === "hima") {
      return <StepTwoFormHIMA formData={formData} setFormData={setFormData} />;
    }
    if (jenisOrmawa === "dpm") {
      return <StepTwoFormDPM formData={formData} setFormData={setFormData} />;
    }
    return null;
  })();

  const { isValid } = useStepTwoForm(formData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    // TODO: kirim formData ke API
    console.log("Data Submit:", formData);
    if (onSubmitSuccess) onSubmitSuccess();
  };

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      {content}

      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4">
        <Button
          type="button"
          onClick={onBack}
          className="w-full md:w-auto py-3 px-8 rounded-[12px] text-blue-900 font-jakarta font-bold text-base md:text-lg justify-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" strokeWidth={3} /> Back
        </Button>
        <Button
          type="submit"
          disabled={!isValid}
          className="w-full md:w-auto py-3 px-8 rounded-[12px] text-blue-900 font-jakarta font-bold text-base md:text-lg justify-center"
        >
          Konfirmasi
        </Button>
      </div>
    </form>
  );
}
