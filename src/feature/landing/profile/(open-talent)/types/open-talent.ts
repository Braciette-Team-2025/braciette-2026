export interface OpenTalentDetail {
  tanggalPendaftaran: string;
  terakhirDiedit: string;
  namaLengkapKetua: string;
  asalFakultas: string;
  talentYangDitampilkan: string;
  jenisPenampilan: string;
  kontakKetua: string;
  linkDrive: string;
  status: "approved" | "pending" | "rejected";
}
