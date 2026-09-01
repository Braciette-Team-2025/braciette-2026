"use client";

import { useState, useMemo } from "react";
import {
  useExternalSubmissionList,
  useExternalStatistics,
} from "./useExternalSubmissionList";
import { useDeleteExternalSubmission } from "./useDeleteExternalSubmission";
import { getExternalSubmissionById } from "../services/submissionExternalService";
import type {
  ExternalSubmissionDetail,
  ExternalSubmissionItem,
} from "../types/ormawa";

const ITEMS_PER_PAGE = 15;

export function useExternalSubmissionState() {
  const [search, setSearch] = useState("");
  const [jenisFilter, setJenisFilter] = useState("semua");
  const [sortBy, setSortBy] = useState<"name" | "created_at">("created_at");
  const [order, setOrder] = useState<"asc" | "desc">("desc");

  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<ExternalSubmissionDetail | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const typeMap: Record<string, string> = {
    bem: "BEM",
    dpm: "DPM",
    hima: "HIMA",
    ukm: "UKM",
  };

  const apiParams = {
    search: search || undefined,
    type:
      jenisFilter !== "semua" ? typeMap[jenisFilter] || jenisFilter : undefined,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
    sort_by: sortBy,
    order: order,
  };

  const {
    data: listResponse,
    isLoading,
    isError,
    isFetching,
  } = useExternalSubmissionList(apiParams);

  const submissionList = listResponse?.data?.data ?? [];
  const totalItems = listResponse?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const { data: statsData } = useExternalStatistics();

  const { statsCounts, statsTotal } = useMemo(() => {
    const counts: Record<string, number> = {};
    const allItems = statsData?.data?.data || [];

    for (const item of allItems) {
      const typeStr = item.type as string;
      const typeCategory = typeStr.startsWith("UKM") ? "UKM" : typeStr;
      counts[typeCategory] = (counts[typeCategory] || 0) + 1;
    }

    return {
      statsCounts: counts,
      statsTotal: statsData?.data?.total ?? 0,
    };
  }, [statsData]);

  const { mutate: deleteItem, isPending: deleteLoading } =
    useDeleteExternalSubmission();

  const handleDetail = async (item: ExternalSubmissionItem) => {
    setDetailLoading(true);
    try {
      const res = await getExternalSubmissionById(item.id);
      setDetailData(res.data);
      setDetailOpen(true);
    } catch (error) {
      console.error("[useExternalSubmissionState] Gagal ambil detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = (item: ExternalSubmissionItem) => {
    setDeleteTargetId(item.id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    deleteItem(deleteTargetId, {
      onSuccess: () => {
        setDeleteOpen(false);
        setDeleteTargetId(null);
      },
    });
  };

  return {
    submissionList,
    startIndex,
    totalPages,
    isLoading,
    isError,
    isFetching,

    search,
    setSearch: (value: string) => {
      setSearch(value);
      resetPage();
    },
    jenisFilter,
    setJenisFilter: (value: string) => {
      setJenisFilter(value);
      resetPage();
    },
    sortBy,
    setSortBy: (value: "name" | "created_at") => {
      setSortBy(value);
      resetPage();
    },
    order,
    setOrder: (value: "asc" | "desc") => {
      setOrder(value);
      resetPage();
    },

    currentPage,
    setCurrentPage,
    detailOpen,
    setDetailOpen,
    detailData,
    detailLoading,
    handleDetail,
    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    handleDelete,
    confirmDelete,

    statsCounts,
    statsTotal,
  };
}
