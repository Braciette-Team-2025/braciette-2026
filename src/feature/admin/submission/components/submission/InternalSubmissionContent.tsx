import { useRouter } from "next/navigation";

import AddOrmawaButton from "./AddOrmawaButton";
import FilterJenis from "./FilterJenis";
import FilterStatus from "./FilterStatus";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import OrderButton from "./OrderButton";
import Statistic from "./Statistic";
import InternalSubmissionTable from "./table/InternalSubmissionTable";
import SubmissionDetailModalInternal from "./modal/SubmissionDetailModalInternal";
import ConfirmationDialog from "./modal/ConfirmationDialog";

import { useInternalSubmissionState } from "../../hooks/internal/useInternalSubmissionState";
import { generateStatisticCards } from "../../constants/statistics";

export default function InternalSubmissionContent() {
  const router = useRouter();

  const {
    submissionList,
    startIndex,
    totalPages,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    jenisFilter,
    setJenisFilter,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
    statsCounts,
    statsTotal,

    handleDetail,
    handleDelete,
    detailOpen,
    setDetailOpen,
    detailData,
    deleteOpen,
    setDeleteOpen,
    deleteLoading,
    confirmDelete,
  } = useInternalSubmissionState();

  const cards = generateStatisticCards(statsTotal, statsCounts);

  const handleAddPage = () => {
    router.push(`/admin/submission/internal-create`);
  };

  return (
    <div className="font-inter flex flex-col gap-8">
      <Statistic cards={cards} />

      <AddOrmawaButton onClick={handleAddPage} />

      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        <FilterJenis
          value={jenisFilter}
          onValueChange={setJenisFilter}
          type="internal"
        />

        <FilterStatus value={statusFilter} onValueChange={setStatusFilter} />

        <SortButton value={sortBy} onChange={setSortBy} />
        <OrderButton value={order} onChange={setOrder} />
      </div>

      <InternalSubmissionTable
        submissionList={submissionList}
        onDelete={handleDelete}
        onDetail={handleDetail}
        startIndex={startIndex}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {detailData && (
        <SubmissionDetailModalInternal
          open={detailOpen}
          onOpenChange={setDetailOpen}
          data={detailData}
        />
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
