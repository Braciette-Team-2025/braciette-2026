import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INTERNAL_ORMAWA_ENUM,
  EXTERNAL_ORMAWA_ENUM,
} from "../../constants/ormawa";

interface FilterJenisProps {
  value: string;
  onValueChange: (value: string) => void;
  type?: "internal" | "external";
}

export default function FilterJenis({
  value,
  onValueChange,
  type = "external",
}: FilterJenisProps) {
  const options =
    type === "internal" ? INTERNAL_ORMAWA_ENUM : EXTERNAL_ORMAWA_ENUM;

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12! w-45 border-2 border-yellow-500 bg-yellow-100 text-blue-900">
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
