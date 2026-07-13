import { LucideIcon } from "lucide-react";

export interface PerformanceCard {
  id: number;
  label: string;
  value: number;
  icon: LucideIcon;
}
export interface StatisticProps {
  cards: PerformanceCard[];
}
