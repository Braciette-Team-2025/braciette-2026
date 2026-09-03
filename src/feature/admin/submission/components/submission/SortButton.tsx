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
          className="h-12 w-42.5 justify-between border-2 border-yellow-500 bg-yellow-100 text-blue-900 hover:bg-yellow-200 hover:text-blue-900"
        >
          <div className="flex items-center gap-1">
            <span className="text-blue-300">Sort By:</span>
            <span>{value === "name" ? "Nama" : "Tanggal"}</span>
          </div>
          <ArrowUpDown className="h-4 w-4 text-blue-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-45 bg-yellow-100 text-blue-900 border-yellow-500">
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
