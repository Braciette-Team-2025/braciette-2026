import StepTwoFormBEM from "./StepTwoFormBEM";
import StepTwoFormUKM from "./StepTwoFormUKM";
import { Button } from "../ui/Button";
import { ArrowLeft } from "lucide-react";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";

interface StepTwoFormProps {
  onBack?: () => void;
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoForm({
  onBack,
  formData,
  setFormData,
}: StepTwoFormProps) {
  const { jenisOrmawa } = formData;

  const renderFormContent = () => {
    if (jenisOrmawa === "bem") {
      return <StepTwoFormBEM formData={formData} setFormData={setFormData} />;
    }
    if (jenisOrmawa.startsWith("ukm")) {
      return <StepTwoFormUKM formData={formData} setFormData={setFormData} />;
    }
    return null;
  };

  const content = renderFormContent();

  const isFormValid = () => {
    if (jenisOrmawa === "bem") {
      return formData.selectedNominasi?.length > 0 && formData.linkDrive !== "";
    }
    if (jenisOrmawa.startsWith("ukm")) {
      const hasLomba = formData.lomba?.length > 0;
      const hasNominasi = formData.selectedNominasi?.length > 0;
      const hasLinkDrive = formData.linkDrive !== "";
      return hasLomba && hasNominasi && hasLinkDrive;
    }
    return false;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) return;

    let payload = {};
    const baseData = {
      jenisOrmawa: formData.jenisOrmawa,
      namaOrmawa: formData.namaOrmawa,
      namaKabinet: formData.namaKabinet,
      pic: formData.pic,
      kontakPic: formData.kontakPic,
      deskripsi: formData.deskripsi,
      proker: formData.proker,
      linkDrive: formData.linkDrive,
      mediaSosial: formData.mediaSosial,
    };

    if (jenisOrmawa === "bem") {
      payload = {
        ...baseData,
        selectedNominasi: formData.selectedNominasi,
      };
    } else if (jenisOrmawa.startsWith("ukm")) {
      payload = {
        ...baseData,
        lomba: formData.lomba,
        selectedNominasi: formData.selectedNominasi,
      };
    }

    console.log("Data Submit:", payload);
  };

  return (
    <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
      {content}

      <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-4 mt-8">
        <Button
          type="button"
          onClick={onBack}
          className="w-full md:w-auto py-3 px-8 rounded-[12px] text-blue-900 font-jakarta font-bold text-base md:text-lg justify-center"
        >
          <ArrowLeft className="w-5 h-5 mr-1" strokeWidth={3} /> Back
        </Button>
        <Button
          type="submit"
          disabled={!isFormValid()}
          className="w-full md:w-auto py-3 px-8 rounded-[12px] text-blue-900 font-jakarta font-bold text-base md:text-lg justify-center"
        >
          Konfirmasi
        </Button>
      </div>
    </form>
  );
}
