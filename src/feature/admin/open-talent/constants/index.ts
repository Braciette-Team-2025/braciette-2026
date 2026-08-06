import { OpenTalentData } from "../types";

const baseData = {
  tanggalPendaftaran: "12/7/2026",
  terakhirDiedit: "12/7/2026",
  asalFakultas: "Fakultas Ilmu Komputer",
  talentDitampilkan: "Dance",
  jumlahAnggota: "-",
  linkDrive:
    "https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz98765/view?usp=sharing",
};

export const dummyData: OpenTalentData[] = [
  {
    id: 1,
    namaKetua: "Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Individu",
    status: "approved",
    ...baseData,
  },
  {
    id: 2,
    namaKetua: "Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "pending",
    ...baseData,
  },
  {
    id: 3,
    namaKetua: "Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Individu",
    status: "rejected",
    ...baseData,
  },
  {
    id: 4,
    namaKetua: "Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
  {
    id: 5,
    namaKetua: "Muhammad Ibnu Muhammad Ibnu Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
  {
    id: 6,
    namaKetua: "Muhammad Ibnu Muhammad Ibnu Muhammad Ibnu",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
  {
    id: 7,
    namaKetua: "Muhammad Ibnu Muhammad",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
  {
    id: 8,
    namaKetua: "Muhammad ",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
  {
    id: 9,
    namaKetua: "Agus Budiarto ",
    kontakKetua: "0867676767",
    jenisPenampilan: "Kelompok",
    status: "approved",
    ...baseData,
  },
];
