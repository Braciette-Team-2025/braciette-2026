import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SortButtonProps {
  value: "az" | "za";
  onChange: (value: "az" | "za") => void;
}

export default function SortButton({ value, onChange }: SortButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-[148px] justify-between border-[#AFAFAF]"
        >
          Urutkan
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem onClick={() => onChange("az")}>
          Nama A - Z
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onChange("za")}>
          Nama Z - A
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
