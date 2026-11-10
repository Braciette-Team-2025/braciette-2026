import { VOTING_CATEGORIES } from "@/src/feature/admin/voting/constants/voting";
import type { PodiumCategoryId, PodiumLogo } from "../types/podium.types";

export const PODIUM_BRAND_TEXT = "Brawijaya Festival Appreciate";
export const PODIUM_TITLE_TEXT = "Most Favorite";

/**
 * Logo pada pill di header. Tambahkan logo lain (UB, BEM, DPM, dst.)
 * ke array ini setelah filenya ada di /public/images/logo/.
 */
export const PODIUM_LOGOS: PodiumLogo[] = [
  { src: "/images/logo/just_logo.svg", alt: "Braciate" },
];

export const PODIUM_CATEGORY_LABEL = Object.fromEntries(
  VOTING_CATEGORIES.map((category) => [category.id, category.label]),
) as Record<PodiumCategoryId, string>;
