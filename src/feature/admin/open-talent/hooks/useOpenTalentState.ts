"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useOpenTalentListQuery } from "./useOpenTalentListQuery";
import { useDeleteOpenTalent } from "./useDeleteOpenTalent";
import { getOpenTalentById } from "../services/openTalentService";
import type {
  OpenTalentListItem,
  OpenTalentDetail,
  PerformanceType,
} from "../types";

const ITEMS_PER_PAGE = 10;

export function useOpenTalentState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [statusFilter, setStatusFilter] = useState(
    searchParams.get("status") || "semua",
  );
  const [performanceTypeFilter, setPerformanceTypeFilter] = useState(
    searchParams.get("performance_type") || "semua",
  );
  const [sortBy, setSortBy] = useState<"name" | "created_at">(
    (searchParams.get("sort") as "name" | "created_at") || "name",
  );
  const [order, setOrder] = useState<"asc" | "desc">(
    (searchParams.get("order") as "asc" | "desc") || "asc",
  );
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.get("page")) || 1,
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (statusFilter !== "semua") params.set("status", statusFilter);
    else params.delete("status");

    if (performanceTypeFilter !== "semua")
      params.set("performance_type", performanceTypeFilter);
    else params.delete("performance_type");

    params.set("sort", sortBy);
    params.set("order", order);

    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    const queryString = params.toString().replace(/\+/g, "%20");
    router.replace(`${pathname}?${queryString}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    search,
    statusFilter,
    performanceTypeFilter,
    sortBy,
    order,
    currentPage,
    pathname,
    router,
  ]);

  const resetPage = () => setCurrentPage(1);

  const apiParams = {
    search: search || undefined,
    status: statusFilter !== "semua" ? statusFilter : undefined,
    performance_type:
      performanceTypeFilter !== "semua"
        ? (performanceTypeFilter as PerformanceType)
        : undefined,
    sort_by: sortBy,
    order: order,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  const {
    data: listResponse,
    isLoading,
    isError,
    isFetching,
  } = useOpenTalentListQuery(apiParams);

  const openTalentList: OpenTalentListItem[] = listResponse?.data?.data ?? [];
  const totalItems = listResponse?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<OpenTalentDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  const handleDetail = async (item: OpenTalentListItem) => {
    setDetailLoading(true);
    try {
      const res = await getOpenTalentById(item.id);
      setDetailData(res.data);
      setDetailOpen(true);
    } catch (error) {
      console.error("[useOpenTalentState] Gagal ambil detail:", error);
    } finally {
      setDetailLoading(false);
    }
  };

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const { mutate: deleteItem, isPending: deleteLoading } =
    useDeleteOpenTalent();

  const handleDelete = (item: OpenTalentListItem) => {
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
    openTalentList,
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
    statusFilter,
    setStatusFilter: (value: string) => {
      setStatusFilter(value);
      resetPage();
    },
    performanceTypeFilter,
    setPerformanceTypeFilter: (value: string) => {
      setPerformanceTypeFilter(value);
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
  };
}
