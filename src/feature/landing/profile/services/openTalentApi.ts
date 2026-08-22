import { api } from "@/src/lib/axios";

export interface OpenTalentResponse {
  success: boolean;
  message: string;
  data: {
    id: string;
    leader_name: string;
    leader_faculty: string;
    talent_name: string;
    performance_type: string;
    member_count: number;
    leader_wa_contact: string;
    drive_link: string;
    status: "pending" | "approved" | "rejected";
    created_at: string;
    updated_at: string;
  };
}

export async function getMyOpenTalent(): Promise<OpenTalentResponse> {
  const response = await api.get<OpenTalentResponse>("/v1/open-talent/me");

  return response.data;
}
