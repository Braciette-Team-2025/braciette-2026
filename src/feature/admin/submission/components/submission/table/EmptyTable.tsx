import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableProps {
  colSpan: number;
  message?: string;
}

export default function EmptyTable({
  colSpan,
  message = "Tidak ada data yang ditemukan.",
}: EmptyTableProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-32 text-center text-[#9A9A9A]">
        {message}
      </TableCell>
    </TableRow>
  );
}
