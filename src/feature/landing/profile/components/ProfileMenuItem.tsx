"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProfileMenuItem as ProfileMenuItemType } from "../types/menu";

interface ProfileMenuItemProps {
  item: ProfileMenuItemType;
  className?: string;
}

export function ProfileMenuItem({ item, className }: ProfileMenuItemProps) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex w-full items-center justify-between rounded-xl bg-slate-100 px-5 py-4 text-blue-900 shadow-sm transition-colors duration-200 hover:bg-slate-200",
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-5 w-5" />
        <span className="font-heading text-md font-bold md:text-lg">
          {item.label}
        </span>
      </span>
      <ChevronRight className="h-5 w-5" />
    </Link>
  );
}
