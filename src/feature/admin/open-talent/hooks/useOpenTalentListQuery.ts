"use client";

import { useQuery } from "@tanstack/react-query";
import { getOpenTalentList } from "../services/openTalentService";
import type { OpenTalentParams } from "../types";

export const openTalentKeys = {
  all: ["open-talent"] as const,
  lists: () => [...openTalentKeys.all, "list"] as const,
  list: (params: OpenTalentParams) =>
    [...openTalentKeys.lists(), params] as const,
  details: () => [...openTalentKeys.all, "detail"] as const,
  detail: (id: string) => [...openTalentKeys.details(), id] as const,
};

export function useOpenTalentListQuery(params: OpenTalentParams) {
  return useQuery({
    queryKey: openTalentKeys.list(params),
    queryFn: () => getOpenTalentList(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}
