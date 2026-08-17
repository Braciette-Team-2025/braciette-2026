export enum JenisOrmawa {
  BEM = "bem",
  DPM = "dpm",
  HIMA = "hima",
  UKM_PENALARAN = "ukm-penalaran",
  UKM_OLAHRAGA = "ukm-olahraga",
  UKM_KESENIAN = "ukm-kesenian",
  UKM_KEROHANIAN = "ukm-kerohanian",
}

export const LABEL_ORMAWA: Record<JenisOrmawa, string> = {
  [JenisOrmawa.BEM]: "BEM",
  [JenisOrmawa.DPM]: "DPM",
  [JenisOrmawa.HIMA]: "HIMA",
  [JenisOrmawa.UKM_PENALARAN]: "UKM Penalaran",
  [JenisOrmawa.UKM_OLAHRAGA]: "UKM Olahraga",
  [JenisOrmawa.UKM_KESENIAN]: "UKM Kesenian",
  [JenisOrmawa.UKM_KEROHANIAN]: "UKM Kerohanian",
};

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

export enum HimaNomination {
  MOST_PRODUCTIVE = "Most Productive HIMA",
  MOST_COLLABORATIVE = "Most Collaborative HIMA",
  BEST_EDUCATIONAL = "The Best Educational Development",
  BEST_MEDSOS = "Best Media Social",
}

export const HIMA_NOMINATIONS: Record<HimaNomination, string[]> = {
  [HimaNomination.MOST_PRODUCTIVE]: [
    "LPJ Program Kerja / LPJ Tengah Tahun",
    "OKR Program Kerja",
  ],
  [HimaNomination.MOST_COLLABORATIVE]: ["MoU", "LPJ"],
  [HimaNomination.BEST_EDUCATIONAL]: ["LPJ", "MoU Pembicara", "Bukti Absen"],
  [HimaNomination.BEST_MEDSOS]: [
    "Setidaknya mengisi pendataan media sosial sekali",
  ],
};

export const NOMINASI_HIMA = Object.values(HimaNomination);

export enum DpmNomination {
  MOST_ASPIRATIVE = "Most Aspirative",
  BEST_MEDSOS = "Best Media Social",
}

export const DPM_NOMINATIONS: Record<DpmNomination, string[]> = {
  [DpmNomination.MOST_ASPIRATIVE]: ["LPJ / Press Released"],
  [DpmNomination.BEST_MEDSOS]: [
    "Setidaknya mengisi pendataan media sosial sekali",
  ],
};

export const NOMINASI_DPM = Object.values(DpmNomination);

export function getRequiredFiles(
  selectedNominasi: string[],
  nominationsRecord: Record<string, string[]>,
): string[] {
  return Array.from(
    new Set<string>(
      selectedNominasi.flatMap((n) => nominationsRecord[n] || []),
    ),
  );
}
