import type { NominationItem } from "@/src/feature/admin/submission/types/ormawa";

export const BEM_NOMINATIONS: NominationItem[] = [
  { id: "bem-most-productive", label: "Most Productive" },
  { id: "bem-best-mega-proker", label: "Best Mega Program Kerja" },
  { id: "bem-best-media-social", label: "Best Media Social" },
  { id: "bem-most-impact", label: "Most Impact" },
  { id: "bem-terpegerakan", label: "BEM Terpegerakan" },
  { id: "bem-terpengembangan", label: "BEM Terpengembangan" },
  { id: "bem-terpelayanan", label: "BEM Terpelayanan" },
];

export const DPM_NOMINATIONS: NominationItem[] = [
  { id: "dpm-most-aspirative", label: "Most Aspirative" },
  { id: "dpm-best-social-media", label: "Best Social Media" },
];

export const HIMA_NOMINATIONS: NominationItem[] = [
  { id: "hima-most-productive", label: "Most Productive" },
  { id: "hima-most-collaborative", label: "Most Collaborative" },
  { id: "hima-best-educational", label: "The Best Educational Development" },
  { id: "hima-best-media-social", label: "Best Media Social" },
];

export const UKM_NOMINATIONS: NominationItem[] = [
  { id: "ukm-most-productive", label: "Most Productive" },
  { id: "ukm-best-media-social", label: "Best Media Social" },
];

export const UKM_SUBCATEGORIES = [
  { value: "olahraga", label: "Olahraga" },
  { value: "seni", label: "Seni & Budaya" },
  { value: "penalaran", label: "Penalaran" },
  { value: "kerohanian", label: "Kerohanian" },
  { value: "khusus", label: "Khusus" },
];

export const ORMAWA_TYPES = [
  { value: "BEM", label: "BEM" },
  { value: "DPM", label: "DPM" },
  { value: "HIMA", label: "HIMA" },
  { value: "UKM", label: "UKM" },
  { value: "UKM PENALARAN", label: "UKM PENALARAN" },
  { value: "UKM OLAHRAGA", label: "UKM OLAHRAGA" },
  { value: "UKM KESENIAN", label: "UKM KESENIAN" },
  { value: "UKM KEROHANIAN", label: "UKM KEROHANIAN" },
];
