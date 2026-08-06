"use client";

import { useState } from "react";
import { OpenTalentData } from "../types";

export function useOpenTalentTable() {
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<OpenTalentData | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  const handleOpenDetail = (data: OpenTalentData) => {
    setSelectedData(data);
    setDetailModalOpen(true);
  };

  const handleOpenDelete = (id: number) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  return {
    detailModalOpen,
    setDetailModalOpen,
    selectedData,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    handleOpenDetail,
    handleOpenDelete,
    handleConfirmDelete,
  };
}
