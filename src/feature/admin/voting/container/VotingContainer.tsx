"use client";

import { useMemo, useState } from "react";

import { VotingContent } from "../components/voting/VotingContent";
import Pagination from "../../submission/components/submission/Pagination";

import {
  DEFAULT_VOTING_CATEGORY_ID,
  VOTING_CATEGORIES,
} from "../constants/voting";

import { useVotingHome, useVotingList } from "../hooks/useVoting";

import type {
  VotingCategoryId,
  VotingResultItem,
  VotingStatistic,
} from "../types/voting";

const ITEMS_PER_PAGE = 10;

const STAT_KEY_MAP: Record<VotingCategoryId, "bem" | "dpm" | "hima" | "ukm"> = {
  bem: "bem",
  dpm: "dpm",
  hima: "hima",
  ukm: "ukm",
};

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

  /**
   * Ambil data berdasarkan kategori yang sedang dipilih.
   *
   * Contoh:
   * BEM  -> /v1/submission/external?type=BEM
   * DPM  -> /v1/submission/external?type=DPM
   * HIMA -> /v1/submission/external?type=HIMA
   * UKM  -> /v1/submission/external?type=UKM
   */
  const {
    data: listResponse,
    isLoading: isListLoading,
    isError: isListError,
  } = useVotingList(activeCategoryId);

  /**
   * Ambil statistik global dari:
   *
   * GET /v1/submission/external/home
   */
  const {
    data: homeResponse,
    isLoading: isHomeLoading,
    isError: isHomeError,
  } = useVotingHome();

  /**
   * Data hasil voting dari endpoint berdasarkan type.
   */
  const items = useMemo<VotingResultItem[]>(() => {
    const data = listResponse?.data?.data ?? [];

    return data.map((item, index) => ({
      id: item.id,
      name: item.name,
      totalVote: item.vote_count,

      // Backend sudah mengurutkan dari vote terbanyak.
      rank: index + 1,
    }));
  }, [listResponse]);

  /**
   * Total voting mengambil stats berdasarkan kategori aktif.
   *
   * BEM  -> stats.bem
   * DPM  -> stats.dpm
   * HIMA -> stats.hima
   * UKM  -> stats.ukm
   */
  const statistic = useMemo<VotingStatistic | undefined>(() => {
    const stats = homeResponse?.data?.stats;

    if (!stats) {
      return undefined;
    }

    const statKey = STAT_KEY_MAP[activeCategoryId];

    /**
     * Endpoint list sudah diurutkan backend dari vote terbanyak.
     * Jadi data[0] adalah ormawa terbaik.
     */
    const bestCandidate = items[0];

    return {
      totalVoting: stats[statKey] ?? 0,
      bestCandidateName: bestCandidate?.name ?? "-",
    };
  }, [homeResponse, activeCategoryId, items]);

  /**
   * Pagination dilakukan di FE karena endpoint voting
   * mengembalikan daftar hasil voting.
   */
  const totalPages = Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE));

  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;

    return items.slice(start, start + ITEMS_PER_PAGE);
  }, [items, currentPage]);

  const handleCategoryChange = (id: VotingCategoryId) => {
    setActiveCategoryId(id);

    // Set kembali ke halaman pertama ketika kategori berubah.
    setCurrentPage(1);
  };

  const isLoading = isListLoading || isHomeLoading;

  /**
   * Saat API error, table akan menjadi empty state.
   *
   * Tidak melakukan redirect dari sini.
   * Auth/401 tetap ditangani oleh mekanisme axios/auth yang sudah kamu buat.
   */
  const hasError = isListError || isHomeError;

  return (
    <div className="mx-auto w-full px-4 py-6 sm:px-6 sm:py-8">
      <header>
        <h1 className="text-[32px] font-bold">Voting</h1>

        <p className="text-[20px] font-semibold">
          Hasil Voting {activeCategory?.label}
        </p>
      </header>

      {hasError ? (
        <div className="mt-6 rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-center">
          <p className="font-medium">Gagal mengambil data voting.</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Silakan coba refresh halaman.
          </p>
        </div>
      ) : (
        <VotingContent
          categories={VOTING_CATEGORIES}
          activeCategoryId={activeCategoryId}
          onCategoryChange={handleCategoryChange}
          statistic={statistic}
          items={paginatedItems}
          isLoading={isLoading}
          nameColumnLabel={`Nama ${activeCategory?.label ?? ""}`}
          bestCandidateLabel={`${activeCategory?.label ?? "Ormawa"} Terbaik`}
          pagination={
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          }
        />
      )}
    </div>
  );
}
