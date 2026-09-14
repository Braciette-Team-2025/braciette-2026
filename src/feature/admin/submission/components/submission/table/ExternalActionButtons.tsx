import { Button } from "@/components/ui/button";
import type { ExternalSubmissionItem } from "../../../types/ormawa";

interface ExternalActionButtonsProps {
  data: ExternalSubmissionItem;
  onDetail: (data: ExternalSubmissionItem) => void;
  onDelete: (data: ExternalSubmissionItem) => void;
  onEdit?: (data: ExternalSubmissionItem) => void;
}

/**
 * Tombol aksi untuk baris tabel submission external.
 * Tombol Edit mengarahkan ke halaman edit terpisah.
 */
export function ExternalActionButtons({
  data,
  onDetail,
  onDelete,
  onEdit,
}: ExternalActionButtonsProps) {
  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => onDetail(data)}
        size="xs"
        variant="secondary"
        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-4"
      >
        Detail
      </Button>

      <Button
        onClick={() => onEdit?.(data)}
        size="xs"
        variant="secondary"
        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-4"
      >
        Edit
      </Button>

      <Button
        onClick={() => onDelete(data)}
        size="xs"
        variant="secondary"
        className="bg-red-500 hover:bg-red-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-4"
      >
        Hapus
      </Button>
    </div>
  );
}
