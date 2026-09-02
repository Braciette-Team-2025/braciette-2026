"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useInternalSubmissionList } from "./useInternalSubmissionList";
import { useDeleteInternalSubmission } from "./useDeleteInternalSubmission";
import { getInternalSubmissionById } from "../../services/submissionInternalService";
import type {
  InternalSubmissionDetail,
  InternalSubmissionItem,
} from "../../types/ormawa";

const ITEMS_PER_PAGE = 15;

export function useInternalSubmissionState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [jenisFilter, setJenisFilter] = useState(
    searchParams.get("jenis") || "semua",
  );
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "semua",
  );
  const [sortBy, setSortBy] = useState<"name" | "created_at">(
    (searchParams.get("sort_by") as "name" | "created_at") || "created_at",
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "desc",
  );

  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (jenisFilter !== "semua") params.set("type", jenisFilter);
    else params.delete("type");

    if (statusFilter !== "semua") params.set("status", statusFilter);
    else params.delete("status");

    if (sortBy !== "created_at") params.set("sort_by", sortBy);
    else params.delete("sort_by");

    if (order !== "desc") params.set("order", order);
    else params.delete("order");

    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    const queryString = params.toString().replace(/\+/g, "%20");
    router.replace(`${pathname}?${queryString}`, { scroll: false });
  }, [
    search,
    jenisFilter,
    statusFilter,
    sortBy,
    order,
    currentPage,
    pathname,
    router,
    searchParams,
  ]);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<InternalSubmissionDetail | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const apiParams = {
    search: search || undefined,
    type: jenisFilter !== "semua" ? jenisFilter : undefined,
    status: statusFilter !== "semua" ? statusFilter : undefined,
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
  } = useInternalSubmissionList(apiParams);

  const submissionList = listResponse?.data?.data ?? [];
  const totalItems = listResponse?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const statsCounts = useMemo(() => {
    const stats = listResponse?.data?.stats;
    if (!stats) return {};
    return {
      BEM: stats.bem,
      DPM: stats.dpm,
      HIMA: stats.hima,
      UKM: stats.ukm,
    } as Record<string, number>;
  }, [listResponse]);

  const statsTotal = listResponse?.data?.stats?.total ?? 0;

  const handleDetail = async (item: InternalSubmissionItem) => {
    setDetailLoading(true);
    try {
      const res = await getInternalSubmissionById(item.id);
      setDetailData(res.data);
      setDetailOpen(true);
    } catch (error) {
      console.error("[useInternalSubmissionState] Gagal ambil detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    setDeleteTargetId(id);
    setDeleteOpen(true);
  };

  const deleteMutation = useDeleteInternalSubmission();

  const confirmDelete = () => {
    if (!deleteTargetId) return;
    deleteMutation.mutate(deleteTargetId, {
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
    statusFilter,
    setStatusFilter: (value: string) => {
      setStatusFilter(value);
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
    deleteLoading: deleteMutation.isPending,
    handleDelete,
    confirmDelete,

    statsCounts,
    statsTotal,
  };
}
