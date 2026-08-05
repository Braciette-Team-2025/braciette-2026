"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfilePageHeaderProps {
  title: string;
  subtitle?: string;
  backHref?: string;
  onBack?: () => void;
  className?: string;
}

export function ProfilePageHeader({
  title,
  subtitle,
  backHref,
  onBack,
  className,
}: ProfilePageHeaderProps) {
  return (
    <div className={cn("flex items-start gap-3 md:gap-4", className)}>
      {backHref ? (
        <Link
          href={backHref}
          aria-label="Kembali"
          className="mt-3 flex h-7 w-7 shrink-0 items-center justify-center text-blue-900 transition hover:opacity-70 cursor-pointer md:h-8 md:w-8"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className="mt-3 flex h-7 w-7 shrink-0 items-center justify-center text-blue-900 transition hover:opacity-70 cursor-pointer md:h-8 md:w-8"
        >
          <ChevronLeft className="h-6 w-6 md:h-7 md:w-7" strokeWidth={2.5} />
        </button>
      )}

      <div>
        <h1 className="font-heading text-xl font-bold text-blue-900 md:text-2xl">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm font-medium text-blue-900/70 md:text-sm">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
