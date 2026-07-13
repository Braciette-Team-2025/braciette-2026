export type OrmawaType = "BEM" | "DPM" | "HIMA" | "UKM";

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
  subKategori: string;
  driveLink: string;
}
