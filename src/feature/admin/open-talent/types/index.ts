export type OpenTalentData = {
  id: number;
  namaKetua: string;
  kontakKetua: string;
  jenisPenampilan: string;
  status: "approved" | "pending" | "rejected";
  tanggalPendaftaran: string;
  terakhirDiedit: string;
  asalFakultas: string;
  talentDitampilkan: string;
  jumlahAnggota: string;
  linkDrive: string;
};

import { ReactNode } from "react";

export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  widthClassName?: string;
}

export interface OpenTalentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: OpenTalentData;
}
