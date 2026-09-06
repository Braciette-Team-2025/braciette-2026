import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getOrmawaList } from "../services/ormawaListService";
import type { InternalSubmissionParams } from "../types/ormawa";

export const ormawaListKeys = {
  all: ["ormawa", "list"] as const,
  lists: () => [...ormawaListKeys.all, "list"] as const,
  list: (params: InternalSubmissionParams) =>
    [...ormawaListKeys.lists(), params] as const,
};

export function useOrmawaList(params: InternalSubmissionParams) {
  return useQuery({
    queryKey: ormawaListKeys.list(params),
    queryFn: () => getOrmawaList(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
