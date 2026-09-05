"use client";

import { Category } from "../../types/category";
import { CategoryCard } from "./CategoryCard";

interface CategoryGridProps {
  categories: Category[];
  onSelect: (category: Category) => void;
  hasVotedByCategory: Record<string, boolean>;
}

export function CategoryGrid({
  categories,
  onSelect,
  hasVotedByCategory,
}: CategoryGridProps) {
  return (
    <div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onSelect={onSelect}
          disabled={hasVotedByCategory[category.code] ?? false}
        />
      ))}
    </div>
  );
}
