"use client";

import { useMemo, useState } from "react";
import { Trophy, Vote } from "lucide-react";
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

const numberFormat = new Intl.NumberFormat("id-ID");

const highlightClass = "font-sloop text-[20px] md:text-[80px] xl:text-[160px]";

export default function PublicVotingResultsSection() {
  const [categoryId, setCategoryId] = useState<VotingCategoryId>(
    DEFAULT_VOTING_CATEGORY_ID,
  );
  const activeCategory = VOTING_CATEGORIES.find(
    (category) => category.id === categoryId,
  );
  const { data, isLoading, isError } = useVotingList(categoryId);
  const items = useMemo(() => data?.data?.data ?? [], [data]);
  const totalVotes = useMemo(
    () => items.reduce((total, item) => total + item.vote_count, 0),
    [items],
  );
  const maxVotes = Math.max(1, ...items.map((item) => item.vote_count));

  return (
    <section
      aria-labelledby="public-voting-title"
      className="relative w-full px-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-yellow-200/25 bg-blue-900/55 shadow-[0_20px_70px_rgba(3,6,30,0.25)] backdrop-blur-md sm:rounded-3xl">
        <div className="relative overflow-hidden px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-14 -top-20 h-52 w-52 rounded-full bg-yellow-400/10 blur-3xl"
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h1
                id="public-voting-title"
                className="font-the-seasons flex gap-3 px-5 py-7 text-[24px] md:text-[40px] xl:text-[80px] leading-[0.7]"
              >
                <span className="block text-yellow-300 drop-shadow-[0_0_20px_rgba(218,161,17,0.8)]">
                  <span className="sr-only">Total TItle</span>
                  <span aria-hidden="true">
                    <span className={highlightClass}>T</span>
                    otal
                  </span>
                </span>
                <span className="block text-[#B2B4C6] drop-shadow-[0_0_20px_rgba(132,98,255,0.6)]">
                  <span className="sr-only">Voting Title</span>
                  <span aria-hidden="true">
                    <span className={highlightClass}>V</span>
                    oting
                  </span>
                </span>
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
                Perolehan suara organisasi sementara
              </p>
            </div>
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-yellow-300/25 bg-blue-950/50 px-4 py-3 sm:min-w-48 sm:px-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-yellow-300/15 text-yellow-300">
                <Trophy size={19} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-blue-100/70 sm:text-sm">
                  Total suara · {activeCategory?.label}
                </p>
                {isLoading ? (
                  <Skeleton className="mt-1 h-7 w-20 bg-blue-100/20" />
                ) : (
                  <p className="text-xl font-bold tabular-nums text-yellow-200 sm:text-2xl">
                    {numberFormat.format(totalVotes)}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div
            className="relative mt-7 flex gap-2 overflow-x-auto pb-1"
            aria-label="Pilih kategori voting"
          >
            {VOTING_CATEGORIES.map((category) => {
              const active = category.id === categoryId;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setCategoryId(category.id)}
                  aria-pressed={active}
                  className={`shrink-0 rounded-full border px-5 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950 ${active ? "border-yellow-300 bg-yellow-300 text-blue-950" : "border-blue-100/20 bg-blue-950/35 text-blue-50 hover:border-yellow-200/60 hover:text-yellow-200"}`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>

          <div className="relative mt-4 overflow-hidden rounded-xl border border-blue-100/15 bg-blue-950/35">
            {isError ? (
              <div
                role="alert"
                className="px-5 py-10 text-center text-sm text-blue-100"
              >
                Data voting belum dapat dimuat. Silakan coba kembali beberapa
                saat lagi.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table className="min-w-[480px]">
                  <TableHeader>
                    <TableRow className="border-blue-100/15 bg-blue-950/60 hover:bg-blue-950/60">
                      <TableHead className="w-16 px-4 text-center text-xs font-bold uppercase tracking-wider text-yellow-200 sm:px-6">
                        Rank
                      </TableHead>
                      <TableHead className="px-4 text-xs font-bold uppercase tracking-wider text-yellow-200 sm:px-6">
                        Nama {activeCategory?.label}
                      </TableHead>
                      <TableHead className="w-[42%] px-4 text-xs font-bold uppercase tracking-wider text-yellow-200 sm:px-6">
                        Total voting
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      Array.from({ length: 4 }).map((_, index) => (
                        <TableRow key={index} className="border-blue-100/10">
                          <TableCell colSpan={3} className="px-4 py-4 sm:px-6">
                            <Skeleton className="h-5 w-full bg-blue-100/10" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : items.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={3}
                          className="px-4 py-10 text-center text-sm text-blue-100/70"
                        >
                          Belum ada data voting untuk kategori ini.
                        </TableCell>
                      </TableRow>
                    ) : (
                      items.slice(0, 10).map((item, index) => (
                        <TableRow
                          key={item.id}
                          className="border-blue-100/10 text-blue-50 transition-colors hover:bg-blue-100/5"
                        >
                          <TableCell className="px-4 py-4 text-center sm:px-6">
                            <span
                              className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${index === 0 ? "bg-yellow-300 text-blue-950" : "bg-blue-100/10 text-blue-100"}`}
                            >
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell className="max-w-0 px-4 py-4 font-medium sm:px-6">
                            <span className="block truncate" title={item.name}>
                              {item.name}
                            </span>
                          </TableCell>
                          <TableCell className="px-4 py-4 sm:px-6">
                            <div className="flex min-w-32 items-center gap-3">
                              <div className="h-2 min-w-10 flex-1 overflow-hidden rounded-full bg-blue-100/10">
                                <div
                                  className="h-full rounded-full bg-gradient-to-r from-yellow-500 to-yellow-200 transition-[width]"
                                  style={{
                                    width: `${(item.vote_count / maxVotes) * 100}%`,
                                  }}
                                />
                              </div>
                              <span className="w-12 shrink-0 text-right text-sm font-semibold tabular-nums text-yellow-100">
                                {numberFormat.format(item.vote_count)}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <p className="relative mt-3 text-right text-xs text-blue-100/55">
            Menampilkan hingga 10 organisasi teratas
          </p>
        </div>
      </div>
    </section>
  );
}
