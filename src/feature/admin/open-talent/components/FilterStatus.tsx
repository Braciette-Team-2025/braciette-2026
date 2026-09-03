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
      <SelectTrigger className="h-12! w-[148px] border-2 border-yellow-500 bg-yellow-100 text-blue-900">
        <SelectValue placeholder="Filter Status" />
      </SelectTrigger>
      <SelectContent className="bg-yellow-100 text-blue-900 border-yellow-500">
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="approved">Disetujui</SelectItem>
        <SelectItem value="pending">Menunggu</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
