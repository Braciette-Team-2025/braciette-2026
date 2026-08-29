export type PerformanceType = "Individu" | "Kelompok";

export interface OpenTalentFormValues {
  leaderName: string;
  faculty: string;
  leaderContact: string;
  talent: string;
  performanceType: PerformanceType;
  memberCount: number;
  driveLink: string;
}

export type OpenTalentFormMode = "create" | "view";
