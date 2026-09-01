export type OrmawaType =
  | "BEM"
  | "DPM"
  | "HIMA"
  | "UKM"
  | "UKM PENALARAN"
  | "UKM OLAHRAGA"
  | "UKM KESENIAN"
  | "UKM KEROHANIAN";

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
  jenisOrmawa: OrmawaType | "";
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

export interface OrmawaTable {
  id: number;
  tanggalPendaftaran: string;
  terakhirDiedit: string;
  pic: string;
  kontakPic: string;
  namaOrmawa: string;
  jenisOrmawa: OrmawaType;
  namaKabinet: string;
  nominasi: string[];
  programKerjaUnggulan: string;
  status: "approved" | "pending" | "rejected";
  deskripsiSingkat: string;
  linkDrive: string;

  subKategori?: string;
  lombaDimenangkan?: string[];
}

export interface SubmissionActionHandlers {
  onDelete: (id: number) => void;
  onEdit: (data: OrmawaTable) => void;
  onDetail: (data: OrmawaTable) => void;
}

export interface SubmissionProps extends SubmissionActionHandlers {
  submissionList: OrmawaTable[];
  type: "internal" | "external";
  startIndex: number;
}

export interface SubmissionContentProps extends SubmissionActionHandlers {
  type: "internal" | "external";
}

export interface SubmissionDetailData {
  id: number;
  tanggalPendaftaran: string;
  terakhirDiedit: string;
  pic: string;
  kontakPic: string;
  namaOrmawa: string;
  jenisOrmawa: OrmawaType;
  namaKabinet: string;
  nominasi: string[];
  programKerjaUnggulan: string;
  status: "approved" | "pending" | "rejected";
  deskripsiSingkat: string;
  linkDrive: string;

  subKategori?: string;
  lombaDimenangkan?: string[];
}

export interface SubmissionDetailModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: SubmissionDetailData;
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
  type: OrmawaType;
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
