import { Button } from "@/components/ui/button";
import { OrmawaTable } from "../../../types/ormawa";

interface ActionButtonsProps {
  onDetail: (data: OrmawaTable) => void;
  onDelete: (id: number) => void;
  onEdit: (data: OrmawaTable) => void;
  data: OrmawaTable;
}

export function ActionButtons({
  onDetail,
  onDelete,
  onEdit,
  data,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
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
