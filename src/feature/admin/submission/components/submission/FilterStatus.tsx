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
      <SelectTrigger className="h-12! w-42.5 border-2 border-yellow-500 bg-yellow-100 text-blue-900">
        <div className="flex items-center gap-1 truncate">
          <span className="text-blue-300">Status:</span>
          <SelectValue placeholder="Semua" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-yellow-100 text-blue-900 border-yellow-500">
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="accepted">Disetujui</SelectItem>
        <SelectItem value="pending">Menunggu</SelectItem>
        <SelectItem value="rejected">Ditolak</SelectItem>
      </SelectContent>
    </Select>
  );
}
