import {
  TableHead,
  TableHeader as UiTableHeader,
  TableRow as UiTableRow,
} from "@/components/ui/table";

export interface VotingTableHeaderProps {
  nameColumnLabel: string;
  totalColumnLabel: string;
}

export function VotingTableHeader({
  nameColumnLabel,
  totalColumnLabel,
}: VotingTableHeaderProps) {
  return (
    <UiTableHeader>
      <UiTableRow className="bg-yellow-500 hover:bg-yellow-400">
        <TableHead className="w-16 text-center text-yellow-50 font-bold border-r-2 border-yellow-500">
          Rank
        </TableHead>
        <TableHead className="text-yellow-50 font-bold border-r-2 border-yellow-500">
          {nameColumnLabel}
        </TableHead>
        <TableHead className="min-w-[180px] text-yellow-50 font-bold">
          {totalColumnLabel}
        </TableHead>
      </UiTableRow>
    </UiTableHeader>
  );
}
