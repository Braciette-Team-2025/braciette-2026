"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-8 flex items-center justify-center gap-3">
      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-9 w-9 rounded-lg bg-[#F3F3F3] hover:bg-[#E5E5E5]"
      >
        <ChevronLeft className="h-5 w-5 text-[#757575]" />
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant="ghost"
          onClick={() => onPageChange(page)}
          className={`h-9 w-9 rounded-lg font-medium transition
            ${
              currentPage === page
                ? "bg-[#D9D9D9] text-[#4B4B4B]"
                : "bg-[#F3F3F3] text-[#9B9B9B] hover:bg-[#E8E8E8]"
            }`}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="ghost"
        size="icon"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-9 w-9 rounded-lg bg-[#F3F3F3] hover:bg-[#E5E5E5]"
      >
        <ChevronRight className="h-5 w-5 text-[#757575]" />
      </Button>
    </div>
  );
}
