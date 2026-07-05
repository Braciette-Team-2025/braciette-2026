import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder="Cari berdasarkan nama ormawa"
        className="pl-10 h-12 border-gray-500"
      />
    </div>
  );
}
