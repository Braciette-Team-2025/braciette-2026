import { api } from "@/src/lib/axios";
import type {
  VotingCategoryId,
  VotingHomeResponse,
  VotingListResponse,
} from "../types/voting";

const BASE_URL = "/v1";

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

  const response = await api.get<VotingListResponse>(
    `${BASE_URL}/submission/external/home`,
    {
      params: {
        type,
      },
    },
  );

  return response.data;
}

export async function getVotingHome(
  category?: VotingCategoryId | string,
): Promise<VotingHomeResponse> {
  let type: string | undefined;

  if (category) {
    type =
      CATEGORY_TYPE_MAP[category as VotingCategoryId] ?? category.toUpperCase();
  }

  const response = await api.get<VotingHomeResponse>(
    `${BASE_URL}/public/vote-results`,
    {
      params: type ? { type } : undefined,
    },
  );

  return response.data;
}
