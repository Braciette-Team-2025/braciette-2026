"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Category } from "../../types/category";

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  className?: string;
}

export function CategoryCard({
  category,
  onSelect,
  className,
}: CategoryCardProps) {
  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={() => onSelect(category)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(category);
        }
      }}
      className={cn(
        "group relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-yellow-500/60 bg-blue-700/60 px-6 py-8 text-center transition-all duration-300",
        "shadow-[0_0_30px_-6px_rgba(201,162,10,0.45)] hover:-translate-y-0.5 hover:border-yellow-400 hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-900",
        className,
      )}
    >
      <span className="font-heading text-2xl font-bold tracking-wide text-yellow-500 md:text-4xl">
        {category.code}
      </span>
      <span className="whitespace-pre-line text-sm font-medium text-yellow-100/90 md:text-base">
        {category.description}
      </span>
    </Card>
  );
}
