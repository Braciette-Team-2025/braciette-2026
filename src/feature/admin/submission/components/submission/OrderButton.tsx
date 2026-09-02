import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface OrderButtonProps {
  value: "asc" | "desc";
  onChange: (value: "asc" | "desc") => void;
}

export default function OrderButton({ value, onChange }: OrderButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="h-12 w-[170px] justify-between border-[#AFAFAF]"
        >
          <div className="flex items-center gap-1">
            <span className="text-gray-500">Order By:</span>
            <span>{value === "asc" ? "Asc" : "Desc"}</span>
          </div>
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[180px]">
        <DropdownMenuItem onClick={() => onChange("asc")}>
          Ascended
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => onChange("desc")}>
          Descended
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
