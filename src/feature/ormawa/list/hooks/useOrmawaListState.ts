"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useOrmawaList } from "./useOrmawaList";

const ITEMS_PER_PAGE = 15;

export function useOrmawaListState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [jenisFilter, setJenisFilter] = useState(
    searchParams.get("jenis") || "semua",
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

  const resetPage = () => setCurrentPage(1);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (search) params.set("search", search);
    else params.delete("search");

    if (jenisFilter !== "semua") params.set("jenis", jenisFilter);
    else params.delete("jenis");

    if (sortBy !== "created_at") params.set("sort_by", sortBy);
    else params.delete("sort_by");

    if (order !== "desc") params.set("order", order);
    else params.delete("order");

    if (currentPage > 1) params.set("page", currentPage.toString());
    else params.delete("page");

    const queryString = params.toString().replace(/\+/g, "%20");
    router.replace(`${pathname}?${queryString}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, jenisFilter, sortBy, order, currentPage, pathname, router]);

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
  } = useOrmawaList(apiParams);

  const ormawaList = listResponse?.data?.data ?? [];
  const totalItems = listResponse?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return {
    ormawaList,
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
  };
}
