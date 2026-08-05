"use client";

import { cn } from "@/lib/utils";

type ProfileStatus = "approved" | "pending" | "rejected";

interface ProfileStatusBadgeProps {
  status: ProfileStatus;
  className?: string;
}

const STATUS_CONFIG: Record<
  ProfileStatus,
  { label: string; className: string }
> = {
  approved: { label: "Disetujui", className: "bg-emerald-600" },
  pending: { label: "Menunggu", className: "bg-amber-500" },
  rejected: { label: "Ditolak", className: "bg-red-600" },
};

export function ProfileStatusBadge({
  status,
  className,
}: ProfileStatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium text-white",
        config.className,
        className,
      )}
    >
      {config.label}
      <span className="h-2 w-2 rounded-full bg-white" />
    </span>
  );
}
