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
      <UiTableRow className="bg-muted/70 hover:bg-muted/70">
        <TableHead className="w-16 text-center">Rank</TableHead>
        <TableHead>{nameColumnLabel}</TableHead>
        <TableHead className="min-w-[180px]">{totalColumnLabel}</TableHead>
      </UiTableRow>
    </UiTableHeader>
  );
}
