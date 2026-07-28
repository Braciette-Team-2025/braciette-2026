import AddOrmawaButton from "./AddOrmawaButton";
import FilterJenis from "./FilterJenis";
import SearchBar from "./SearchBar";
import SortButton from "./SortButton";
import Statistic from "./Statistic";
import SubmissionTable from "./(table)/SubmissionTable";
import FilterStatus from "./FilterStatus";
import { externalCards, internalCards } from "../../constants/statistics";
import {
  externalSubmissionList,
  internalSubmissionList,
} from "../../constants/ormawaList";
import type { SubmissionContentProps } from "../../types/ormawa";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

export default function SubmissionContent({
  type,
  onDelete,
  onEdit,
  onDetail,
}: SubmissionContentProps) {
  const router = useRouter();
  const cards = type === "internal" ? internalCards : externalCards;
  const submissions =
    type === "internal" ? internalSubmissionList : externalSubmissionList;

  const [jenisFilter, setJenisFilter] = useState("semua");
  const [statusFilter, setStatusFilter] = useState("semua");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"az" | "za">("az");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

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

    data.sort((a, b) => {
      if (sortBy === "az") {
        return a.namaOrmawa.localeCompare(b.namaOrmawa);
      }

      return b.namaOrmawa.localeCompare(a.namaOrmawa);
    });

    return data;
  }, [submissions, search, jenisFilter, statusFilter, sortBy, type]);

  const paginatedData = filteredSubmissions.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredSubmissions.length / ITEMS_PER_PAGE),
  );

  const addPage = () => {
    router.push(`/admin/submission/${type}-create`);
  };

  return (
    <div className="font-inter flex flex-col gap-8">
      <Statistic cards={cards} />
      <AddOrmawaButton onClick={addPage} />
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar
            value={search}
            onChange={(value) => {
              setSearch(value);
              setCurrentPage(1);
            }}
          />
        </div>
        <FilterJenis
          value={jenisFilter}
          onValueChange={(value) => {
            setJenisFilter(value);
            setCurrentPage(1);
          }}
        />
        {type === "internal" && (
          <FilterStatus
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setCurrentPage(1);
            }}
          />
        )}
        <SortButton
          value={sortBy}
          onChange={(value) => {
            setSortBy(value);
            setCurrentPage(1);
          }}
        />
      </div>
      <SubmissionTable
        submissionList={paginatedData}
        onDelete={onDelete}
        onEdit={onEdit}
        onDetail={onDetail}
        type={type}
        startIndex={(currentPage - 1) * ITEMS_PER_PAGE}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
