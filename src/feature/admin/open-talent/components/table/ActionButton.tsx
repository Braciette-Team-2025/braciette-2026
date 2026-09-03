import { Button } from "@/components/ui/button";
import { OpenTalentData } from "../../types";

interface ActionButtonsProps {
  onDetail: (data: OpenTalentData) => void;
  onDelete: (id: number) => void;
  onEdit: (data: OpenTalentData) => void;
  data: OpenTalentData;
}

export function ActionButtons({
  onDetail,
  onDelete,
  onEdit,
  data,
}: ActionButtonsProps) {
  return (
    <div className="flex w-full gap-[10px] items-center">
      <Button
        onClick={() => onDetail(data)}
        size="xs"
        variant="secondary"
        className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-0"
      >
        Detail
      </Button>

      <Button
        onClick={() => onEdit(data)}
        size="xs"
        variant="secondary"
        className="flex-1 bg-yellow-500 hover:bg-yellow-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-0"
      >
        Edit
      </Button>

      <Button
        onClick={() => onDelete(data.id)}
        size="xs"
        variant="secondary"
        className="flex-1 bg-red-500 hover:bg-red-400 text-yellow-50 text-[14px] font-bold rounded-[8px] px-0"
      >
        Hapus
      </Button>
    </div>
  );
}
