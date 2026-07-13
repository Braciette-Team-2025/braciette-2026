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

export default function SubmissionTable({ submissionList }: SubmissionProps) {
  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
      <Table className="border-separate border-spacing-0 text-[14px]">
        <TableHeader className="">
          <TableRow className="text-white font-semibold font-inter bg-[#7F7F7F] hover:bg-[#7F7F7F]">
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              No
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Nama Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Kontak PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Jenis Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r-2 border-[#BEC8CF]">
              Status
            </TableHead>
            <TableHead className="text-white font-semibold text-center">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#757575]">
          {submissionList.map((data) => (
            <TableRow key={data.id} className="text-center">
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.id}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.nama}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.pic}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.kontak}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                {data.jenis}
              </TableCell>
              <TableCell className="border-r-2 border-[#BEC8CF]">
                <StatusBadge status={data.status} />
              </TableCell>

              <TableCell className="">
                <ActionButtons />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
