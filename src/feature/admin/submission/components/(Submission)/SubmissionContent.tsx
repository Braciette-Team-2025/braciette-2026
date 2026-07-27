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
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

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

  const addPage = () => {
    router.push(`/admin/submission/${type}-create`);
  };

  return (
    <div className="font-inter flex flex-col gap-8">
      <Statistic cards={cards} />
      <AddOrmawaButton onClick={addPage} />
      <div className="flex items-center gap-4 py-4">
        <div className="flex-1">
          <SearchBar onChange={setSearch} value={search} />
        </div>
        <FilterJenis onValueChange={setJenisFilter} value={jenisFilter} />
        {type === "internal" && (
          <FilterStatus onValueChange={setStatusFilter} value={statusFilter} />
        )}
        <SortButton onChange={setSortBy} value={sortBy} />
      </div>
      <SubmissionTable
        submissionList={filteredSubmissions}
        onDelete={onDelete}
        onEdit={onEdit}
        onDetail={onDetail}
        type={type}
      />
    </div>
  );
}
