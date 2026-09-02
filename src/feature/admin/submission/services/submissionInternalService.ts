import { api } from "@/src/lib/axios";
import type {
  InternalSubmissionListResponse,
  InternalSubmissionDetailResponse,
  InternalSubmissionParams,
} from "../types/ormawa";

export const getInternalSubmissions = async (
  params?: InternalSubmissionParams,
): Promise<InternalSubmissionListResponse> => {
  const { data } = await api.get<InternalSubmissionListResponse>(
    "/v1/submission/internal",
    {
      params,
    },
  );
  return data;
};

export const getInternalSubmissionById = async (
  id: string,
): Promise<InternalSubmissionDetailResponse> => {
  const { data } = await api.get<InternalSubmissionDetailResponse>(
    `/v1/submission/internal/${id}`,
  );
  return data;
};

export const updateInternalSubmission = async (
  id: string,
  payload: FormData,
): Promise<InternalSubmissionDetailResponse> => {
  const { data } = await api.put<InternalSubmissionDetailResponse>(
    `/v1/submission/internal/${id}`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return data;
};

export const updateInternalSubmissionStatus = async (
  id: string,
  status: "accepted" | "pending" | "rejected",
): Promise<InternalSubmissionDetailResponse> => {
  const { data } = await api.patch<InternalSubmissionDetailResponse>(
    `/v1/submission/internal/${id}/status`,
    { status },
  );
  return data;
};

export const deleteInternalSubmission = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.delete<{ success: boolean; message: string }>(
    `/v1/submission/internal/${id}`,
  );
  return data;
};
