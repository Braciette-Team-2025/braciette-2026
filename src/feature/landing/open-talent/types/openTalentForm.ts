export type PerformanceType = "Individu" | "Kelompok";

export interface OpenTalentFormValues {
  leaderName: string;
  faculty: string;
  leaderContact: string;
  talent: string;
  performanceType: PerformanceType | "";
  memberCount: number;
  driveLink: string;
}

/**
 * "create"  -> empty/editable fields, buttons are Next / Back / Confirm.
 * "view"    -> fields pre-filled and read-only, buttons collapse into a
 *              single "Hasil Open Talent" link on each step.
 */
export type OpenTalentFormMode = "create" | "view";
