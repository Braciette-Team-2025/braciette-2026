import type { FormData } from "./useSubmissionContainer";
import { JenisOrmawa } from "../constants/submission";

export function useStepTwoForm(formData: FormData) {
  const { jenisOrmawa } = formData;

  const isValid = (() => {
    if (
      jenisOrmawa === JenisOrmawa.BEM ||
      jenisOrmawa === JenisOrmawa.HIMA ||
      jenisOrmawa === JenisOrmawa.DPM
    ) {
      return formData.selectedNominasi.length > 0 && formData.linkDrive !== "";
    }

    if (jenisOrmawa.startsWith("ukm")) {
      return formData.selectedNominasi.length > 0 && formData.linkDrive !== "";
    }
    return false;
  })();

  return {
    isValid,
  };
}
