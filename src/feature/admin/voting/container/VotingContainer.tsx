"use client";

import { useMemo, useState } from "react";

import { VotingContent } from "../components/voting/VotingContent";
import Pagination from "../../submission/components/submission/Pagination";

import {
  DEFAULT_VOTING_CATEGORY_ID,
  DUMMY_VOTING_ITEMS,
  DUMMY_VOTING_STATISTIC,
  VOTING_CATEGORIES,
} from "../constants/voting";

import type { VotingCategoryId } from "../types/voting";

const ITEMS_PER_PAGE = 10;

export function VotingContainer() {
  const [activeCategoryId, setActiveCategoryId] = useState<VotingCategoryId>(
    DEFAULT_VOTING_CATEGORY_ID,
  );

  const [currentPage, setCurrentPage] = useState(1);

  const activeCategory = useMemo(
    () =>
      VOTING_CATEGORIES.find((category) => category.id === activeCategoryId),
    [activeCategoryId],
  );

  const items = useMemo(
    () => DUMMY_VOTING_ITEMS[activeCategoryId] ?? [],
    [activeCategoryId],
  );

  const statistic = useMemo(
    () => DUMMY_VOTING_STATISTIC[activeCategoryId],
    [activeCategoryId],
  );

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  const handleCategoryChange = (id: VotingCategoryId) => {
    setActiveCategoryId(id);
    setCurrentPage(1);
  };

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
      <header>
        <h1 className="text-[32px] font-bold">Voting</h1>
        <p className="text-[20px] font-semibold">
          Hasil Voting {activeCategory?.label}
        </p>
      </header>

      <VotingContent
        categories={VOTING_CATEGORIES}
        activeCategoryId={activeCategoryId}
        onCategoryChange={handleCategoryChange}
        statistic={statistic}
        items={paginatedItems}
        nameColumnLabel={`Nama ${activeCategory?.label}`}
        pagination={
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        }
      />
    </div>
  );
}
