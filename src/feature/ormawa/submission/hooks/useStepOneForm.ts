import type { FormData, SetFormData } from "./useSubmissionContainer";

export function useStepOneForm(formData: FormData, setFormData: SetFormData) {
  const {
    jenisOrmawa,
    namaOrmawa,
    namaKabinet,
    pic,
    kontakPic,
    deskripsi,
    proker,
  } = formData;
  const {
    setJenisOrmawa,
    setNamaOrmawa,
    setNamaKabinet,
    setPic,
    setKontakPic,
    setDeskripsi,
    setProker,
  } = setFormData;

  const isFormValid =
    jenisOrmawa !== "" &&
    namaOrmawa.trim() !== "" &&
    namaKabinet.trim() !== "" &&
    pic.trim() !== "" &&
    kontakPic.trim() !== "" &&
    deskripsi.trim() !== "" &&
    proker.trim() !== "";

  const inputFields = [
    {
      id: "nama",
      label: "Nama Ormawa",
      value: namaOrmawa,
      onChange: setNamaOrmawa,
      placeholder: "Nama Ormawa",
      maxLength: 100,
    },
    {
      id: "kabinet",
      label: "Nama Kabinet",
      value: namaKabinet,
      onChange: setNamaKabinet,
      placeholder: "Kabinet Ormawa",
      maxLength: 100,
    },
    {
      id: "pic",
      label: "PIC",
      value: pic,
      onChange: setPic,
      placeholder: "Nama PIC",
      maxLength: 60,
    },
    {
      id: "kontak",
      label: "Kontak PIC",
      value: kontakPic,
      onChange: setKontakPic,
      placeholder: "08xxxxxxxxxx",
      type: "tel",
      maxLength: 15,
    },
    {
      id: "deskripsi",
      label: "Deskripsi Singkat",
      value: deskripsi,
      onChange: setDeskripsi,
      placeholder: "Deskripsi Singkat",
    },
    {
      id: "proker",
      label: "Program Kerja Unggulan",
      value: proker,
      onChange: setProker,
      placeholder: "Program Kerja Unggulan",
      maxLength: 50,
    },
  ];

  return {
    jenisOrmawa,
    setJenisOrmawa,
    isFormValid,
    inputFields,
  };
}
