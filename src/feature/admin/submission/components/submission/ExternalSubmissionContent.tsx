"use client";

import { useRouter } from "next/navigation";
import AddOrmawaButton from "./AddOrmawaButton";
import FilterJenis from "./FilterJenis";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import OrderButton from "./OrderButton";
import Statistic from "./Statistic";
import ExternalSubmissionTable from "./table/ExternalSubmissionTable";
import SubmissionDetailModalExternal from "./modal/SubmissionDetailModalExternal";
import ConfirmationDialog from "./modal/ConfirmationDialog";

import { useExternalSubmissionState } from "../../hooks/useExternalSubmissionState";
import { generateStatisticCards } from "../../constants/statistics";

export default function ExternalSubmissionContent() {
  const router = useRouter();

  const {
    // Data
    submissionList,
    startIndex,
    totalPages,
    isLoading,
    isError,
    isFetching,

    search,
    setSearch,
    jenisFilter,
    setJenisFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,

    // Pagination
    currentPage,
    setCurrentPage,

    // Modal detail
    detailOpen,
    setDetailOpen,
    detailData,
    detailLoading,
    handleDetail,

    // Modal delete
    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    handleDelete,
    confirmDelete,
    statsCounts,
    statsTotal,
  } = useExternalSubmissionState();

  const cards = generateStatisticCards(statsTotal, statsCounts);

  const handleAddPage = () => {
    router.push("/admin/submission/external-create");
  };

  return (
    <div className="font-inter flex flex-col gap-8">
      <Statistic cards={cards} />

      <AddOrmawaButton onClick={handleAddPage} />

      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <FilterJenis value={jenisFilter} onValueChange={setJenisFilter} />

        <SortButton value={sortBy} onChange={setSortBy} />

        <OrderButton value={order} onChange={setOrder} />
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
            <p className="text-xs text-[#A0A0A0] -mb-6">Memperbarui...</p>
          )}

          <ExternalSubmissionTable
            submissionList={submissionList}
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
        <SubmissionDetailModalExternal
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
        title="Hapus Ormawa"
        description="Apakah kamu yakin ingin menghapus data ini? Tindakan ini tidak bisa dibatalkan."
        confirmText="Hapus"
        variant="destructive"
        loading={deleteLoading}
        onConfirm={confirmDelete}
      />
    </div>
  );
}
