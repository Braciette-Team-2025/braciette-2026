import { Button } from "@/components/ui/button";
import { InternalSubmissionItem } from "../../../types/ormawa";

interface InternalActionButtonsProps {
  onDetail: (data: InternalSubmissionItem) => void;
  onDelete: (id: string) => void;
  onEdit: (data: InternalSubmissionItem) => void;
  data: InternalSubmissionItem;
  isEditing?: boolean;
  isSaving?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
}

export function InternalActionButtons({
  onDetail,
  onDelete,
  onEdit,
  data,
  isEditing,
  isSaving,
  onSave,
  onCancel,
}: InternalActionButtonsProps) {
  if (isEditing) {
    return (
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onSave}
          size="xs"
          variant="secondary"
          className="border border-[#BEC8CF] bg-white text-green-600 rounded-lg px-2 flex items-center justify-center min-w-[32px] w-8 h-8"
          disabled={isSaving}
        >
          {isSaving ? "..." : <span className="text-xl">✓</span>}
        </Button>
        <Button
          onClick={onCancel}
          size="xs"
          variant="secondary"
          className="border border-[#BEC8CF] bg-white text-red-600 rounded-lg px-2 flex items-center justify-center min-w-[32px] w-8 h-8"
          disabled={isSaving}
        >
          <span className="text-xl">✕</span>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2 justify-center">
      <Button
        onClick={() => onDetail(data)}
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Detail
      </Button>

      <Button
        onClick={() => onEdit(data)}
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Edit
      </Button>

      <Button
        onClick={() => onDelete(data.id)}
        size="xs"
        variant="secondary"
        className="border border-[#BEC8CF] bg-[#7F7F7F] text-white text-[14px] font-normal rounded-lg px-4"
      >
        Hapus
      </Button>
    </div>
  );
}
