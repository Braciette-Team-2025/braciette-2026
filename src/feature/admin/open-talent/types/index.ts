import { ReactNode } from "react";

export type OpenTalentStatus = "pending" | "accepted" | "rejected";

export type OpenTalentListItem = {
  id: string; // di API ini UUID (string)
  leader_name: string;
  leader_wa_contact: string;
  performance_type: string;
  status: OpenTalentStatus;
};

export type OpenTalentDetail = OpenTalentListItem & {
  leader_faculty: string;
  talent_name: string;
  member_count: number;
  drive_link: string;
  created_at: string;
  updated_at: string;
};

export type OpenTalentPayload = {
  leader_name: string;
  leader_faculty: string;
  talent_name: string;
  performance_type: string;
  member_count?: number;
  leader_wa_contact: string;
  drive_link: string;
};

export type OpenTalentListResponse = {
  success: boolean;
  message: string;
  data: {
    data: OpenTalentListItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

export type OpenTalentDetailResponse = {
  success: boolean;
  message: string;
  data: OpenTalentDetail;
};

export type OpenTalentParams = {
  search?: string;
  status?: string;
  performance_type?: string;
  sort_by?: string;
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
};

export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
  widthClassName?: string;
}

export interface OpenTalentDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: OpenTalentDetail;
}
