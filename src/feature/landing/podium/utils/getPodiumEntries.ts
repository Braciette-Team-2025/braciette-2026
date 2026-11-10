import { STATIC_VOTING_RESULTS } from "@/src/feature/admin/voting/data/votingResults.static";
import { VOTING_CATEGORIES } from "@/src/feature/admin/voting/constants/voting";
import type {
  PodiumCategoryId,
  PodiumEntry,
  PodiumRank,
} from "../types/podium.types";

export function isPodiumCategory(value: string): value is PodiumCategoryId {
  return VOTING_CATEGORIES.some((category) => category.id === value);
}

/** Ambil 3 besar suatu kategori dari data statis, terurut juara 1 -> 3. */
export function getPodiumEntries(categoryId: PodiumCategoryId): PodiumEntry[] {
  return [...(STATIC_VOTING_RESULTS[categoryId] ?? [])]
    .sort((a, b) => b.vote_count - a.vote_count)
    .slice(0, 3)
    .map((item, index) => ({
      rank: (index + 1) as PodiumRank,
      id: item.id,
      name: item.name.trim(),
      votes: item.vote_count,
    }));
}
