"use client";

import { cn } from "@/lib/utils";

interface OrganizationScrollbarProps {
  thumbHeightPercent: number;
  thumbTopPercent: number;
  className?: string;
}

export function OrganizationScrollbar({
  thumbHeightPercent,
  thumbTopPercent,
  className,
}: OrganizationScrollbarProps) {
  if (thumbHeightPercent >= 100) return null;

  return (
    <div
      className={cn(
        "relative hidden h-full w-1.5 shrink-0 overflow-hidden rounded-full bg-white sm:block",
        className,
      )}
    >
      <div
        className="absolute left-0 w-full rounded-full bg-yellow-500 shadow-[0_0_8px_0_rgba(201,162,39,0.6)]"
        style={{
          height: `${thumbHeightPercent}%`,
          top: `${thumbTopPercent}%`,
        }}
      />
    </div>
  );
}
