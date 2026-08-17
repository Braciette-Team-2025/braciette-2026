import { useState } from "react";
import type { SocialMedia } from "../components/ui/MultiSocialMediaInput";
import type { LombaItem } from "../components/ui/MultiValueInput";
import { JenisOrmawa } from "../constants/submission";

type FormState = {
  jenisOrmawa: JenisOrmawa | "";
  namaOrmawa: string;
  namaKabinet: string;
  pic: string;
  kontakPic: string;
  deskripsi: string;
  proker: string;
  selectedNominasi: string[];
  linkDrive: string;
  lomba: LombaItem[];
  mediaSosial: SocialMedia[];
};

const INITIAL_FORM_STATE: FormState = {
  jenisOrmawa: "",
  namaOrmawa: "",
  namaKabinet: "",
  pic: "",
  kontakPic: "",
  deskripsi: "",
  proker: "",
  selectedNominasi: [],
  linkDrive: "",
  lomba: [],
  mediaSosial: [],
};

export function useSubmissionContainer() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);

  const updateField = <K extends keyof FormState>(
    key: K,
    value: FormState[K],
  ) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (formState.jenisOrmawa !== "") {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const formData = formState;

  const setFormData = {
    setJenisOrmawa: (v: JenisOrmawa | "") => updateField("jenisOrmawa", v),
    setNamaOrmawa: (v: string) => updateField("namaOrmawa", v),
    setNamaKabinet: (v: string) => updateField("namaKabinet", v),
    setPic: (v: string) => updateField("pic", v),
    setKontakPic: (v: string) => updateField("kontakPic", v),
    setDeskripsi: (v: string) => updateField("deskripsi", v),
    setProker: (v: string) => updateField("proker", v),
    setSelectedNominasi: (v: string[]) => updateField("selectedNominasi", v),
    setLinkDrive: (v: string) => updateField("linkDrive", v),
    setLomba: (v: LombaItem[]) => updateField("lomba", v),
    setMediaSosial: (v: SocialMedia[]) => updateField("mediaSosial", v),
  };

  return { step, handleNext, handleBack, formData, setFormData };
}

export type SubmissionContainerState = ReturnType<
  typeof useSubmissionContainer
>;
export type FormData = SubmissionContainerState["formData"];
export type SetFormData = SubmissionContainerState["setFormData"];
