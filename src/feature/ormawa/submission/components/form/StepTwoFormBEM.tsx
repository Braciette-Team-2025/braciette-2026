"use client";

import { DriveLinkInput } from "../ui/DriveLinkInput";
import { Checkbox } from "../ui/Checkbox";
import { RequiredFilesInfo } from "../ui/RequiredFilesInfo";
import {
  NOMINASI_BEM,
  BEM_NOMINATIONS,
  BemNomination,
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

  const allRequiredFiles = Array.from(
    new Set<string>(
      selectedNominasi.flatMap(
        (n: string) => BEM_NOMINATIONS[n as BemNomination] || [],
      ),
    ),
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi BEM
        </label>
        <div className="flex flex-col gap-4">
          {NOMINASI_BEM.map((nominasi) => {
            const isChecked = selectedNominasi.includes(nominasi);
            return (
              <div key={nominasi} className="flex flex-col gap-2">
                <Checkbox
                  label={nominasi}
                  checked={isChecked}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedNominasi([...selectedNominasi, nominasi]);
                    } else {
                      setSelectedNominasi(
                        selectedNominasi.filter((n: string) => n !== nominasi),
                      );
                    }
                  }}
                />
                <RequiredFilesInfo
                  isVisible={isChecked}
                  requiredFiles={
                    BEM_NOMINATIONS[nominasi as BemNomination] || []
                  }
                />
              </div>
            );
          })}
        </div>
      </div>

      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />

      {allRequiredFiles.length > 0 && (
        <div className="border-l-[3px] border-yellow-500 pl-4 py-1 flex flex-col gap-1 mt-2">
          <p className="text-white font-jakarta text-sm md:text-base font-bold">
            Berdasarkan nominasi yang telah dipilih, kamu perlu submit:
          </p>
          <ul className="list-disc list-inside text-white font-jakarta text-sm md:text-base font-light">
            {allRequiredFiles.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
