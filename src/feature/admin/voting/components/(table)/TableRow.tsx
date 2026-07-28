import { TableCell, TableRow as UiTableRow } from "@/components/ui/table";
import { ProgressBar } from "../(voting)/ProgressBar";
import type { VotingResultItem } from "../../types/voting";

export interface VotingTableRowProps {
  item: VotingResultItem;
  maxVote: number;
}

export function VotingTableRow({ item, maxVote }: VotingTableRowProps) {
  return (
    <UiTableRow>
      <TableCell className="text-center text-sm text-muted-foreground">
        {item.rank}
      </TableCell>
      <TableCell className="font-medium">{item.name}</TableCell>
      <TableCell>
        <ProgressBar value={item.totalVote} max={maxVote} />
      </TableCell>
    </UiTableRow>
  );
}
