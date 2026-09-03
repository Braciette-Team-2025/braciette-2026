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
import type {
  ExternalSubmissionItem,
  ExternalOrmawaType,
} from "../../../types/ormawa";
import { useUpdateExternalSubmission } from "../../../hooks/eksternal/useUpdateExternalSubmission";
import { EXTERNAL_ORMAWA_ENUM } from "../../../constants/ormawa";

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
  const [editType, setEditType] = useState<ExternalOrmawaType | "">("");

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
            submissionList.map((data, index) => {
              const isEditing = editingId === data.id;

              return (
                <TableRow
                  key={data.id}
                  className="text-center bg-yellow-100 hover:bg-yellow-50"
                >
                  <TableCell className="border-r-2 border-yellow-500">
                    {startIndex + index + 1}
                  </TableCell>

                  <TableCell className="border-r-2 border-yellow-500">
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

                  <TableCell className="border-r-2 border-yellow-500">
                    {isEditing ? (
                      <Select
                        value={editType}
                        onValueChange={(val) =>
                          setEditType(val as ExternalOrmawaType)
                        }
                      >
                        <SelectTrigger className="h-8 w-full text-center flex justify-center">
                          <SelectValue placeholder="Pilih Jenis" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXTERNAL_ORMAWA_ENUM.map((type) => (
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
