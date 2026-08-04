import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterJenisProps {
  value: string;
  onValueChange: (value: string) => void;
}

export default function FilterJenis({
  value,
  onValueChange,
}: FilterJenisProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="h-12! w-[148px] border-[#AFAFAF]">
        <SelectValue placeholder="Filter Jenis" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="semua">Semua</SelectItem>
        <SelectItem value="bem">BEM</SelectItem>
        <SelectItem value="dpm">DPM</SelectItem>
        <SelectItem value="hima">HIMA</SelectItem>
        <SelectItem value="ukm">UKM</SelectItem>
        <SelectItem value="ukm-penalaran">UKM Penalaran</SelectItem>
        <SelectItem value="ukm-olahraga">UKM Olahraga</SelectItem>
        <SelectItem value="ukm-kesenian">UKM Kesenian</SelectItem>
        <SelectItem value="ukm-kerohanian">UKM Kerohanian</SelectItem>
      </SelectContent>
    </Select>
  );
}
