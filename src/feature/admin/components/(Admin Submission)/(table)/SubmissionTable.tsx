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

export interface Ormawa {
  id: number;
  nama: string;
  pic: string;
  kontak: string;
  jenis: string;
  status: "approved" | "pending" | "rejected";
}

export default function SubmissionTable() {
  const listOrmawa: Ormawa[] = [
    {
      id: 1,
      nama: "BEM Fakultas Ilmu Komputer",
      pic: "John Doe",
      kontak: "0867676767",
      jenis: "BEM",
      status: "approved",
    },
    {
      id: 2,
      nama: "DPM Fakultas Ilmu Komputer",
      pic: "Ghiffary Abdul",
      kontak: "0867676767",
      jenis: "DPM",
      status: "pending",
    },
    {
      id: 3,
      nama: "Kabinet Departemen Sistem Informasi",
      pic: "Imroatus",
      kontak: "0867676767",
      jenis: "HIMA",
      status: "rejected",
    },
    {
      id: 4,
      nama: "Nol Derajat Film",
      pic: "Muhammad Ibnu",
      kontak: "0867676767",
      jenis: "UKM",
      status: "approved",
    },
  ];
  return (
    <div className="border-gray-400 border rounded-xl overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-500">
          <TableRow className="text-white font-semibold font-inter hover:bg-gray-500">
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              No
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              Nama Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              Kontak PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              PIC
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              Jenis Ormawa
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              Status
            </TableHead>
            <TableHead className="text-white font-semibold text-center border-r border-gray-400">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {listOrmawa.map((data) => (
            <TableRow key={data.id} className="text-center">
              <TableCell className="border-r border-gray-400">
                {data.id}
              </TableCell>
              <TableCell className="border-r border-gray-400">
                {data.nama}
              </TableCell>
              <TableCell className="border-r border-gray-400">
                {data.pic}
              </TableCell>
              <TableCell className="border-r border-gray-400">
                {data.kontak}
              </TableCell>
              <TableCell className="border-r border-gray-400">
                {data.jenis}
              </TableCell>
              <TableCell className="border-r border-gray-400">
                <StatusBadge status={data.status} />
              </TableCell>

              <TableCell>
                <ActionButtons />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
