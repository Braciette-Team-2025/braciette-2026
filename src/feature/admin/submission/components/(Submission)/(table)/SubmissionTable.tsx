import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButton";
import { SubmissionProps } from "../../../types/ormawa";
import EmptyTable from "./EmptyTable";

export default function SubmissionTable({
  submissionList,
  onDelete,
  onEdit,
  onDetail,
  type,
  startIndex,
}: SubmissionProps) {
  const columnCount = type === "internal" ? 7 : 4;
  const isInternal = type === "internal";

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
      <Table className="border-separate border-spacing-0 text-[14px]">
        <TableHeader>
          <TableRow className="bg-[#7F7F7F] font-inter font-semibold text-white hover:bg-[#7F7F7F]">
            <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
              No
            </TableHead>

            <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
              Nama Ormawa
            </TableHead>

            {isInternal && (
              <>
                <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                  PIC
                </TableHead>

                <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                  Kontak PIC
                </TableHead>
              </>
            )}

            <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
              Jenis Ormawa
            </TableHead>

            {isInternal && (
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                Status
              </TableHead>
            )}

            <TableHead className="text-center text-white">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#757575]">
          {submissionList.length === 0 ? (
            <EmptyTable colSpan={columnCount} />
          ) : (
            submissionList.map((data, index) => (
              <TableRow key={data.id} className="text-center">
                <TableCell className="border-r-2 border-[#BEC8CF]">
                  {startIndex + index + 1}
                </TableCell>

                <TableCell className="border-r-2 border-[#BEC8CF]">
                  {data.namaOrmawa}
                </TableCell>

                {isInternal && (
                  <>
                    <TableCell className="border-r-2 border-[#BEC8CF]">
                      {data.pic}
                    </TableCell>

                    <TableCell className="border-r-2 border-[#BEC8CF]">
                      {data.kontakPic}
                    </TableCell>
                  </>
                )}

                <TableCell className="border-r-2 border-[#BEC8CF]">
                  {data.jenisOrmawa}
                </TableCell>

                {isInternal && (
                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    <StatusBadge status={data.status} />
                  </TableCell>
                )}

                <TableCell>
                  <ActionButtons
                    data={data}
                    onDetail={onDetail}
                    onEdit={onEdit}
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
