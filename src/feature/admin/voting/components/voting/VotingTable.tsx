import { Table, TableBody } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { VotingTableHeader } from "../table/TableHeader";
import { VotingTableRow } from "../table/TableRow";
import { EmptyVoting } from "../voting/EmptyVoting";
import type { VotingResultItem } from "../../types/voting";

export interface VotingTableProps {
  items: VotingResultItem[];
  nameColumnLabel?: string;
  totalColumnLabel?: string;
  isLoading?: boolean;
}

export function VotingTable({
  items,
  nameColumnLabel = "Nama BEM",
  totalColumnLabel = "Total Voting",
  isLoading,
}: VotingTableProps) {
  if (isLoading) {
    return (
      <div className="space-y-2 rounded-xl border p-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return <EmptyVoting />;
  }

  const maxVote = Math.max(...items.map((item) => item.totalVote));

  return (
    <div className="overflow-x-auto rounded-xl border">
      <Table className="min-w-[480px]">
        <VotingTableHeader
          nameColumnLabel={nameColumnLabel}
          totalColumnLabel={totalColumnLabel}
        />
        <TableBody>
          {items.map((item) => (
            <VotingTableRow key={item.id} item={item} maxVote={maxVote} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
