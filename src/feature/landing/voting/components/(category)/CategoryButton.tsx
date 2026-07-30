"use client";

import { cn } from "@/lib/utils";
import { Category } from "../../types/category";

interface CategoryButtonProps {
  category: Category;
  onClick?: () => void;
  className?: string;
}

export function CategoryButton({
  category,
  onClick,
  className,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "mx-auto min-w-[150px] flex items-center justify-center rounded-xl border border-yellow-500/70 bg-blue-500/70 px-10 py-3 font-heading text-3xl md:text-4xl font-bold tracking-wide text-yellow-500 shadow-[0_0_16px_-6px_rgba(201,162,39,0.5)] transition-colors hover:border-yellow-400",
        className,
      )}
    >
      {category.code}
    </button>
  );
}
