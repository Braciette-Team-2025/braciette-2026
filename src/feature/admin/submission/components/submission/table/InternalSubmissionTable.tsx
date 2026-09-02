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
import { InternalActionButtons } from "./InternalActionButton";
import {
  InternalOrmawaType,
  InternalSubmissionItem,
} from "../../../types/ormawa";

import EmptyTable from "./EmptyTable";
import { INTERNAL_ORMAWA_ENUM } from "../../../constants/ormawa";
import { useUpdateInternalSubmission } from "../../../hooks/internal/useUpdateInternalSubmission";
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

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<InternalOrmawaType | "">("");
  const [editPic, setEditPic] = useState("");
  const [editPicContact, setEditPicContact] = useState("");

  const updateMutation = useUpdateInternalSubmission();
  const statusMutation = useUpdateInternalStatus();

  const handleEditClick = (data: InternalSubmissionItem) => {
    setEditingId(data.id);
    setEditName(data.name);
    setEditType(data.type);
    setEditPic(data.pic);
    setEditPicContact(data.pic_contact);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditType("");
    setEditPic("");
    setEditPicContact("");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editName || !editType) return;

    updateMutation.mutate(
      {
        id: editingId,
        data: {
          name: editName,
          type: editType,
          pic: editPic,
          pic_contact: editPicContact,
        },
      },
      {
        onSuccess: () => {
          setEditingId(null);
        },
      },
    );
  };

  const handleStatusChange = (
    id: string,
    newStatus: "accepted" | "pending" | "rejected",
  ) => {
    statusMutation.mutate({ id, status: newStatus });
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
      <Table className="table-fixed w-full border-separate border-spacing-0 text-[14px]">
        <TableHeader>
          <TableRow className="bg-[#7F7F7F] font-inter font-semibold text-white hover:bg-[#7F7F7F]">
            <TableHead className="w-[5%] border-r-2 border-[#BEC8CF] text-center text-white">
              No
            </TableHead>

            <TableHead className="w-[20%] border-r-2 border-[#BEC8CF] text-center text-white">
              Nama Ormawa
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-[#BEC8CF] text-center text-white">
              PIC
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-[#BEC8CF] text-center text-white">
              Kontak PIC
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-[#BEC8CF] text-center text-white">
              Jenis Ormawa
            </TableHead>

            <TableHead className="w-[10%] border-r-2 border-[#BEC8CF] text-center text-white">
              Status
            </TableHead>

            <TableHead className="w-[20%] text-center text-white">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#757575]">
          {submissionList.length === 0 ? (
            <EmptyTable colSpan={columnCount} />
          ) : (
            submissionList.map((data, index) => {
              const isEditing = editingId === data.id;

              return (
                <TableRow key={data.id} className="text-center">
                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    {startIndex + index + 1}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    {isEditing ? (
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 text-center"
                      />
                    ) : (
                      data.name
                    )}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    {isEditing ? (
                      <Input
                        value={editPic}
                        onChange={(e) => setEditPic(e.target.value)}
                        className="h-8 text-center"
                      />
                    ) : (
                      data.pic
                    )}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    {isEditing ? (
                      <Input
                        value={editPicContact}
                        onChange={(e) => setEditPicContact(e.target.value)}
                        className="h-8 text-center"
                      />
                    ) : (
                      data.pic_contact
                    )}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF]">
                    {isEditing ? (
                      <Select
                        value={editType}
                        onValueChange={(val) =>
                          setEditType(val as InternalOrmawaType)
                        }
                      >
                        <SelectTrigger className="h-8 w-full text-center flex justify-center">
                          <SelectValue placeholder="Pilih Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          {INTERNAL_ORMAWA_ENUM.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ) : (
                      data.type
                    )}
                  </TableCell>

                  <TableCell className="border-r-2 border-[#BEC8CF] p-2 flex justify-center items-center h-full">
                    <Select
                      value={data.status}
                      onValueChange={(
                        val: "accepted" | "pending" | "rejected",
                      ) => handleStatusChange(data.id, val)}
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
                      isEditing={isEditing}
                      onSave={handleSaveEdit}
                      onCancel={handleCancelEdit}
                      isSaving={updateMutation.isPending && isEditing}
                    />
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
