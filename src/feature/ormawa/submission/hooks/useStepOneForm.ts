import { stepOneSchema } from "../schemas/submissionSchema";
import type { SubmissionFormData, SetFormData } from "./useSubmissionContainer";

export type StepOneFieldErrors = Partial<
  Record<
    | "jenisOrmawa"
    | "namaOrmawa"
    | "namaKabinet"
    | "pic"
    | "kontakPic"
    | "deskripsi"
    | "proker"
    | "mediaSosial",
    string
  >
>;

export function useStepOneForm(
  formData: SubmissionFormData,
  setFormData: SetFormData,
) {
  const {
    jenisOrmawa,
    namaOrmawa,
    namaKabinet,
    pic,
    kontakPic,
    deskripsi,
    proker,
    mediaSosial,
  } = formData;
  const {
    setJenisOrmawa,
    setNamaOrmawa,
    setNamaKabinet,
    setPic,
    setKontakPic,
    setDeskripsi,
    setProker,
    setMediaSosial,
  } = setFormData;

  const result = stepOneSchema.safeParse(formData);
  const isFormValid = result.success;

  const fieldErrors: StepOneFieldErrors = !result.success
    ? Object.fromEntries(
        Object.entries(result.error.flatten().fieldErrors).map(
          ([key, messages]) => [key, messages?.[0]],
        ),
      )
    : {};

  const inputFields = [
    {
      id: "nama",
      label: "Nama Ormawa",
      value: namaOrmawa,
      onChange: setNamaOrmawa,
      placeholder: "Nama Ormawa",
      maxLength: 100,
      error: fieldErrors.namaOrmawa,
    },
    {
      id: "kabinet",
      label: "Nama Kabinet",
      value: namaKabinet,
      onChange: setNamaKabinet,
      placeholder: "Kabinet Ormawa",
      maxLength: 100,
      error: fieldErrors.namaKabinet,
    },
    {
      id: "pic",
      label: "PIC",
      value: pic,
      onChange: setPic,
      placeholder: "Nama PIC",
      maxLength: 60,
      error: fieldErrors.pic,
    },
    {
      id: "kontak",
      label: "Kontak PIC",
      value: kontakPic,
      onChange: setKontakPic,
      placeholder: "08XXXXXXXXXX",
      type: "tel",
      maxLength: 15,
      error: fieldErrors.kontakPic,
    },
    {
      id: "deskripsi",
      label: "Deskripsi Singkat",
      value: deskripsi,
      onChange: setDeskripsi,
      placeholder: "Deskripsi Singkat",
      error: fieldErrors.deskripsi,
    },
    {
      id: "proker",
      label: "Program Kerja Unggulan",
      value: proker,
      onChange: setProker,
      placeholder: "Program Kerja Unggulan",
      maxLength: 50,
      error: fieldErrors.proker,
    },
  ];

  return {
    jenisOrmawa,
    setJenisOrmawa,
    isFormValid,
    fieldErrors,
    inputFields,
  };
}
