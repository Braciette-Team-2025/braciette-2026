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
import { dummyData } from "../../constants";
import { useOpenTalentTable } from "../../hooks/useOpenTalentTable";

export default function OpenTalentTable() {
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
      <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
        <Table className="border-separate border-spacing-0 text-[14px]">
          <TableHeader>
            <TableRow className="bg-[#7F7F7F] font-inter font-semibold text-white hover:bg-[#7F7F7F]">
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white w-[60px]">
                No
              </TableHead>
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                Nama Lengkap Ketua
              </TableHead>
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                Kontak Ketua
              </TableHead>
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                Jenis Penampilan
              </TableHead>
              <TableHead className="border-r-2 border-[#BEC8CF] text-center text-white">
                Status
              </TableHead>
              <TableHead className="text-center text-white w-[300px]">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="text-[#757575]">
            {dummyData.length === 0 ? (
              <EmptyTable colSpan={6} />
            ) : (
              dummyData.map((data, index) => (
                <TableRow
                  key={data.id}
                  className="text-center bg-white hover:bg-white"
                >
                  <TableCell className="border-r-2 border-[#BEC8CF] py-4">
                    {index + 1}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF] py-4">
                    {data.namaKetua}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF] py-4">
                    {data.kontakKetua}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF] py-4">
                    {data.jenisPenampilan}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF] py-4 px-6">
                    <StatusBadge status={data.status} />
                  </TableCell>

                  <TableCell className="py-4">
                    <ActionButtons
                      data={data}
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
