"use client";

import { DriveLinkInput } from "../ui/DriveLinkInput";
import { Checkbox } from "../ui/Checkbox";
import { MultiValueInput } from "../ui/MultiValueInput";
import { RequiredFilesInfo } from "../ui/RequiredFilesInfo";
import {
  NOMINASI_UKM,
  UKM_NOMINATIONS,
  UkmNomination,
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

  const allRequiredFiles = Array.from(
    new Set<string>(
      selectedNominasi
        .map((nom: string) => UKM_NOMINATIONS[nom as UkmNomination] || [])
        .flat(),
    ),
  );

  return (
    <div className="w-full flex flex-col gap-6">
      <div className="flex flex-col gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Lomba yang Dimenangkan
        </label>
        <MultiValueInput
          values={lomba}
          onChange={setLomba}
          placeholder="Lomba yang Dimenangkan"
        />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-yellow-500 font-jakarta font-bold text-sm md:text-base">
          Nominasi UKM
        </label>
        <div className="flex flex-col gap-4">
          {NOMINASI_UKM.map((nominasi) => {
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

                {UKM_NOMINATIONS[nominasi as UkmNomination].length > 0 && (
                  <RequiredFilesInfo
                    isVisible={isChecked}
                    requiredFiles={UKM_NOMINATIONS[nominasi as UkmNomination]}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <DriveLinkInput value={linkDrive} onChange={setLinkDrive} />

      {allRequiredFiles.length > 0 && (
        <div className="flex flex-col gap-2 mt-4 px-4 border-l-[3px] border-yellow-500">
          <p className="text-white font-jakarta text-sm md:text-base font-bold">
            Berdasarkan nominasi yang telah dipilih, kamu perlu submit:
          </p>
          <ul className="list-disc text-white font-jakarta text-sm md:text-base ml-5">
            {allRequiredFiles.map((req, i) => (
              <li key={i}>{req}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
