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

    // OrmawaTable dan SubmissionDetailData memiliki bentuk yang sama,
    // sehingga bisa langsung di-assign tanpa copy field satu per satu.
    setDetailData({
      ...found,
      lombaDimenangkan: found.lombaDimenangkan ?? [],
      subKategori: found.subKategori ?? "-",
    });
    setDetailOpen(true);
  };

  const handleEdit = (row: OrmawaTable) => {
    // TODO: implementasi logika edit
    console.log("Edit:", row.id);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = async () => {
    if (deleteId === null) return;
    setDeleteLoading(true);
    // TODO: panggil API delete di sini
    setDeleteLoading(false);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  return {
    // State detail
    detailOpen,
    setDetailOpen,
    detailData,

    // State delete
    deleteOpen,
    setDeleteOpen,
    deleteLoading,

    // Handler
    handleDetail,
    handleEdit,
    handleDelete,
    confirmDelete,
  };
}
