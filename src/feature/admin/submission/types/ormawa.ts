export type InternalOrmawaType =
  | "BEM"
  | "DPM"
  | "HIMA"
  | "UKM Penalaran"
  | "UKM Olahraga"
  | "UKM Seni"
  | "UKM Kerohanian";

export type ExternalOrmawaType = "BEM" | "DPM" | "HIMA" | "UKM";

export interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  title: string;
  description: string;

  confirmText: string;
  cancelText?: string;

  onConfirm: () => void;

  loading?: boolean;

  variant?: "default" | "destructive";
}

export interface NominationItem {
  id: string;
  label: string;
}

export interface CompetitionItem {
  id: string;
  name: string;
}

export interface StepOneValues {
  jenisOrmawa: InternalOrmawaType | "";
  namaOrmawa: string;
  namaKabinet: string;
  pic: string;
  kontakPic: string;
  deskripsi: string;
  programKerja: string;
}

export interface StepTwoValues {
  selectedNominations: string[];
  competitions: CompetitionItem[];
  driveLink: string;
}

export interface SubmissionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: InternalSubmissionDetail;
}

export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: React.ReactNode;
  widthClassName?: string;
}

export interface ExternalSubmissionItem {
  id: string;
  type: ExternalOrmawaType;
  name: string;
  logo_url: string;
  vote_count: number;
}

export interface ExternalSubmissionDetail extends ExternalSubmissionItem {
  created_at: string;
  updated_at: string;
}

export interface ExternalSubmissionListResponse {
  success: boolean;
  message: string;
  data: {
    data: ExternalSubmissionItem[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ExternalSubmissionDetailResponse {
  success: boolean;
  message: string;
  data: ExternalSubmissionDetail;
}

export interface ExternalSubmissionDeleteResponse {
  success: boolean;
  message: string;
}

export interface ExternalSubmissionParams {
  search?: string;
  type?: string;
  page?: number;
  limit?: number;
  sort_by?: "name" | "created_at";
  order?: "asc" | "desc";
}

export interface ExternalSubmissionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: ExternalSubmissionDetail;
}

export interface InternalSubmissionItem {
  id: string;
  name: string;
  type: InternalOrmawaType;
  pic: string;
  pic_contact: string;
  status: "accepted" | "pending" | "rejected";
}

export interface InternalSubmissionDetail extends InternalSubmissionItem {
  logo_url: string;
  created_at: string;
  updated_at: string;
  cabinet_name: string;
  nominations: string[];
  major_program: string;
  mission: string;
  drive_link: string;
  social_medias: { platform: string; url: string }[];
}

export interface InternalSubmissionStats {
  total: number;
  bem: number;
  dpm: number;
  hima: number;
  ukm: number;
}

export interface InternalSubmissionListResponse {
  success: boolean;
  message: string;
  data: {
    stats: InternalSubmissionStats;
    data: InternalSubmissionItem[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface InternalSubmissionDetailResponse {
  success: boolean;
  message: string;
  data: InternalSubmissionDetail;
}

export interface InternalSubmissionParams {
  search?: string;
  type?: string;
  status?: string;
  page?: number;
  limit?: number;
  sort_by?: "name" | "created_at";
  order?: "asc" | "desc";
}

export interface ExternalSubmissionItem {
  id: string;
  type: ExternalOrmawaType;
  name: string;
  logo_url: string;
  pic?: string;
  pic_contact?: string;
  status?: string;
}

export interface ExternalSubmissionListResponse {
  success: boolean;
  message: string;
  data: {
    data: ExternalSubmissionItem[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface ExternalHomeStats {
  total: number;
  bem: number;
  dpm: number;
  hima: number;
  ukm: number;
}

export interface ExternalHomeItem {
  id: string;
  type: ExternalOrmawaType;
  name: string;
  logo_url: string;
  vote_count: number;
}

export interface ExternalHomeResponse {
  success: boolean;
  message: string;
  data: {
    stats: ExternalHomeStats;
    data: ExternalHomeItem[];
    total: number;
    page: number;
    limit: number;
  };
}
