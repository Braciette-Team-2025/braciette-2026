"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  useExternalSubmissionList,
  useExternalStatistics,
} from "./useExternalSubmissionList";
import { useDeleteExternalSubmission } from "./useDeleteExternalSubmission";
import { getExternalSubmissionById } from "../../services/submissionExternalService";
import type {
  ExternalSubmissionDetail,
  ExternalSubmissionItem,
} from "../../types/ormawa";

const ITEMS_PER_PAGE = 15;

export function useExternalSubmissionState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [jenisFilter, setJenisFilter] = useState(
    searchParams.get("type") || "semua",
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

    if (sortBy !== "created_at") params.set("sort_by", sortBy);
    else params.delete("sort_by");

    if (order !== "desc") params.set("order", order);
    else params.delete("order");

    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    const queryString = params.toString().replace(/\+/g, "%20");
    if (queryString !== searchParams.toString()) {
      router.replace(`${pathname}?${queryString}`, { scroll: false });
    }
  }, [
    search,
    jenisFilter,
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
  const [detailData, setDetailData] = useState<ExternalSubmissionDetail | null>(
    null,
  );
  const [detailLoading, setDetailLoading] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  const apiParams = {
    search: search || undefined,
    type: jenisFilter !== "semua" ? jenisFilter : undefined,
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
