import { DriveLinkInput } from "../ui/DriveLinkInput";
import { NominasiSummary } from "../ui/NominasiSummary";
import { NominasiCheckboxGroup } from "../ui/NominasiCheckboxGroup";
import {
  NOMINASI_BEM,
  BEM_NOMINATIONS,
  getRequiredFiles,
} from "../../constants/submission";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";

interface StepTwoFormBEMProps {
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoFormBEM({
  formData,
  setFormData,
}: StepTwoFormBEMProps) {
  const { selectedNominasi, linkDrive } = formData;
  const { setSelectedNominasi, setLinkDrive } = setFormData;

  const allRequiredFiles = getRequiredFiles(selectedNominasi, BEM_NOMINATIONS);

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi BEM
        </label>
        <NominasiCheckboxGroup
          nominasiList={NOMINASI_BEM}
          nominationsRecord={BEM_NOMINATIONS}
          selectedNominasi={selectedNominasi}
          onChange={setSelectedNominasi}
        />
      </div>
      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />
      <NominasiSummary files={allRequiredFiles} />
    </div>
  );
}
