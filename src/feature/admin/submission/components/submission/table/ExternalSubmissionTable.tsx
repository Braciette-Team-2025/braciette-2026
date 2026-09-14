"use client";

import { useRouter } from "next/navigation";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { ExternalActionButtons } from "./ExternalActionButtons";
import EmptyTable from "./EmptyTable";
import type { ExternalSubmissionItem } from "../../../types/ormawa";

interface ExternalSubmissionTableProps {
  submissionList: ExternalSubmissionItem[];
  startIndex: number;
  onDetail: (data: ExternalSubmissionItem) => void;
  onDelete: (data: ExternalSubmissionItem) => void;
}

export default function ExternalSubmissionTable({
  submissionList,
  startIndex,
  onDetail,
  onDelete,
}: ExternalSubmissionTableProps) {
  const router = useRouter();

  const handleEditClick = (data: ExternalSubmissionItem) => {
    router.push(`/admin/submission/external-edit/${data.id}`);
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-yellow-500">
      <Table className="border-separate border-spacing-0 text-[14px] table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-yellow-500 font-inter font-semibold text-blue-900 hover:bg-yellow-100">
            <TableHead className="w-[10%] border-r-2 border-yellow-500 text-center text-yellow-50">
              No
            </TableHead>
            <TableHead className="w-[40%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Nama Ormawa
            </TableHead>
            <TableHead className="w-[16%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Jenis Ormawa
            </TableHead>
            <TableHead className="w-[40%] text-center text-yellow-50">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-blue-900">
          {submissionList.length === 0 ? (
            <EmptyTable colSpan={4} />
          ) : (
            submissionList.map((data, index) => (
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

                <TableCell>
                  <ExternalActionButtons
                    data={data}
                    onDetail={onDetail}
                    onDelete={onDelete}
                    onEdit={handleEditClick}
                  />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
