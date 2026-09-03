import { TableCell, TableRow as UiTableRow } from "@/components/ui/table";
import { ProgressBar } from "../voting/ProgressBar";
import type { VotingResultItem } from "../../types/voting";

export interface VotingTableRowProps {
  item: VotingResultItem;
  maxVote: number;
}

export function VotingTableRow({ item, maxVote }: VotingTableRowProps) {
  return (
    <UiTableRow className="bg-yellow-100 hover:bg-yellow-50 text-blue-900">
      <TableCell className="text-center text-sm font-bold border-r-2 border-yellow-500">
        {item.rank}
      </TableCell>
      <TableCell className="font-medium border-r-2 border-yellow-500">
        {item.name}
      </TableCell>
      <TableCell>
        <ProgressBar value={item.totalVote} max={maxVote} />
      </TableCell>
    </UiTableRow>
  );
}
