"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

interface TableLoadingSkeletonProps {
  /** Jumlah kolom pada tabel */
  columns: number;
  /** Jumlah baris skeleton yang ditampilkan (default: 5) */
  rows?: number;
}

export function TableLoadingSkeleton({
  columns,
  rows = 5,
}: TableLoadingSkeletonProps) {
  return (
    <TableBody>
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <TableRow
          key={rowIdx}
          className="bg-yellow-100/60 hover:bg-yellow-100/60"
        >
          {Array.from({ length: columns }).map((_, colIdx) => (
            <TableCell key={colIdx} className="py-3 px-4">
              <Skeleton
                className={`h-4 rounded-full bg-yellow-300/50 ${
                  colIdx === 0 ? "w-8 mx-auto" : "w-full"
                }`}
              />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
