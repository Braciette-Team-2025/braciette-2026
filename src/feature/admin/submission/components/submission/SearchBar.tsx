import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#767676]" />

      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari berdasarkan nama ormawa"
        className="h-12 border-[#AFAFAF] pl-10 placeholder:text-[#767676]"
      />
    </div>
  );
}
