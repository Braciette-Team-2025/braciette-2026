import { Skeleton } from "@/components/ui/skeleton";
import { StatisticCard } from "./StatisticsCard";
import { STATISTIC_LABELS } from "../../constants/statistic";
import type { VotingStatistic } from "../../types/voting";

export interface StatisticSectionProps {
  statistic?: VotingStatistic;
  isLoading?: boolean;
}

export function StatisticSection({
  statistic,
  isLoading,
}: StatisticSectionProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Skeleton className="h-24 rounded-xl sm:h-28" />
        <Skeleton className="h-24 rounded-xl sm:h-28" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
      <StatisticCard
        label={STATISTIC_LABELS.totalVoting}
        value={(statistic?.totalVoting ?? 0).toLocaleString("id-ID")}
      />
      <StatisticCard
        label={STATISTIC_LABELS.bestCandidate}
        value={statistic?.bestCandidateName ?? "-"}
      />
    </div>
  );
}
