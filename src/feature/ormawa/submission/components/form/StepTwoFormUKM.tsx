import { DriveLinkInput } from "../ui/DriveLinkInput";
import { MultiValueInput } from "../ui/MultiValueInput";
import { NominasiSummary } from "../ui/NominasiSummary";
import { NominasiCheckboxGroup } from "../ui/NominasiCheckboxGroup";
import {
  NOMINASI_UKM,
  UKM_NOMINATIONS,
  getRequiredFiles,
} from "../../constants/submission";
import type { FormData, SetFormData } from "../../hooks/useSubmissionContainer";

interface StepTwoFormUKMProps {
  formData: FormData;
  setFormData: SetFormData;
}

export default function StepTwoFormUKM({
  formData,
  setFormData,
}: StepTwoFormUKMProps) {
  const { lomba, selectedNominasi, linkDrive } = formData;
  const { setLomba, setSelectedNominasi, setLinkDrive } = setFormData;

  const allRequiredFiles = getRequiredFiles(selectedNominasi, UKM_NOMINATIONS);

  return (
    <div className="w-full flex flex-col gap-3 lg:gap-6">
      <div className="flex flex-col gap-2 md:gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Lomba yang Dimenangkan
        </label>
        <MultiValueInput
          values={lomba}
          onChange={setLomba}
          placeholder="Lomba yang Dimenangkan"
        />
      </div>

      <div className="flex flex-col gap-3 md:gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi UKM
        </label>
        <NominasiCheckboxGroup
          nominasiList={NOMINASI_UKM}
          nominationsRecord={UKM_NOMINATIONS}
          selectedNominasi={selectedNominasi}
          onChange={setSelectedNominasi}
        />
      </div>
      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />
      <NominasiSummary files={allRequiredFiles} />
    </div>
  );
}
