import { api } from "@/src/lib/axios";
import type {
  InternalSubmissionListResponse,
  InternalSubmissionParams,
} from "../types/ormawa";

export const getOrmawaList = async (
  params?: InternalSubmissionParams,
): Promise<InternalSubmissionListResponse> => {
  const { data } = await api.get<InternalSubmissionListResponse>(
    "/v1/submission/internal",
    { params },
  );
  return data;
};
