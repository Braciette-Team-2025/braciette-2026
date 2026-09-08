import { Button } from "@/components/ui/button";
import type { OpenTalentListItem } from "../../types";
import { Loader2 } from "lucide-react";

interface ActionButtonsProps {
  data: OpenTalentListItem;
  onDetail: (data: OpenTalentListItem) => void;
  onEdit: (data: OpenTalentListItem) => void;
  onDelete: (data: OpenTalentListItem) => void;
  isEditing?: boolean;
  onSave?: () => void;
  onCancel?: () => void;
  isSaving?: boolean;
}

export function ActionButtons({
  data,
  onDetail,
  onEdit,
  onDelete,
  isEditing,
  onSave,
  onCancel,
  isSaving,
}: ActionButtonsProps) {
  if (isEditing) {
    return (
      <div className="flex gap-2 justify-center">
        <Button
          onClick={onSave}
          size="xs"
          variant="secondary"
          className="bg-yellow-500 hover:bg-yellow-400 text-yellow-50 rounded-[8px] px-2 flex items-center justify-center min-w-[32px] w-8 h-8"
          disabled={isSaving}
        >
          {isSaving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <span className="text-xl">✓</span>
          )}
        </Button>

        <Button
          onClick={onCancel}
          size="xs"
          variant="secondary"
          className="bg-yellow-500 hover:bg-yellow-400 text-yellow-50 rounded-[8px] px-2 flex items-center justify-center min-w-[32px] w-8 h-8"
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
