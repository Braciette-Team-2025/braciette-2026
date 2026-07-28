export type VotingCategoryId = string;

export interface VotingCategory {
  id: VotingCategoryId;
  label: string;
}

export interface VotingResultItem {
  rank: number;
  id: string;
  name: string;
  totalVote: number;
}

export interface VotingStatistic {
  totalVoting: number;
  bestCandidateName: string;
}

export interface PaginationState {
  page: number;
  totalPages: number;
}
