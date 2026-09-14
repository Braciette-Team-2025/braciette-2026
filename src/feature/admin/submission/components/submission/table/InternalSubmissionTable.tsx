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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { InternalActionButtons } from "./InternalActionButton";
import { InternalSubmissionItem } from "../../../types/ormawa";

import EmptyTable from "./EmptyTable";
import { useUpdateInternalStatus } from "../../../hooks/internal/useUpdateInternalStatus";

interface InternalSubmissionTableProps {
  submissionList: InternalSubmissionItem[];
  startIndex: number;
  onDetail: (data: InternalSubmissionItem) => void;
  onDelete: (id: string) => void;
}

export default function InternalSubmissionTable({
  submissionList,
  onDelete,
  onDetail,
  startIndex,
}: InternalSubmissionTableProps) {
  const columnCount = 7;
  const router = useRouter();

  const statusMutation = useUpdateInternalStatus();

  const handleEditClick = (data: InternalSubmissionItem) => {
    router.push(`/admin/submission/internal-edit/${data.id}`);
  };

  const handleStatusChange = (
    id: string,
    newStatus: "accepted" | "pending" | "rejected",
  ) => {
    statusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-yellow-500">
      <Table className="table-fixed w-full border-separate border-spacing-0 text-[14px]">
        <TableHeader>
          <TableRow className="bg-yellow-500 font-inter font-semibold text-blue-900 hover:bg-yellow-400">
            <TableHead className="w-[5%] border-r-2 border-yellow-500 text-center text-yellow-50">
              No
            </TableHead>

            <TableHead className="w-[20%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Nama Ormawa
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-yellow-500 text-center text-yellow-50">
              PIC
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Kontak PIC
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Jenis Ormawa
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-yellow-500 text-center text-yellow-50">
              Status
            </TableHead>

            <TableHead className="w-[20%] text-center text-yellow-50">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-blue-900">
          {submissionList.length === 0 ? (
            <EmptyTable colSpan={columnCount} />
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
                  {data.pic}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.pic_contact}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500">
                  {data.type}
                </TableCell>

                <TableCell className="border-r-2 border-yellow-500 p-2 flex justify-center items-center h-full">
                  <Select
                    value={data.status}
                    onValueChange={(val: "accepted" | "pending" | "rejected") =>
                      handleStatusChange(data.id, val)
                    }
                    disabled={
                      statusMutation.isPending &&
                      statusMutation.variables?.id === data.id
                    }
                  >
                    <SelectTrigger className="h-fit w-full border-0 p-0 shadow-none focus:ring-0 [&>svg]:hidden flex justify-center bg-transparent">
                      <StatusBadge status={data.status} />
                    </SelectTrigger>
                    <SelectContent position="popper" sideOffset={4}>
                      <SelectItem value="accepted">Disetujui</SelectItem>
                      <SelectItem value="pending">Menunggu</SelectItem>
                      <SelectItem value="rejected">Ditolak</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>

                <TableCell>
                  <InternalActionButtons
                    data={data}
                    onDetail={onDetail}
                    onEdit={handleEditClick}
                    onDelete={onDelete}
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
