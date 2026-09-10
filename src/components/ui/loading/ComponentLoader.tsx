"use client";

import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";

type LoaderSize = "sm" | "md" | "lg";

interface ComponentLoaderProps {
  /** Teks opsional yang ditampilkan di bawah spinner */
  label?: string;
  /** Ukuran spinner */
  size?: LoaderSize;
  /** Tinggi minimum container loader */
  minHeight?: string;
  className?: string;
}

const spinnerSizeMap: Record<LoaderSize, "sm" | "md" | "lg"> = {
  sm: "sm",
  md: "md",
  lg: "lg",
};

/**
 * Generic loading wrapper untuk komponen apa pun (card, section, dll).
 * Tampilkan ini ketika sebuah komponen sedang menunggu data.
 *
 * @example
 * {isLoading ? <ComponentLoader label="Memuat data..." /> : <MyComponent />}
 */
export function ComponentLoader({
  label,
  size = "md",
  minHeight = "120px",
  className,
}: ComponentLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={label ?? "Memuat..."}
      style={{ minHeight }}
      className={cn(
        "flex flex-col items-center justify-center gap-3 w-full",
        className,
      )}
    >
      <LoadingSpinner size={spinnerSizeMap[size]} color="yellow" />
      {label && (
        <p className="text-sm text-yellow-500/80 font-medium animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
}
