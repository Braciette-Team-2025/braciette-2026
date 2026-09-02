import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortButtonProps {
  value: "name" | "created_at";
  onChange: (value: "name" | "created_at") => void;
}

export default function SortButton({ value, onChange }: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-[170px] justify-between border-[#AFAFAF]"
        >
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Sort By:</span>
            <span>{value === "name" ? "Nama" : "Tanggal"}</span>
          </div>
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem onClick={() => onChange("name")}>
          Nama
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onChange("created_at")}>
          Tanggal
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
