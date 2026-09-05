import type { VotingCategory, VotingCategoryId } from "../types/voting";

export const VOTING_CATEGORIES: VotingCategory[] = [
  {
    id: "bem",
    label: "BEM",
  },
  {
    id: "dpm",
    label: "DPM",
  },
  {
    id: "hima",
    label: "HIMA",
  },
  {
    id: "ukm",
    label: "UKM",
  },
];

export const DEFAULT_VOTING_CATEGORY_ID: VotingCategoryId = "bem";
