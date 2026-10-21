"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

type VotingPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

type PageItem = number | "ellipsis-start" | "ellipsis-end";

function getPageItems(currentPage: number, totalPages: number): PageItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, 4, "ellipsis-end", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [
      1,
      "ellipsis-start",
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages,
    ];
  }

  return [
    1,
    "ellipsis-start",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "ellipsis-end",
    totalPages,
  ];
}

const baseButton =
  "inline-flex h-8 min-w-8 shrink-0 items-center justify-center rounded-md border px-1 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-950 disabled:cursor-not-allowed disabled:opacity-40 sm:h-9 sm:min-w-9 sm:text-sm";

const idleButton =
  "border-blue-100/20 bg-blue-950/35 text-blue-50 hover:border-yellow-200/60 hover:text-yellow-200 disabled:hover:border-blue-100/20 disabled:hover:text-blue-50";

const activeButton = "border-yellow-300 bg-yellow-300 text-blue-950";

export default function VotingPagination({
  currentPage,
  totalPages,
  onPageChange,
}: VotingPaginationProps) {
  if (totalPages <= 1) return null;

  const items = getPageItems(currentPage, totalPages);

  return (
    <nav
      aria-label="Navigasi halaman hasil voting"
      className="relative mt-3 flex min-w-0 flex-col items-center gap-2 sm:mt-4 sm:flex-row sm:justify-between"
    >
      <p className="text-[10px] leading-relaxed text-blue-100/60 sm:text-xs">
        Halaman {currentPage} dari {totalPages}
      </p>

      <div className="flex max-w-full items-center gap-1.5 overflow-x-auto overscroll-x-contain py-1">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
          className={`${baseButton} ${idleButton}`}
        >
          <ChevronLeft size={16} aria-hidden="true" />
        </button>

        {items.map((item) =>
          typeof item === "number" ? (
            <button
              key={item}
              type="button"
              onClick={() => onPageChange(item)}
              aria-label={`Halaman ${item}`}
              aria-current={item === currentPage ? "page" : undefined}
              className={`${baseButton} ${
                item === currentPage ? activeButton : idleButton
              }`}
            >
              {item}
            </button>
          ) : (
            <span
              key={item}
              aria-hidden="true"
              className="px-1 text-xs text-blue-100/50 sm:text-sm"
            >
              …
            </span>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Halaman berikutnya"
          className={`${baseButton} ${idleButton}`}
        >
          <ChevronRight size={16} aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
