import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterPerformanceTypeProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function FilterPerformanceType({
  value,
  onValueChange,
}: FilterPerformanceTypeProps) {
  const options = ["Individu", "Kelompok"];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12! w-42.5 border-2 border-yellow-500 bg-yellow-100 text-blue-900">
        <div className="flex items-center gap-1 truncate">
          <span className="text-blue-300">Jenis:</span>
          <SelectValue placeholder="Semua" />
        </div>
      </SelectTrigger>

      <SelectContent className="bg-yellow-100 text-blue-900 border-yellow-500">
        <SelectItem value="semua">Semua</SelectItem>
        {options.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {opt}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
