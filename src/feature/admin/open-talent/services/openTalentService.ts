import { api } from "@/src/lib/axios";
import type {
  OpenTalentDetailResponse,
  OpenTalentListResponse,
  OpenTalentParams,
  OpenTalentPayload,
  OpenTalentStatus,
} from "../types";

const BASE_URL = "/v1/open-talent";
const ADMIN_URL = "/v1/open-talent/admin";

export const getOpenTalentList = async (
  params?: OpenTalentParams,
): Promise<OpenTalentListResponse> => {
  const { data } = await api.get<OpenTalentListResponse>(BASE_URL, { params });
  return data;
};

export const getOpenTalentById = async (
  id: string,
): Promise<OpenTalentDetailResponse> => {
  const { data } = await api.get<OpenTalentDetailResponse>(`${BASE_URL}/${id}`);
  return data;
};

export const createOpenTalent = async (
  payload: OpenTalentPayload,
): Promise<OpenTalentDetailResponse> => {
  const { data } = await api.post<OpenTalentDetailResponse>(ADMIN_URL, payload);
  return data;
};

export const updateOpenTalent = async (
  id: string,
  payload: OpenTalentPayload,
): Promise<OpenTalentDetailResponse> => {
  const { data } = await api.put<OpenTalentDetailResponse>(
    `${BASE_URL}/${id}`,
    payload,
  );
  return data;
};

export const updateOpenTalentStatus = async (
  id: string,
  status: OpenTalentStatus,
): Promise<OpenTalentDetailResponse> => {
  const { data } = await api.patch<OpenTalentDetailResponse>(
    `${BASE_URL}/${id}/status`,
    { status },
  );
  return data;
};

export const deleteOpenTalent = async (
  id: string,
): Promise<{ success: boolean; message: string }> => {
  const { data } = await api.delete(`${BASE_URL}/${id}`);
  return data;
};
