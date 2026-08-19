import {
  HIMA_NOMINATIONS,
  NOMINASI_HIMA,
  getRequiredFiles,
} from "../../constants/submission";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";
import { NominasiCheckboxGroup } from "../ui/NominasiCheckboxGroup";
import { DriveLinkInput } from "../ui/DriveLinkInput";
import { NominasiSummary } from "../ui/NominasiSummary";

interface StepTwoFormHIMAProps {
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoFormHIMA({
  formData,
  setFormData,
}: StepTwoFormHIMAProps) {
  const { selectedNominasi, linkDrive } = formData;
  const { setSelectedNominasi, setLinkDrive } = setFormData;

  const allRequiredFiles = getRequiredFiles(selectedNominasi, HIMA_NOMINATIONS);
  return (
    <div className="w-full flex flex-col gap-3 lg:gap-6">
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi Hima
        </label>
        <NominasiCheckboxGroup
          nominasiList={NOMINASI_HIMA}
          nominationsRecord={HIMA_NOMINATIONS}
          selectedNominasi={selectedNominasi}
          onChange={setSelectedNominasi}
        />
      </div>
      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />
      <NominasiSummary files={allRequiredFiles} />
    </div>
  );
}
