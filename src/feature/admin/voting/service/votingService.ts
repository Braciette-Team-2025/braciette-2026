import { api } from "@/src/lib/axios";
import type {
  VotingCategoryId,
  VotingHomeResponse,
  VotingListResponse,
} from "../types/voting";

const BASE_URL = "/v1/submission/external";

const CATEGORY_TYPE_MAP: Record<VotingCategoryId, string> = {
  bem: "BEM",
  dpm: "DPM",
  hima: "HIMA",
  ukm: "UKM",
};

export async function getVotingSubmissions(
  category: VotingCategoryId,
): Promise<VotingListResponse> {
  const type = CATEGORY_TYPE_MAP[category];

  const response = await api.get<VotingListResponse>(`${BASE_URL}/home`, {
    params: {
      type,
    },
  });

  return response.data;
}

export async function getVotingHome(): Promise<VotingHomeResponse> {
  const response = await api.get<VotingHomeResponse>(`${BASE_URL}/home`);

  return response.data;
}
