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
import { useVotingList } from "@/src/feature/admin/voting/hooks/useVoting";
import type { VotingCategoryId } from "@/src/feature/admin/voting/types/voting";
import VotingPagination from "../components/ui/VotingPagination";
import { useVotingAnimation } from "../hooks/animation/useVotingAnimation";

const numberFormat = new Intl.NumberFormat("id-ID");

const PAGE_SIZE = 10;

const highlightClass =
  "font-sloop text-[48px] leading-none sm:text-[64px] md:text-[80px] lg:text-[112px] xl:text-[140px]";

export default function PublicVotingResultsSection() {
  const [categoryId, setCategoryId] = useState<VotingCategoryId>(
    DEFAULT_VOTING_CATEGORY_ID,
  );
  const [page, setPage] = useState(1);

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const totalCardRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const tableCardRef = useRef<HTMLDivElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const activeCategory = VOTING_CATEGORIES.find(
    (category) => category.id === categoryId,
  );

  const { data, isLoading, isError } = useVotingList(categoryId);

  const items = useMemo(() => data?.data?.data ?? [], [data]);

  const totalVotes = useMemo(
    () => items.reduce((total, item) => total + item.vote_count, 0),
    [items],
  );

  // maxVotes dihitung dari seluruh data (bukan per halaman) supaya
  // panjang bar tetap sebanding antar halaman.
  const maxVotes = Math.max(1, ...items.map((item) => item.vote_count));

  const totalPages = Math.max(1, Math.ceil(items.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;

  const pagedItems = useMemo(
    () => items.slice(startIndex, startIndex + PAGE_SIZE),
    [items, startIndex],
  );

  const rangeStart = items.length === 0 ? 0 : startIndex + 1;
  const rangeEnd = startIndex + pagedItems.length;

  useVotingAnimation(
    {
      sectionRef,
      headingRef,
      subtitleRef,
      totalCardRef,
      categoriesRef,
      tableCardRef,
      tableBodyRef,
      footerRef,
    },
    `${categoryId}-${currentPage}-${pagedItems.length}`,
    !isLoading && !isError && pagedItems.length > 0,
  );

  return (
    <section
      ref={sectionRef}
      aria-labelledby="public-voting-title"
      className="relative w-full min-w-0 px-3 sm:px-5 md:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-6xl min-w-0 overflow-hidden rounded-2xl border border-yellow-200/25 bg-blue-900/55 shadow-[0_20px_70px_rgba(3,6,30,0.25)] backdrop-blur-md sm:rounded-3xl">
        <div className="relative min-w-0 overflow-hidden px-4 py-5 sm:px-6 sm:py-7 md:px-8 md:py-8 lg:px-10 lg:py-9">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-yellow-400/10 blur-3xl"
          />

          <div className="relative flex min-w-0 flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0 flex-1">
              <h1
                ref={headingRef}
                id="public-voting-title"
                className="font-the-seasons flex flex-wrap items-baseline gap-x-2 gap-y-1 px-1 py-3 text-[28px] leading-none sm:gap-x-3 sm:text-[36px] md:text-[44px] lg:text-[56px] xl:text-[64px]"
              >
                <span className="block whitespace-nowrap text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
                  <span className="sr-only">Total </span>
                  <span aria-hidden="true">
                    <span className={highlightClass}>T</span>
                    otal
                  </span>
                </span>

                <span className="block whitespace-nowrap text-[#B2B4C6] drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
                  <span className="sr-only">Voting</span>
                  <span aria-hidden="true">
                    <span className={highlightClass}>V</span>
                    oting
                  </span>
                </span>
              </h1>

              <p
                ref={subtitleRef}
                className="mt-2 max-w-xl text-xs leading-relaxed text-blue-100/80 sm:mt-3 sm:text-sm md:text-base"
              >
                Perolehan Suara Sementara Organisasi
              </p>
            </div>

            <div
              ref={totalCardRef}
              className="flex min-w-0 w-full items-center gap-3 rounded-xl border border-yellow-300/25 bg-blue-950/50 px-3 py-3 sm:px-4 md:w-auto md:min-w-56 md:px-5"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-yellow-300/15 text-yellow-300 sm:h-10 sm:w-10">
                <Trophy size={19} aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium leading-relaxed text-blue-100/70 sm:text-sm">
                  Total suara · {activeCategory?.label}
                </p>

                {isLoading ? (
                  <Skeleton className="mt-1 h-7 w-20 bg-blue-100/20" />
                ) : (
                  <p className="break-words text-xl font-bold tabular-nums text-yellow-200 sm:text-2xl">
                    {numberFormat.format(totalVotes)}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div
            ref={categoriesRef}
            className="relative mt-5 flex min-w-0 gap-2 overflow-x-auto overscroll-x-contain pb-2 sm:mt-6 md:mt-7"
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

          <div
            ref={tableCardRef}
            className="relative mt-3 min-w-0 overflow-hidden rounded-xl border border-blue-100/15 bg-blue-950/35 sm:mt-4"
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
                          Belum ada data voting untuk kategori ini.
                        </TableCell>
                      </TableRow>
                    ) : (
                      pagedItems.map((item, index) => {
                        const rank = startIndex + index + 1;

                        return (
                          <TableRow
                            key={item.id}
                            className="border-blue-100/10 text-blue-50 transition-colors hover:bg-blue-100/5"
                          >
                            <TableCell className="px-2 py-3 text-center sm:px-4 sm:py-4 md:px-6">
                              <span
                                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold sm:h-8 sm:w-8 sm:text-sm ${
                                  rank === 1
                                    ? "bg-yellow-300 text-blue-950"
                                    : "bg-blue-100/10 text-blue-100"
                                }`}
                              >
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
            {!isLoading && !isError && items.length > 0 && (
              <p className="relative mt-3 text-right text-[10px] leading-relaxed text-blue-100/55 sm:text-xs">
                Menampilkan {rangeStart}–{rangeEnd} dari {items.length}{" "}
                organisasi
              </p>
            )}

            {!isLoading && !isError && (
              <VotingPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
