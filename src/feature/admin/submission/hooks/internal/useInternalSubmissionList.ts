import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getInternalSubmissions } from "../../services/submissionInternalService";
import type { InternalSubmissionParams } from "../../types/ormawa";

export const internalSubmissionKeys = {
  all: ["submission", "internal"] as const,
  lists: () => [...internalSubmissionKeys.all, "list"] as const,
  list: (params: InternalSubmissionParams) =>
    [...internalSubmissionKeys.lists(), params] as const,
};

export function useInternalSubmissionList(params: InternalSubmissionParams) {
  return useQuery({
    queryKey: internalSubmissionKeys.list(params),
    queryFn: () => getInternalSubmissions(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
}
