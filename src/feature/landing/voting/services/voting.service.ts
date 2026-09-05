import { api } from "@/src/lib/axios";
import { CATEGORIES } from "../constants/category";
import type { Category } from "../types/category";
import type { Organization } from "../types/organization";
import type { VoteSubmitPayload, VoteSubmitResult } from "../types/voting";

type OrmawaType = "BEM" | "DPM" | "HIMA" | "UKM";

interface ExternalSubmissionItem {
  id: string;
  type: OrmawaType;
  name: string;
  logo_url: string;
  vote_count: number;
  status: "accepted" | "pending" | "rejected";
}

interface ExternalSubmissionListResponse {
  success: boolean;
  message: string;
  data: {
    data: ExternalSubmissionItem[];
    total: number;
    page: number;
    limit: number;
  };
}

interface VoteApiResponse {
  success: boolean;
  message: string;
}

function categoryIdToType(categoryId: string): OrmawaType {
  const type = categoryId.toUpperCase();

  if (type !== "BEM" && type !== "DPM" && type !== "HIMA" && type !== "UKM") {
    throw new Error(`Invalid ormawa type: ${categoryId}`);
  }

  return type;
}

export const votingService = {
  async getCategories(): Promise<Category[]> {
    return CATEGORIES;
  },

  async getOrganizationsByCategory(
    categoryId: string,
  ): Promise<Organization[]> {
    const type = categoryIdToType(categoryId);

    const response = await api.get<ExternalSubmissionListResponse>(
      "/v1/submission/external",
      {
        params: {
          type,
          // status: "accepted",
        },
      },
    );

    return response.data.data.data.map((item) => ({
      id: item.id,
      categoryId: item.type.toLowerCase(),
      name: item.name,
      logo: item.logo_url,
      logo_url: item.logo_url,
      voteCount: item.vote_count,
      vote_count: item.vote_count,
      status: item.status,
    }));
  },

  async submitVote(payload: VoteSubmitPayload): Promise<VoteSubmitResult> {
    const response = await api.post<VoteApiResponse>(
      `/v1/submission/external/${payload.organizationId}/vote`,
    );

    return {
      success: response.data.success,
      message: response.data.message,
    };
  },
};
