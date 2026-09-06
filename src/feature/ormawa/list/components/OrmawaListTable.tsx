"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { TableCell as TC, TableRow as TR } from "@/components/ui/table";
import type { InternalSubmissionItem } from "../types/ormawa";

interface OrmawaListTableProps {
  ormawaList: InternalSubmissionItem[];
  startIndex: number;
}

function StatusBadge({
  status,
}: {
  status: "pending" | "rejected" | "accepted";
}) {
  const config = {
    accepted: {
      label: "Disetujui",
      bg: "bg-green-100",
      circle: "bg-green-500",
      text: "text-green-700",
      border: "border-green-500",
    },
    pending: {
      label: "Menunggu",
      bg: "bg-yellow-300",
      circle: "bg-yellow-500",
      text: "text-yellow-800",
      border: "border-yellow-500",
    },
    rejected: {
      label: "Ditolak",
      bg: "bg-red-100",
      circle: "bg-red-500",
      text: "text-red-700",
      border: "border-red-500",
    },
  };
  const current = config[status];
  return (
    <div
      className={`flex items-center justify-between rounded-full w-full ${current.bg} px-2 py-1 text-[14px] font-semibold border-2 ${current.border}`}
    >
      <span className={current.text}>{current.label}</span>
      <div className={`h-2 w-2 rounded-full ${current.circle}`} />
    </div>
  );
}

function EmptyTable({ colSpan }: { colSpan: number }) {
  return (
    <TR>
      <TC colSpan={colSpan} className="h-32 text-center text-[#9A9A9A]">
        Tidak ada data yang ditemukan.
      </TC>
    </TR>
  );
}

export default function OrmawaListTable({
  ormawaList,
  startIndex,
}: OrmawaListTableProps) {
  const columnCount = 6;

  return (
    <div className="w-full overflow-x-auto rounded-xl border-2 border-yellow-500">
      <Table className="w-200 md:w-full border-separate border-spacing-0 text-[14px]">
        <TableHeader>
          <TableRow className="bg-yellow-500 font-inter font-semibold text-blue-900 hover:bg-yellow-400">
            <TableHead className="w-[5%] border-r-2 border-yellow-500 text-center text-yellow-50">
              No
            </TableHead>

            <TableHead className="w-[25%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Nama Ormawa
            </TableHead>

            <TableHead className="w-[15%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Jenis Ormawa
            </TableHead>

            <TableHead className="w-[20%] border-r-2 border-yellow-500 text-center text-yellow-50">
              PIC
            </TableHead>

            <TableHead className="w-[20%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Kontak PIC
            </TableHead>

            <TableHead className="w-[15%] text-center text-yellow-50">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-blue-900">
          {ormawaList.length === 0 ? (
            <EmptyTable colSpan={columnCount} />
          ) : (
            ormawaList.map((data, index) => (
              <TableRow
                key={data.id}
                className="text-center bg-yellow-100 hover:bg-yellow-50"
              >
                <TableCell className="border-r-2 border-yellow-500">
                  {startIndex + index + 1}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.name}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.type}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.pic}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.pic_contact}
                </TableCell>

                <TableCell className="flex justify-center items-center h-full p-2">
                  <StatusBadge status={data.status} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
