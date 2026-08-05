"use client";

import { useMemo, useState } from "react";
import { dummyData } from "../constants";

const ITEMS_PER_PAGE = 5;

export function useOpenTalentList() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [sortBy, setSortBy] = useState<"az" | "za">("az");
  const [currentPage, setCurrentPage] = useState(1);

  function resetPage() {
    setCurrentPage(1);
  }

  const filteredData = useMemo(() => {
    let data = [...dummyData];

    if (search) {
      data = data.filter((item) =>
        item.namaKetua.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (statusFilter !== "semua") {
      data = data.filter((item) => item.status === statusFilter);
    }

    data.sort((a, b) =>
      sortBy === "az"
        ? a.namaKetua.localeCompare(b.namaKetua)
        : b.namaKetua.localeCompare(a.namaKetua),
    );

    return data;
  }, [search, statusFilter, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  return {
    paginatedData,
    startIndex,
    totalPages,
    currentPage,
    setCurrentPage,
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
    sortBy,
    setSortBy: (value: "az" | "za") => {
      setSortBy(value);
      resetPage();
    },
  };
}
