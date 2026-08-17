import {
  DPM_NOMINATIONS,
  NOMINASI_DPM,
  getRequiredFiles,
} from "../../constants/submission";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";
import { NominasiCheckboxGroup } from "../ui/NominasiCheckboxGroup";
import { DriveLinkInput } from "../ui/DriveLinkInput";
import { NominasiSummary } from "../ui/NominasiSummary";

interface StepTwoFormDPMProps {
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoFormDPM({
  formData,
  setFormData,
}: StepTwoFormDPMProps) {
  const { selectedNominasi, linkDrive } = formData;
  const { setSelectedNominasi, setLinkDrive } = setFormData;

  const allRequiredFiles = getRequiredFiles(selectedNominasi, DPM_NOMINATIONS);
  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi DPM
        </label>
        <NominasiCheckboxGroup
          nominasiList={NOMINASI_DPM}
          nominationsRecord={DPM_NOMINATIONS}
          selectedNominasi={selectedNominasi}
          onChange={setSelectedNominasi}
        />
      </div>
      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />
      <NominasiSummary files={allRequiredFiles} />
    </div>
  );
}
