import { Button } from "@/components/ui/button";
import { InternalSubmissionItem } from "../../../types/ormawa";

interface InternalActionButtonsProps {
  onDetail: (data: InternalSubmissionItem) => void;
  onDelete: (id: string) => void;
  onEdit: (data: InternalSubmissionItem) => void;
  data: InternalSubmissionItem;
}

/**
 * Tombol aksi untuk baris tabel submission internal.
 * Tombol Edit mengarahkan ke halaman edit terpisah.
 */
export function InternalActionButtons({
  onDetail,
  onDelete,
  onEdit,
  data,
}: InternalActionButtonsProps) {
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
        onClick={() => onEdit(data)}
        size="xs"
        variant="secondary"
        className="bg-yellow-500 hover:bg-yellow-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-4"
      >
        Edit
      </Button>

      <Button
        onClick={() => onDelete(data.id)}
        size="xs"
        variant="secondary"
        className="bg-red-500 hover:bg-red-400 text-red-50 text-[14px] font-bold rounded-[8px] px-4"
      >
        Hapus
      </Button>
    </div>
  );
}
