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
      <SelectTrigger className="h-12! w-[148px] border-[#AFAFAF]">
        <SelectValue placeholder="Filter Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="approved">Disetujui</SelectItem>
        <SelectItem value="pending">Menunggu</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
