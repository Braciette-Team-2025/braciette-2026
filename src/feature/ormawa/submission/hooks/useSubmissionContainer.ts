import { useState } from "react";

export function useSubmissionContainer() {
  const [step, setStep] = useState<1 | 2>(1);

  const [jenisOrmawa, setJenisOrmawa] = useState("");
  const [namaOrmawa, setNamaOrmawa] = useState("");
  const [namaKabinet, setNamaKabinet] = useState("");
  const [pic, setPic] = useState("");
  const [kontakPic, setKontakPic] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [proker, setProker] = useState("");

  const [selectedNominasi, setSelectedNominasi] = useState<string[]>([]);
  const [linkDrive, setLinkDrive] = useState("");

  // Step 2 State (UKM)
  const [lomba, setLomba] = useState<string[]>([]);
  const [mediaSosial, setMediaSosial] = useState<string[]>([]);

  const handleNext = () => {
    if (jenisOrmawa === "bem" || jenisOrmawa.startsWith("ukm")) {
      setStep(2);
    } else {
      alert("Halaman Step 2 untuk " + jenisOrmawa + " belum dibuat.");
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const formData = {
    jenisOrmawa,
    namaOrmawa,
    namaKabinet,
    pic,
    kontakPic,
    deskripsi,
    proker,
    selectedNominasi,
    linkDrive,
    lomba,
    mediaSosial,
  };

  const setFormData = {
    setJenisOrmawa,
    setNamaOrmawa,
    setNamaKabinet,
    setPic,
    setKontakPic,
    setDeskripsi,
    setProker,
    setSelectedNominasi,
    setLinkDrive,
    setLomba,
    setMediaSosial,
  };

  return { step, handleNext, handleBack, formData, setFormData };
}

export type SubmissionContainerState = ReturnType<
  typeof useSubmissionContainer
>;
export type FormData = SubmissionContainerState["formData"];
export type SetFormData = SubmissionContainerState["setFormData"];
