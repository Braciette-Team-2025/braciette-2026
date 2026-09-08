"use client";

import { useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusBadge } from "./StatusBadge";
import { ActionButtons } from "./ActionButton";
import EmptyTable from "./EmptyTable";
import type { OpenTalentListItem, OpenTalentStatus } from "../../types";
import { useUpdateOpenTalent } from "../../hooks/useUpdateOpenTalent";
import { useUpdateOpenTalentStatus } from "../../hooks/useUpdateOpenTalentStatus";
import { getOpenTalentById } from "../../services/openTalentService";

interface OpenTalentTableProps {
  data: OpenTalentListItem[];
  startIndex: number;
  onDetail: (item: OpenTalentListItem) => void;
  onDelete: (item: OpenTalentListItem) => void;
}

export default function OpenTalentTable({
  data,
  startIndex,
  onDetail,
  onDelete,
}: OpenTalentTableProps) {
  // Inline edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNamaKetua, setEditNamaKetua] = useState("");
  const [editJenisPenampilan, setEditJenisPenampilan] = useState("");
  const [isFetchingDetail, setIsFetchingDetail] = useState(false);

  const updateMutation = useUpdateOpenTalent();
  const statusMutation = useUpdateOpenTalentStatus();

  const handleEditClick = (item: OpenTalentListItem) => {
    setEditingId(item.id);
    setEditNamaKetua(item.leader_name);
    setEditJenisPenampilan(item.performance_type);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditNamaKetua("");
    setEditJenisPenampilan("");
  };

  const handleSaveEdit = async (item: OpenTalentListItem) => {
    if (!editingId) return;

    try {
      setIsFetchingDetail(true);
      // Fetch detail dulu agar field yang tidak ada di list tidak ikut terhapus saat PUT
      const detailRes = await getOpenTalentById(editingId);
      const detail = detailRes.data;

      updateMutation.mutate(
        {
          id: editingId,
          payload: {
            leader_name: editNamaKetua,
            leader_faculty: detail.leader_faculty,
            talent_name: detail.talent_name,
            performance_type: editJenisPenampilan,
            member_count: detail.member_count,
            leader_wa_contact: detail.leader_wa_contact,
            drive_link: detail.drive_link,
          },
        },
        {
          onSuccess: () => {
            setEditingId(null);
          },
        },
      );
    } catch (error) {
      console.error("Gagal mengambil detail untuk inline edit:", error);
    } finally {
      setIsFetchingDetail(false);
    }
  };

  const handleStatusChange = (id: string, status: OpenTalentStatus) => {
    statusMutation.mutate({ id, status });
  };

  return (
    <>
      <div className="overflow-hidden rounded-xl border-2 border-yellow-500 w-full">
        <Table className="w-full table-fixed border-separate border-spacing-0 text-[14px]">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "16%" }} />
            <col style={{ width: "17%" }} />
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
              data.map((item, index) => {
                const isEditing = editingId === item.id;
                const isSaving =
                  (updateMutation.isPending && isEditing) || isFetchingDetail;

                return (
                  <TableRow
                    key={item.id}
                    className="text-center bg-yellow-100 hover:bg-yellow-50"
                  >
                    <TableCell className="border-r-2 border-yellow-500 py-4">
                      {startIndex + index + 1}
                    </TableCell>

                    <TableCell className="border-r-2 border-yellow-500 py-2 break-words whitespace-normal">
                      {isEditing ? (
                        <Input
                          value={editNamaKetua}
                          onChange={(e) => setEditNamaKetua(e.target.value)}
                          className="h-8 text-center"
                        />
                      ) : (
                        item.leader_name
                      )}
                    </TableCell>

                    <TableCell className="border-r-2 border-yellow-500 py-4">
                      {item.leader_wa_contact}
                    </TableCell>

                    <TableCell className="border-r-2 border-yellow-500 py-2">
                      {isEditing ? (
                        <Select
                          value={editJenisPenampilan}
                          onValueChange={(val) => setEditJenisPenampilan(val)}
                        >
                          <SelectTrigger className="h-8 w-full text-center flex justify-center">
                            <SelectValue placeholder="Pilih Jenis" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Individu">Individu</SelectItem>
                            <SelectItem value="Kelompok">Kelompok</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        item.performance_type
                      )}
                    </TableCell>

                    <TableCell className="border-r-2 border-yellow-500 py-4 px-2 flex justify-center items-center h-full">
                      <Select
                        value={item.status}
                        onValueChange={(val: OpenTalentStatus) =>
                          handleStatusChange(item.id, val)
                        }
                        disabled={
                          statusMutation.isPending &&
                          statusMutation.variables?.id === item.id
                        }
                      >
                        <SelectTrigger className="h-fit w-full border-0 p-0 shadow-none focus:ring-0 [&>svg]:hidden flex justify-center bg-transparent">
                          <StatusBadge status={item.status} />
                        </SelectTrigger>
                        <SelectContent position="popper" sideOffset={4}>
                          <SelectItem value="accepted">Disetujui</SelectItem>
                          <SelectItem value="pending">Menunggu</SelectItem>
                          <SelectItem value="rejected">Ditolak</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>

                    <TableCell className="py-4">
                      <ActionButtons
                        data={item}
                        onDetail={onDetail}
                        onEdit={handleEditClick}
                        onDelete={onDelete}
                        isEditing={isEditing}
                        onSave={() => handleSaveEdit(item)}
                        onCancel={handleCancelEdit}
                        isSaving={isSaving}
                      />
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
