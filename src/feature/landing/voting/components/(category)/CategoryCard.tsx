"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Category } from "../../types/category";

interface CategoryCardProps {
  category: Category;
  onSelect: (category: Category) => void;
  disabled?: boolean;
  className?: string;
}

export function CategoryCard({
  category,
  onSelect,
  disabled = false,
  className,
}: CategoryCardProps) {
  const handleSelect = () => {
    if (disabled) {
      return;
    }

    onSelect(category);
  };

  return (
    <Card
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleSelect}
      onKeyDown={(event) => {
        if (disabled) {
          return;
        }

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(category);
        }
      }}
      className={cn(
        "group relative flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-xl border px-6 py-8 text-center transition-all duration-300",
        disabled
          ? "cursor-not-allowed border-gray-500/40 bg-gray-700/40 opacity-50 shadow-none"
          : [
              "cursor-pointer border-yellow-500/60 bg-blue-700/60",
              "shadow-[0_0_30px_-6px_rgba(201,162,10,0.45)]",
              "hover:-translate-y-0.5 hover:border-yellow-400",
              "hover:shadow-[0_0_28px_-4px_rgba(201,162,39,0.7)]",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-yellow-400 focus-visible:ring-offset-2",
              "focus-visible:ring-offset-blue-900",
            ],
        className,
      )}
    >
      <span
        className={cn(
          "font-heading text-2xl font-bold tracking-wide md:text-4xl",
          disabled ? "text-gray-400" : "text-yellow-500",
        )}
      >
        {category.code}
      </span>

      <span
        className={cn(
          "whitespace-pre-line text-sm font-medium md:text-base",
          disabled ? "text-gray-400" : "text-yellow-100/90",
        )}
      >
        {category.description}
      </span>

      {disabled && (
        <span className="mt-1 text-xs font-semibold text-gray-400">
          Sudah memilih
        </span>
      )}
    </Card>
  );
}
