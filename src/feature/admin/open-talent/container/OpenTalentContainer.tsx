"use client";
import AddTalentButton from "../components/AddTalentButton";
import FilterStatus from "../components/FilterStatus";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import OpenTalentTable from "../components/table/OpenTalentTable";
import Pagination from "../components/Pagination";

import { useRouter } from "next/navigation";
import { useOpenTalentList } from "../hooks/useOpenTalentList";

export default function OpenTalentContainer() {
  const router = useRouter();
  const {
    paginatedData,
    startIndex,
    totalPages,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
  } = useOpenTalentList();

  return (
    <div className="py-15 pl-6 pr-[100px] bg-white min-h-screen space-y-6">
      <div className="space-y-2 text-[#7F7F7F]">
        <h1 className="text-[32px] font-extrabold">Open Talent</h1>
        <p className="text-[20px] font-bold">Hasil pendaftaran open talent</p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-4">
          <FilterStatus value={statusFilter} onValueChange={setStatusFilter} />
          <SortButton value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div>
        <AddTalentButton
          onClick={() => router.push("/admin/open-talent/create")}
        />
      </div>

      <OpenTalentTable data={paginatedData} startIndex={startIndex} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
