"use client";

import { useQuery } from "@tanstack/react-query";
import { getExternalSubmissions } from "../../services/submissionExternalService";
import type { ExternalSubmissionParams } from "../../types/ormawa";

export const externalSubmissionKeys = {
  all: ["submission", "external"] as const,
  lists: () => [...externalSubmissionKeys.all, "list"] as const,
  list: (params: ExternalSubmissionParams) =>
    [...externalSubmissionKeys.lists(), params] as const,
  details: () => [...externalSubmissionKeys.all, "detail"] as const,
  detail: (id: string) => [...externalSubmissionKeys.details(), id] as const,
};

export function useExternalSubmissionList(params: ExternalSubmissionParams) {
  return useQuery({
    queryKey: externalSubmissionKeys.list(params),
    queryFn: () => getExternalSubmissions(params),
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
}

export function useExternalStatistics() {
  return useQuery({
    queryKey: [...externalSubmissionKeys.all, "statistics"] as const,
    queryFn: () => getExternalSubmissions({ limit: 10000 }),
    staleTime: 60 * 1000,
  });
}
