import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterDropdown() {
  return (
    <Select>
      <SelectTrigger className="h-12! w-[148px] border-gray-500">
        <SelectValue placeholder="Filter" />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="bem">BEM</SelectItem>
        <SelectItem value="dpm">DPM</SelectItem>
        <SelectItem value="hima">HIMA</SelectItem>
        <SelectItem value="ukm">UKM</SelectItem>
      </SelectContent>
    </Select>
  );
}
