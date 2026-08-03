"use client";

import { ChevronRight, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoutButtonProps {
  onClick?: () => void;
  label?: string;
  className?: string;
}

export function LogoutButton({
  onClick,
  label = "Keluar",
  className,
}: LogoutButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex w-full items-center justify-between rounded-xl border border-yellow-500/60 bg-blue-700 px-5 py-4 text-white shadow-[0_0_16px_-6px_rgba(201,162,39,0.4)] transition-colors duration-200 hover:bg-blue-600",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <LogOut className="h-5 w-5" />
        <span className="font-heading text-sm font-bold md:text-base">
          {label}
        </span>
      </span>
      <ChevronRight className="h-5 w-5" />
    </button>
  );
}
