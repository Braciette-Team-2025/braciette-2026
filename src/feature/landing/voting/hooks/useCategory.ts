"use client";

import { useCallback, useEffect, useState } from "react";
import { votingService } from "../services/voting.service";
import { Category } from "../types/category";

export function useCategory() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    votingService.getCategories().then((data) => {
      if (isMounted) {
        setCategories(data);
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const selectCategory = useCallback((category: Category) => {
    setSelectedCategory(category);
  }, []);

  const resetCategory = useCallback(() => {
    setSelectedCategory(null);
  }, []);

  return {
    categories,
    selectedCategory,
    isLoading,
    selectCategory,
    resetCategory,
  };
}
