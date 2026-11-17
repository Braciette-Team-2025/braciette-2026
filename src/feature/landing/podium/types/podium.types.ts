import type { VotingCategoryId } from "@/src/feature/admin/voting/types/voting";

export type PodiumRank = 1 | 2 | 3;

export interface PodiumEntry {
  rank: PodiumRank;
  id: string;
  name: string;
  votes: number;
}

export interface PodiumLogo {
  src: string;
  alt: string;
}

export type PodiumCategoryId = VotingCategoryId;
