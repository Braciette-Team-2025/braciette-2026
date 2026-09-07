"use client";

import { useOrmawaListState } from "../hooks/useOrmawaListState";
import OrmawaListTable from "../components/OrmawaListTable";
import OrmawaSearchBar from "../components/OrmawaSearchBar";
import OrmawaFilterJenis from "../components/OrmawaFilterJenis";
import OrmawaSortButton from "../components/OrmawaSortButton";
import OrmawaOrderButton from "../components/OrmawaOrderButton";
import OrmawaPagination from "../components/OrmawaPagination";

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
    <div className="py-6 px-4 md:py-10 md:px-15 lg:py-15 lg:px-25 space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-extrabold text-yellow-500">
          Daftar Ormawa
        </h1>
        <p className="text-lg md:text-2xl font-bold text-yellow-500/80">
          Data ormawa yang telah mendaftar
        </p>
      </div>

      <div className="font-inter flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 py-4">
          <div className="w-full flex-1">
            <OrmawaSearchBar value={search} onChange={setSearch} />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <OrmawaFilterJenis
              value={jenisFilter}
              onValueChange={setJenisFilter}
            />

            <OrmawaSortButton value={sortBy} onChange={setSortBy} />
            <OrmawaOrderButton value={order} onChange={setOrder} />
          </div>
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
