import { CATEGORIES } from "../constants/category";
import { ORGANIZATIONS } from "../constants/organization";
import { Category } from "../types/category";
import { Organization } from "../types/organization";
import { VoteSubmitPayload, VoteSubmitResult } from "../types/voting";

const SIMULATED_LATENCY_MS = 500;

function delay<T>(value: T, ms: number = SIMULATED_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

export const votingService = {
  async getCategories(): Promise<Category[]> {
    return delay(CATEGORIES);
  },

  async getOrganizationsByCategory(
    categoryId: string,
  ): Promise<Organization[]> {
    const filtered = ORGANIZATIONS.filter(
      (org) => org.categoryId === categoryId,
    );
    return delay(filtered);
  },

  async submitVote(payload: VoteSubmitPayload): Promise<VoteSubmitResult> {
    return delay({
      success: true,
      message: `Vote recorded for organization "${payload.organizationId}" in category "${payload.categoryId}".`,
    });
  },
};
