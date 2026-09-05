"use client";

import { StatisticSection } from "./StatisticsSection";
import { VotingSidebar } from "./VotingSidebar";
import { VotingTable } from "./VotingTable";

import type {
  VotingCategory,
  VotingCategoryId,
  VotingResultItem,
  VotingStatistic,
} from "../../types/voting";

interface VotingContentProps {
  categories: VotingCategory[];
  activeCategoryId: VotingCategoryId;
  onCategoryChange: (id: VotingCategoryId) => void;

  statistic?: VotingStatistic;

  items: VotingResultItem[];

  isLoading?: boolean;

  nameColumnLabel?: string;

  bestCandidateLabel?: string;

  pagination?: React.ReactNode;
}

export function VotingContent({
  categories,
  activeCategoryId,
  onCategoryChange,
  statistic,
  items,
  isLoading,
  nameColumnLabel,
  bestCandidateLabel,
  pagination,
}: VotingContentProps) {
  return (
    <div className="space-y-6">
      <StatisticSection
        statistic={statistic}
        isLoading={isLoading}
        bestCandidateLabel={bestCandidateLabel}
      />

      <div className="flex flex-col gap-6 lg:flex-row">
        <VotingSidebar
          categories={categories}
          activeCategoryId={activeCategoryId}
          onSelect={onCategoryChange}
        />

        <div className="flex-1 space-y-4">
          <VotingTable
            items={items}
            isLoading={isLoading}
            nameColumnLabel={nameColumnLabel}
          />

          {pagination}
        </div>
      </div>
    </div>
  );
}
