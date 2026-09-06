import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SocialMedia } from "../components/ui/MultiSocialMediaInput";
import type { LombaItem } from "../components/ui/MultiValueInput";
import { JenisOrmawa, LABEL_ORMAWA } from "../constants/submission";

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

export function buildFormData(form: FormState): globalThis.FormData {
  const fd = new FormData();

  fd.append("type", LABEL_ORMAWA[form.jenisOrmawa as JenisOrmawa]);
  fd.append("name", form.namaOrmawa);
  fd.append("cabinet_name", form.namaKabinet);
  fd.append("short_description", form.deskripsi);
  fd.append("major_program", form.proker);
  fd.append("pic", form.pic);
  fd.append("pic_contact", form.kontakPic);
  fd.append("drive_link", form.linkDrive);

  form.selectedNominasi.forEach((n) => fd.append("nominations", n));
  form.lomba.forEach((l) => fd.append("achievements", l.value));
  form.mediaSosial.forEach((m) =>
    fd.append(
      "social_medias",
      JSON.stringify({ platform: m.platform, url: m.username }),
    ),
  );

  return fd;
}

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
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

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

  const handleReset = () => {
    setIsSuccessModalOpen(false);
    router.push("/ormawa");
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

  return {
    step,
    handleNext,
    handleBack,
    handleReset,
    formData,
    setFormData,
    isSuccessModalOpen,
    setIsSuccessModalOpen,
  };
}

export type SubmissionContainerState = ReturnType<
  typeof useSubmissionContainer
>;
export type SubmissionFormData = SubmissionContainerState["formData"];
export type SetFormData = SubmissionContainerState["setFormData"];
