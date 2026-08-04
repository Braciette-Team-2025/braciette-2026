"use client";

import { useState } from "react";
import type { OrmawaTable, SubmissionDetailData } from "../types/ormawa";
import {
  internalSubmissionList,
  externalSubmissionList,
} from "../constants/ormawaList";

export function useSubmissionDetail(activeTab: "internal" | "external") {
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<SubmissionDetailData | null>(
    null,
  );

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleDetail = (row: OrmawaTable) => {
    const source =
      activeTab === "internal"
        ? internalSubmissionList
        : externalSubmissionList;

    const found = source.find((item) => item.id === row.id);
    if (!found) return;

    setDetailData({
      ...found,
      lombaDimenangkan: found.lombaDimenangkan ?? [],
      subKategori: found.subKategori ?? "-",
    });
    setDetailOpen(true);
  };

  const handleEdit = (row: OrmawaTable) => {
    console.log("Edit:", row.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleteLoading(true);
    setDeleteLoading(false);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  return {
    detailOpen,
    setDetailOpen,
    detailData,
    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    handleDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
  };
}
