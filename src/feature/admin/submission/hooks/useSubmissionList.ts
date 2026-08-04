"use client";

import { useMemo, useState } from "react";
import {
  externalSubmissionList,
  internalSubmissionList,
} from "../constants/ormawaList";

const ITEMS_PER_PAGE = 5;

export function useSubmissionList(type: "internal" | "external") {
  const submissions =
    type === "internal" ? internalSubmissionList : externalSubmissionList;

  const [search, setSearch] = useState("");
  const [jenisFilter, setJenisFilter] = useState("semua");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [sortBy, setSortBy] = useState<"az" | "za">("az");
  const [currentPage, setCurrentPage] = useState(1);

  function resetPage() {
    setCurrentPage(1);
  }

  const filteredSubmissions = useMemo(() => {
    let data = [...submissions];

    if (search) {
      data = data.filter((item) =>
        item.namaOrmawa.toLowerCase().includes(search.toLowerCase()),
      );
    }

    if (jenisFilter !== "semua") {
      data = data.filter((item) => item.jenisOrmawa === jenisFilter);
    }

    if (type === "internal" && statusFilter !== "semua") {
      data = data.filter((item) => item.status === statusFilter);
    }

    data.sort((a, b) =>
      sortBy === "az"
        ? a.namaOrmawa.localeCompare(b.namaOrmawa)
        : b.namaOrmawa.localeCompare(a.namaOrmawa),
    );

    return data;
  }, [submissions, search, jenisFilter, statusFilter, sortBy, type]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE),
  );

  const paginatedData = filteredSubmissions.slice(
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
    setSortBy: (value: "az" | "za") => {
      setSortBy(value);
      resetPage();
    },
  };
}
