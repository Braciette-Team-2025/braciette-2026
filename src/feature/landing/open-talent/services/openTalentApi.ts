import { api } from "@/src/lib/axios";

import { OpenTalentFormValues } from "../types/openTalentForm";

export interface OpenTalentSubmitResponse {
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

export async function submitOpenTalent(
  values: OpenTalentFormValues,
): Promise<OpenTalentSubmitResponse> {
  const payload: Record<string, unknown> = {
    leader_name: values.leaderName,
    leader_faculty: values.faculty,
    talent_name: values.talent,
    performance_type: values.performanceType,
    leader_wa_contact: values.leaderContact,
    drive_link: values.driveLink,
  };

  if (values.performanceType === "Kelompok") {
    payload.member_count = values.memberCount;
  }

  const response = await api.post<OpenTalentSubmitResponse>(
    "/v1/open-talent",
    payload,
  );

  return response.data;
}
