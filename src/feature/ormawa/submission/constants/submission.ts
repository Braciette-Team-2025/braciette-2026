export enum BemNomination {
  MOST_PRODUCTIVE = "Most Productive BEM",
  MOST_COLLABORATIVE = "Most Collaborative BEM",
  BEST_MEGA_PROKER = "Best Mega Program Kerja",
  BEST_MEDSOS = "Best Media Social",
  MOST_IMPACT = "Most Impact / BEM Terpengabdian",
  TERPERGERAKAN = "BEM Terpergerakan",
  TERPENGEMBANGAN = "BEM Terpengembangan",
  TERPELAYANAN = "BEM Terpelayanan",
}

export const BEM_NOMINATIONS: Record<BemNomination, string[]> = {
  [BemNomination.MOST_PRODUCTIVE]: [
    "LPJ Program Kerja / LPJ Tengah Tahun",
    "OKR Program Kerja",
  ],
  [BemNomination.MOST_COLLABORATIVE]: ["MoU", "LPJ"],
  [BemNomination.BEST_MEGA_PROKER]: ["Grand Design", "LPJ", "Bukti Absensi"],
  [BemNomination.BEST_MEDSOS]: [
    "Setidaknya mengisi pendataan media sosial sekali",
  ],
  [BemNomination.MOST_IMPACT]: ["LPJ", "Grand Design"],
  [BemNomination.TERPERGERAKAN]: ["LPJ"],
  [BemNomination.TERPENGEMBANGAN]: [
    "LPJ & Jumlah Audiens (Bukti Absensi)",
    "MoU Pemateri",
    "OKR",
  ],
  [BemNomination.TERPELAYANAN]: [
    "LPJ & Jumlah Audiens (Bukti Absensi)",
    "MoU Pemateri",
    "OKR",
  ],
};

export const NOMINASI_BEM = Object.values(BemNomination);

export enum UkmNomination {
  MOST_PRODUCTIVE = "Most Productive UKM",
  BEST_MEDSOS = "Best Media Social",
}

export const UKM_NOMINATIONS: Record<UkmNomination, string[]> = {
  [UkmNomination.MOST_PRODUCTIVE]: [
    "LPJ Program Kerja / LPJ Tengah Tahun",
    "OKR Program Kerja",
  ],
  [UkmNomination.BEST_MEDSOS]: [
    "Setidaknya mengisi pendataan media sosial sekali",
  ],
};

export const NOMINASI_UKM = Object.values(UkmNomination);
