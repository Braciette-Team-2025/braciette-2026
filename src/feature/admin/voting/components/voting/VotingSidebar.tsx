"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { VotingCategory, VotingCategoryId } from "../../types/voting";

export interface VotingSidebarProps {
  categories: VotingCategory[];
  activeCategoryId: VotingCategoryId;
  onSelect: (id: VotingCategoryId) => void;
  className?: string;
}

export function VotingSidebar({
  categories,
  activeCategoryId,
  onSelect,
  className,
}: VotingSidebarProps) {
  return (
    <nav
      aria-label="Filter kategori voting"
      className={cn(
        "flex gap-2 overflow-x-auto pb-1",
        "lg:w-48 lg:shrink-0 lg:flex-col lg:overflow-visible lg:pb-0",
        className,
      )}
    >
      {categories.map((category) => {
        const isActive = category.id === activeCategoryId;
        return (
          <Button
            key={category.id}
            type="button"
            variant="outline"
            onClick={() => onSelect(category.id)}
            aria-pressed={isActive}
            className={cn(
              "shrink-0 justify-start rounded-xl font-bold border-2 transition-colors",
              isActive
                ? "bg-yellow-500 text-yellow-50 border-yellow-500 hover:bg-yellow-400 hover:text-yellow-50 hover:border-yellow-400"
                : "bg-yellow-100 text-blue-900 border-yellow-500 hover:bg-yellow-200 hover:text-blue-900",
              "lg:w-full",
            )}
          >
            {category.label}
          </Button>
        );
      })}
    </nav>
  );
}
