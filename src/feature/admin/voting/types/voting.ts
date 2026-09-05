export type VotingCategoryId = "bem" | "dpm" | "hima" | "ukm";

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

/**
 * Response:
 * GET /v1/submission/external?type=BEM
 */
export interface VotingListItem {
  id: string;
  type: string;
  name: string;
  logo_url: string;
  vote_count: number;
}

export interface VotingListResponse {
  success: boolean;
  message: string;
  data: {
    data: VotingListItem[];
    total: number;
    page: number;
    limit: number;
  };
}

/**
 * Response:
 * GET /v1/submission/external/home
 */
export interface VotingStats {
  total: number;
  bem: number;
  dpm: number;
  hima: number;
  ukm: number;
}

export interface VotingHomeItem {
  id: string;
  type: string;
  name: string;
  logo_url: string;
  vote_count: number;
}

export interface VotingHomeResponse {
  success: boolean;
  message: string;
  data: {
    stats: VotingStats;
    data: VotingHomeItem[];
    total: number;
    page: number;
    limit: number;
  };
}
