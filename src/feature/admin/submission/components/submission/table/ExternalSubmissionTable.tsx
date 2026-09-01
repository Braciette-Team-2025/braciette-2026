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
import { ExternalActionButtons } from "./ExternalActionButtons";
import EmptyTable from "./EmptyTable";
import type { ExternalSubmissionItem, OrmawaType } from "../../../types/ormawa";
import { useUpdateExternalSubmission } from "../../../hooks/useUpdateExternalSubmission";

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
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [editName, setEditName] = useState("");
  const [editType, setEditType] = useState<OrmawaType | "">("");

  const updateMutation = useUpdateExternalSubmission();

  const handleEditClick = (data: ExternalSubmissionItem) => {
    setEditingId(data.id);
    setEditName(data.name);
    setEditType(data.type);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditType("");
  };

  const handleSaveEdit = () => {
    if (!editingId || !editName || !editType) return;

    const formData = new FormData();
    formData.append("name", editName);
    formData.append("type", editType);

    updateMutation.mutate(
      { id: editingId, formData },
      {
        onSuccess: () => {
          setEditingId(null);
        },
      },
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border-2 border-[#BEC8CF]">
      <Table className="border-separate border-spacing-0 text-[14px] table-fixed w-full">
        <TableHeader>
          <TableRow className="bg-[#7F7F7F] font-inter font-semibold text-white hover:bg-[#7F7F7F]">
            <TableHead className="w-[10%] border-r-2 border-[#BEC8CF] text-center text-white">
              No
            </TableHead>
            <TableHead className="w-[40%] border-r-2 border-[#BEC8CF] text-center text-white">
              Nama Ormawa
            </TableHead>
            <TableHead className="w-[16%] border-r-2 border-[#BEC8CF] text-center text-white">
              Jenis Ormawa
            </TableHead>
            <TableHead className="w-[40%] text-center text-white">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-[#757575]">
          {submissionList.length === 0 ? (
            <EmptyTable colSpan={4} />
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
                      <Select
                        value={editType}
                        onValueChange={(val) => setEditType(val as OrmawaType)}
                      >
                        <SelectTrigger className="h-8 w-full text-center flex justify-center">
                          <SelectValue placeholder="Pilih Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="BEM">BEM</SelectItem>
                          <SelectItem value="DPM">DPM</SelectItem>
                          <SelectItem value="HIMA">HIMA</SelectItem>
                          <SelectItem value="UKM">UKM</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      data.type
                    )}
                  </TableCell>

                  <TableCell>
                    <ExternalActionButtons
                      data={data}
                      onDetail={onDetail}
                      onDelete={onDelete}
                      isEditing={isEditing}
                      onEdit={handleEditClick}
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
