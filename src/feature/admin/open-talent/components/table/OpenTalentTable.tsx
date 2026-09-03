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
import EmptyTable from "./EmptyTable";
import OpenTalentDetailModal from "../modal/OpenTalentDetailModal";
import ConfirmationDialog from "../modal/ConfirmationDialog";
import { OpenTalentData } from "../../types";
import { useOpenTalentTable } from "../../hooks/useOpenTalentTable";

interface OpenTalentTableProps {
  data: OpenTalentData[];
  startIndex: number;
}

export default function OpenTalentTable({
  data,
  startIndex,
}: OpenTalentTableProps) {
  const {
    detailModalOpen,
    setDetailModalOpen,
    selectedData,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleOpenDetail,
    handleOpenDelete,
    handleConfirmDelete,
  } = useOpenTalentTable();

  return (
    <>
      <div className="overflow-hidden rounded-xl border-2 border-yellow-500 w-full">
        <Table className="w-full table-fixed border-separate border-spacing-0 text-[14px]">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "25%" }} />
          </colgroup>
          <TableHeader>
            <TableRow className="bg-yellow-500 font-inter font-semibold text-blue-900 hover:bg-yellow-400">
              <TableHead className="border-r-2 border-yellow-500 text-center text-yellow-50">
                No
              </TableHead>
              <TableHead className="border-r-2 border-yellow-500 text-center text-yellow-50">
                Nama Lengkap Ketua
              </TableHead>
              <TableHead className="border-r-2 border-yellow-500 text-center text-yellow-50">
                Kontak Ketua
              </TableHead>
              <TableHead className="border-r-2 border-yellow-500 text-center text-yellow-50">
                Jenis Penampilan
              </TableHead>
              <TableHead className="border-r-2 border-yellow-500 text-center text-yellow-50">
                Status
              </TableHead>
              <TableHead className="text-center text-yellow-50">Aksi</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-blue-900">
            {data.length === 0 ? (
              <EmptyTable colSpan={6} />
            ) : (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="text-center bg-yellow-100 hover:bg-yellow-50"
                >
                  <TableCell className="border-r-2 border-yellow-500 py-4">
                    {startIndex + index + 1}
                  </TableCell>

                  <TableCell className="border-r-2 border-yellow-500 py-4 break-words whitespace-normal">
                    {item.namaKetua}
                  </TableCell>

                  <TableCell className="border-r-2 border-yellow-500 py-4">
                    {item.kontakKetua}
                  </TableCell>

                  <TableCell className="border-r-2 border-yellow-500 py-4">
                    {item.jenisPenampilan}
                  </TableCell>

                  <TableCell className="border-r-2 border-yellow-500 py-4 px-4">
                    <StatusBadge status={item.status} />
                  </TableCell>

                  <TableCell className="py-4">
                    <ActionButtons
                      data={item}
                      onDetail={handleOpenDetail}
                      onEdit={() => {}}
                      onDelete={handleOpenDelete}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedData && (
        <OpenTalentDetailModal
          open={detailModalOpen}
          onOpenChange={setDetailModalOpen}
          data={selectedData}
        />
      )}

      <ConfirmationDialog
        open={deleteConfirmOpen}
        onOpenChange={setDeleteConfirmOpen}
        title="Yakin ingin hapus data?"
        description="Data yang telah dihapus tidak dapat dikembalikan"
        confirmText="Delete Now"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
