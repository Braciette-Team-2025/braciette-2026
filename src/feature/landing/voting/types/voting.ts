export type VotingStep = "category" | "organization";

export interface VoteSubmitPayload {
  categoryId: string;
  organizationId: string;
}

export interface VoteSubmitResult {
  success: boolean;
  message: string;
}
