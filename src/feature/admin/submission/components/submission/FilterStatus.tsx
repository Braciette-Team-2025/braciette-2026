import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterStatusProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function FilterStatus({
  value,
  onValueChange,
}: FilterStatusProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12! w-[170px] border-[#AFAFAF]">
        <div className="flex items-center gap-1 truncate">
          <span className="text-gray-500">Status:</span>
          <SelectValue placeholder="Semua" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="accepted">Disetujui</SelectItem>
        <SelectItem value="pending">Menunggu</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
