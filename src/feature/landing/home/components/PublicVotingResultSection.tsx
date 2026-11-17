"use client";

import { useMemo, useRef, useState } from "react";
import { Trophy } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DEFAULT_VOTING_CATEGORY_ID,
  VOTING_CATEGORIES,
} from "@/src/feature/admin/voting/constants/voting";
import { STATIC_VOTING_RESULTS } from "@/src/feature/admin/voting/data/votingResults.static";
import type {
  VotingCategoryId,
  VotingHomeItem,
} from "@/src/feature/admin/voting/types/voting";
import VotingPagination from "../components/ui/VotingPagination";
import PodiumContainer from "@/src/feature/landing/podium/components/PodiumContainer";
import type {
  PodiumEntry,
  PodiumRank,
} from "@/src/feature/landing/podium/types/podium.types";
import { useVotingAnimation } from "../hooks/animation/useVotingAnimation";

const numberFormat = new Intl.NumberFormat("id-ID");

const PAGE_SIZE = 10;

/** Jumlah peringkat teratas yang tampil di podium; leaderboard mulai setelahnya. */
const PODIUM_SIZE = 3;

const VOTING_CLOSED = false;

export default function PublicVotingResultsSection() {
  const [categoryId, setCategoryId] = useState<VotingCategoryId>(
    DEFAULT_VOTING_CATEGORY_ID,
  );
  const [page, setPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const tableCardRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const activeCategory = VOTING_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  // Data statis (snapshot final dari backend), tidak ada request jaringan.
  const isLoading = false;
  const isError = false;

  // Terurut dari suara terbanyak. 3 teratas masuk podium, sisanya leaderboard.
  const ranked: VotingHomeItem[] = useMemo(
    () =>
      [...(STATIC_VOTING_RESULTS[categoryId] ?? [])].sort(
        (a, b) => b.vote_count - a.vote_count,
      ),
    [categoryId],
  );

  const podiumItems = useMemo(() => ranked.slice(0, PODIUM_SIZE), [ranked]);
  const items = useMemo(() => ranked.slice(PODIUM_SIZE), [ranked]);

  const podiumEntries: PodiumEntry[] = useMemo(
    () =>
      podiumItems.map((item, index) => ({
        rank: (index + 1) as PodiumRank,
        id: item.id,
        name: item.name.trim(),
        votes: item.vote_count,
      })),
    [podiumItems],
  );

  const totalVotes = useMemo(
    () => ranked.reduce((total, item) => total + item.vote_count, 0),
    [ranked],
  );

  // maxVotes dihitung dari seluruh data (termasuk podium) supaya panjang bar
  // leaderboard sebanding dengan juara 1.
  const maxVotes = Math.max(1, ...ranked.map((item) => item.vote_count));

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const pagedItems = useMemo(
    () => items.slice(startIndex, startIndex + PAGE_SIZE),
    [items, startIndex],
  );

  const rangeStart = items.length === 0 ? 0 : startIndex + 1 + PODIUM_SIZE;
  const rangeEnd = startIndex + pagedItems.length + PODIUM_SIZE;

  useVotingAnimation(
    {
      sectionRef,
      categoriesRef,
      tableCardRef,
      tableBodyRef,
      footerRef,
    },
    `${categoryId}-${currentPage}-${pagedItems.length}`,
    !isLoading && !isError && pagedItems.length > 0,
  );

  if (VOTING_CLOSED) {
    return (
      <section
        id="rank"
        aria-labelledby="voting-closed-title"
        className="relative w-full min-w-0 px-3 sm:px-5 md:px-6 lg:px-10"
      >
        <div className="mx-auto w-full max-w-6xl min-w-0 overflow-hidden rounded-2xl border border-yellow-200/25 bg-blue-900/55 shadow-[0_20px_70px_rgba(3,6,30,0.25)] backdrop-blur-md sm:rounded-3xl">
          <div className="relative min-w-0 overflow-hidden px-4 py-14 sm:px-6 sm:py-20 md:px-8 md:py-24 lg:px-10 lg:py-28">
            {/* Glow decorations */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-14 -top-20 h-72 w-72 rounded-full bg-yellow-400/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-14 h-72 w-72 rounded-full bg-purple-500/10 blur-3xl"
            />

            <div className="relative flex flex-col items-center gap-6 text-center sm:gap-8">
              {/* Icon */}
              <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/10 shadow-[0_0_40px_rgba(218,161,17,0.3)] sm:h-24 sm:w-24">
                <Trophy
                  size={40}
                  className="text-yellow-300 drop-shadow-[0_0_12px_rgba(218,161,17,0.9)] sm:size-[48px]"
                  aria-hidden="true"
                />
              </div>

              {/* Title */}
              <h1
                id="voting-closed-title"
                className="font-the-seasons text-[28px] leading-tight text-yellow-300 drop-shadow-[0_0_24px_rgba(218,161,17,0.7)] sm:text-[36px] md:text-[44px] lg:text-[52px]"
              >
                Terimakasih Sudah Voting
              </h1>

              {/* Divider */}
              <div className="h-px w-24 bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent sm:w-32" />

              {/* Subtitle */}
              <p className="max-w-md text-sm leading-relaxed text-blue-100/75 sm:text-base md:max-w-lg md:text-lg">
                Pengumuman Pemenang akan disampaikan ketika Main event besok,
                Sampai jumpa!
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const categoryTabs = (
    <div
      ref={categoriesRef}
      className="relative z-10 mb-[clamp(0.75rem,2.5svh,1.75rem)] flex min-w-0 max-w-full gap-2 overflow-x-auto overscroll-x-contain pb-2 md:justify-center"
      aria-label="Pilih kategori voting"
    >
      {VOTING_CATEGORIES.map((category) => {
        const active = category.id === categoryId;

        return (
          <button
            key={category.id}
            type="button"
            onClick={() => {
              setCategoryId(category.id);
              setPage(1);
            }}
            aria-pressed={active}
            className={`shrink-0 rounded-full border px-3 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950 sm:px-4 sm:text-sm md:px-5 ${
              active
                ? "border-yellow-300 bg-yellow-300 text-blue-950"
                : "border-blue-100/20 bg-blue-950/35 text-blue-50 hover:border-yellow-200/60 hover:text-yellow-200"
            }`}
          >
            {category.label}
          </button>
        );
      })}
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="rank"
      aria-label="Hasil voting"
      className="relative w-full min-w-0"
    >
      {/* Podium full-width: latar transparan, memakai background landing */}
      <PodiumContainer
        embedded
        categoryLabel={activeCategory?.label ?? ""}
        entries={podiumEntries}
        topSlot={categoryTabs}
      />

      {/* Leaderboard peringkat 4 ke bawah */}
      <div className="mx-auto w-full max-w-6xl min-w-0 px-3 pt-6 sm:px-5 sm:pt-8 md:px-6 lg:px-10">
        <div
          ref={tableCardRef}
          className="relative mt-6 min-w-0 overflow-hidden rounded-xl border border-blue-100/15 bg-blue-950/35 sm:mt-4"
        >
          {isError ? (
            <div
              role="alert"
              className="px-4 py-8 text-center text-xs leading-relaxed text-blue-100 sm:px-5 sm:py-10 sm:text-sm"
            >
              Coming Soon
            </div>
          ) : (
            <div className="w-full overflow-x-auto overscroll-x-contain">
              <Table className="w-full min-w-[360px] table-fixed sm:min-w-[440px] md:min-w-0">
                <TableHeader>
                  <TableRow className="border-blue-100/15 bg-blue-950/60 hover:bg-blue-950/60">
                    <TableHead className="w-[64px] px-2 text-center text-[10px] font-bold uppercase tracking-wider text-yellow-200 sm:w-[76px] sm:px-4 sm:text-xs md:px-6">
                      Rank
                    </TableHead>

                    <TableHead className="px-2 text-xs font-bold uppercase tracking-wider text-yellow-200 sm:px-4 md:px-6">
                      Nama {activeCategory?.label}
                    </TableHead>

                    <TableHead className="w-[42%] px-2 text-[10px] font-bold uppercase tracking-wider text-yellow-200 sm:px-4 sm:text-xs md:w-[38%] md:px-6">
                      Total voting
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody ref={tableBodyRef}>
                  {isLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <TableRow key={index} className="border-blue-100/10">
                        <TableCell
                          colSpan={3}
                          className="px-3 py-3 sm:px-4 sm:py-4 md:px-6"
                        >
                          <Skeleton className="h-5 w-full bg-blue-100/10" />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : items.length === 0 ? (
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        className="px-3 py-8 text-center text-xs leading-relaxed text-blue-100/70 sm:px-4 sm:py-10 sm:text-sm"
                      >
                        Tidak ada peringkat lanjutan untuk kategori ini.
                      </TableCell>
                    </TableRow>
                  ) : (
                    pagedItems.map((item, index) => {
                      const rank = startIndex + index + PODIUM_SIZE + 1;

                      return (
                        <TableRow
                          key={item.id}
                          className="border-blue-100/10 text-blue-50 transition-colors hover:bg-blue-100/5"
                        >
                          <TableCell className="px-2 py-3 text-center sm:px-4 sm:py-4 md:px-6">
                            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-blue-100/10 text-xs font-bold text-blue-100 sm:h-8 sm:w-8 sm:text-sm">
                              {rank}
                            </span>
                          </TableCell>

                          <TableCell className="min-w-0 overflow-hidden px-2 py-3 font-medium sm:px-4 sm:py-4 md:px-6">
                            <span
                              className="block truncate text-xs sm:text-sm"
                              title={item.name}
                            >
                              {item.name}
                            </span>
                          </TableCell>

                          <TableCell className="px-2 py-3 sm:px-4 sm:py-4 md:px-6">
                            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                              <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-blue-100/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-200 transition-[width]"
                                  style={{
                                    width: `${(item.vote_count / maxVotes) * 100}%`,
                                  }}
                                />
                              </div>

                              <span className="w-auto min-w-8 shrink-0 text-right text-xs font-semibold tabular-nums text-yellow-100 sm:min-w-12 sm:text-sm">
                                {numberFormat.format(item.vote_count)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        <div ref={footerRef}>
          {!isLoading && !isError && (
            <VotingPagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          )}
        </div>
      </div>
    </section>
  );
}
