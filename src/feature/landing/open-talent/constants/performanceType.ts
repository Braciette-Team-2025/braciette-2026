import { OpenTalentFormValues, PerformanceType } from "../types/openTalentForm";

export const PERFORMANCE_TYPE_OPTIONS: {
  value: PerformanceType;
  label: string;
}[] = [
  { value: "Individu", label: "Individu" },
  { value: "Kelompok", label: "Kelompok" },
];

export const EMPTY_OPEN_TALENT_FORM_VALUES: OpenTalentFormValues = {
  leaderName: "",
  faculty: "",
  leaderContact: "",
  talent: "",
  performanceType: "Individu",
  memberCount: 1,
  driveLink: "",
};
