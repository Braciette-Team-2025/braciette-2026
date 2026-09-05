export interface Organization {
  id: string;
  categoryId: string;
  name: string;
  logo?: string;
  logo_url?: string;
  voteCount?: number;
  vote_count?: number;
  status: "accepted" | "pending" | "rejected";
}
