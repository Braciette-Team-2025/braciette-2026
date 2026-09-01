import { api } from "@/src/lib/axios";
import type {
  ExternalSubmissionDeleteResponse,
  ExternalSubmissionDetailResponse,
  ExternalSubmissionListResponse,
  ExternalSubmissionParams,
} from "../types/ormawa";

const BASE_URL = "/v1/submission/external";

export async function getExternalSubmissions(
  params?: ExternalSubmissionParams,
): Promise<ExternalSubmissionListResponse> {
  const response = await api.get<ExternalSubmissionListResponse>(BASE_URL, {
    params,
  });
  return response.data;
}

export async function getExternalSubmissionById(
  id: string,
): Promise<ExternalSubmissionDetailResponse> {
  const response = await api.get<ExternalSubmissionDetailResponse>(
    `${BASE_URL}/${id}`,
  );
  return response.data;
}

export async function deleteExternalSubmission(
  id: string,
): Promise<ExternalSubmissionDeleteResponse> {
  const response = await api.delete<ExternalSubmissionDeleteResponse>(
    `${BASE_URL}/${id}`,
  );
  return response.data;
}

export async function createExternalSubmission(
  formData: FormData,
): Promise<ExternalSubmissionDetailResponse> {
  const response = await api.post<ExternalSubmissionDetailResponse>(
    BASE_URL,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}

export async function updateExternalSubmission(
  id: number | string,
  formData: FormData,
): Promise<ExternalSubmissionDetailResponse> {
  const response = await api.put<ExternalSubmissionDetailResponse>(
    `${BASE_URL}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
  return response.data;
}
