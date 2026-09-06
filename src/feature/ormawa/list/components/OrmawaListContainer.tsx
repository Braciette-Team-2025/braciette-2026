"use client";

import { useOrmawaListState } from "../hooks/useOrmawaListState";
import OrmawaListTable from "./OrmawaListTable";
import OrmawaSearchBar from "./OrmawaSearchBar";
import OrmawaFilterJenis from "./OrmawaFilterJenis";
import OrmawaSortButton from "./OrmawaSortButton";
import OrmawaOrderButton from "./OrmawaOrderButton";
import OrmawaPagination from "./OrmawaPagination";

export default function OrmawaListContainer() {
  const {
    ormawaList,
    startIndex,
    totalPages,
    currentPage,
    setCurrentPage,
    search,
    setSearch,
    jenisFilter,
    setJenisFilter,
    sortBy,
    setSortBy,
    order,
    setOrder,
  } = useOrmawaListState();

  return (
    <div className="py-15 px-25 space-y-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-yellow-500">
          Daftar Ormawa
        </h1>
        <p className="text-2xl font-bold text-yellow-500/80">
          Data ormawa yang telah mendaftar
        </p>
      </div>

      <div className="font-inter flex flex-col gap-8">
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1">
            <OrmawaSearchBar value={search} onChange={setSearch} />
          </div>

          <OrmawaFilterJenis
            value={jenisFilter}
            onValueChange={setJenisFilter}
          />

          <OrmawaSortButton value={sortBy} onChange={setSortBy} />
          <OrmawaOrderButton value={order} onChange={setOrder} />
        </div>

        <OrmawaListTable ormawaList={ormawaList} startIndex={startIndex} />

        <OrmawaPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
