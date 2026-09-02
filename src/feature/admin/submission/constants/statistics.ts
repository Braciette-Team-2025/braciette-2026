import { Users } from "lucide-react";
import { PerformanceCard } from "../types/statistic";

export function generateStatisticCards(
  total: number,
  counts: Record<string, number>,
): PerformanceCard[] {
  return [
    {
      id: 1,
      label: "Ormawa",
      value: total,
      icon: Users,
    },
    {
      id: 2,
      label: "BEM",
      value: counts["BEM"] || 0,
      icon: Users,
    },
    {
      id: 3,
      label: "DPM",
      value: counts["DPM"] || 0,
      icon: Users,
    },
    {
      id: 4,
      label: "HIMA",
      value: counts["HIMA"] || 0,
      icon: Users,
    },
    {
      id: 5,
      label: "UKM",
      value: counts["UKM"] || 0,
      icon: Users,
    },
  ];
}
