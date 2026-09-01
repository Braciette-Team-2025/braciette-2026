import { useRouter } from "next/navigation";

import AddOrmawaButton from "./AddOrmawaButton";
import FilterJenis from "./FilterJenis";
import FilterStatus from "./FilterStatus";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import OrderButton from "./OrderButton";
import Statistic from "./Statistic";
import SubmissionTable from "./table/SubmissionTable";

import { useSubmissionList } from "../../hooks/useSubmissionList";
import { generateStatisticCards } from "../../constants/statistics";
import type { SubmissionContentProps } from "../../types/ormawa";

export default function SubmissionContent({
  type,
  onDelete,
  onEdit,
  onDetail,
}: SubmissionContentProps) {
  const router = useRouter();

  const {
    paginatedData,
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
    totalCount,
  } = useSubmissionList(type);

  const cards = generateStatisticCards(totalCount, statsCounts);

  const handleAddPage = () => {
    router.push(`/admin/submission/${type}-create`);
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

        {type === "internal" && (
          <FilterStatus value={statusFilter} onValueChange={setStatusFilter} />
        )}

        <SortButton value={sortBy} onChange={setSortBy} />
        <OrderButton value={order} onChange={setOrder} />
      </div>

      <SubmissionTable
        submissionList={paginatedData}
        onDelete={onDelete}
        onEdit={onEdit}
        onDetail={onDetail}
        type={type}
        startIndex={startIndex}
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
