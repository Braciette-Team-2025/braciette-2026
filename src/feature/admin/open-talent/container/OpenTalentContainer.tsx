"use client";

import AddTalentButton from "../components/AddTalentButton";
import FilterStatus from "../components/FilterStatus";
import FilterPerformanceType from "../components/FilterPerformanceType";
import SearchBar from "../components/SearchBar";
import SortButton from "../components/SortButton";
import OrderButton from "../components/OrderButton";
import OpenTalentTable from "../components/table/OpenTalentTable";
import Pagination from "../components/Pagination";
import OpenTalentDetailModal from "../components/modal/OpenTalentDetailModal";
import ConfirmationDialog from "../components/modal/ConfirmationDialog";

import { useRouter } from "next/navigation";
import { useOpenTalentState } from "../hooks/useOpenTalentState";

export default function OpenTalentContainer() {
  const router = useRouter();
  const {
    openTalentList,
    startIndex,
    totalPages,
    isLoading,
    isError,
    isFetching,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    performanceTypeFilter,
    setPerformanceTypeFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
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
  } = useOpenTalentState();

  return (
    <div className="py-15 pl-6 pr-[100px] bg-white min-h-screen space-y-6">
      <div className="space-y-2">
        <h1 className="text-[32px] font-extrabold text-blue-900">
          Open Talent
        </h1>
        <p className="text-[20px] font-bold text-blue-900/80">
          Hasil pendaftaran open talent
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>
        <div className="flex gap-4">
          <FilterPerformanceType
            value={performanceTypeFilter}
            onValueChange={setPerformanceTypeFilter}
          />
          <FilterStatus value={statusFilter} onValueChange={setStatusFilter} />
          <SortButton value={sortBy} onChange={setSortBy} />
          <OrderButton value={order} onChange={setOrder} />
        </div>
      </div>

      <div>
        <AddTalentButton
          onClick={() => router.push("/admin/open-talent/create")}
        />
      </div>

      {isLoading && (
        <div className="py-10 text-center text-sm text-[#7F7F7F]">
          Memuat data...
        </div>
      )}

      {isError && !isLoading && (
        <div className="py-10 text-center text-sm text-red-500">
          Gagal memuat data. Silakan coba lagi.
        </div>
      )}

      {!isLoading && !isError && (
        <>
          {isFetching && (
            <p className="text-xs text-[#A0A0A0] -mb-4">Memperbarui...</p>
          )}

          <OpenTalentTable
            data={openTalentList}
            startIndex={startIndex}
            onDetail={handleDetail}
            onDelete={handleDelete}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}

      {detailData && (
        <OpenTalentDetailModal
          open={detailOpen}
          onOpenChange={setDetailOpen}
          data={detailData}
        />
      )}

      {detailLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="rounded-xl bg-white px-8 py-6 text-sm text-[#7F7F7F] shadow-lg">
            Memuat detail...
          </div>
        </div>
      )}

      <ConfirmationDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        title="Hapus Data Open Talent"
        description="Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
        confirmText="Hapus"
        cancelText="Batal"
        onConfirm={confirmDelete}
      />
    </div>
  );
}
