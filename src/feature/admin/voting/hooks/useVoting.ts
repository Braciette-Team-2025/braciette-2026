"use client";

import { useQuery } from "@tanstack/react-query";
import { getVotingHome, getVotingSubmissions } from "../service/votingService";
import type { VotingCategoryId } from "../types/voting";

export const votingKeys = {
  all: ["admin", "voting"] as const,

  home: () => [...votingKeys.all, "home"] as const,

  lists: () => [...votingKeys.all, "list"] as const,

  list: (category: VotingCategoryId) =>
    [...votingKeys.lists(), category] as const,
};

export function useVotingList(category: VotingCategoryId) {
  return useQuery({
    queryKey: votingKeys.list(category),
    queryFn: () => getVotingSubmissions(category),

    // Jangan fetch berulang-ulang selama 30 detik.
    staleTime: 30 * 1000,

    // Cache disimpan 5 menit.
    gcTime: 5 * 60 * 1000,

    // Pastikan category valid sebelum request.
    enabled: Boolean(category),
  });
}

export function useVotingHome() {
  return useQuery({
    queryKey: votingKeys.home(),
    queryFn: getVotingHome,

    // Data statistik tidak perlu dihantam API terus-menerus.
    staleTime: 30 * 1000,

    gcTime: 5 * 60 * 1000,
  });
}
