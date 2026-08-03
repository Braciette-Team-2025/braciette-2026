"use client";

import { cn } from "@/lib/utils";
import { ProfileMenuItem as ProfileMenuItemType } from "../types/menu";
import { ProfileMenuItem } from "./ProfileMenuItem";

interface ProfileMenuProps {
  items: ProfileMenuItemType[];
  className?: string;
}

export function ProfileMenu({ items, className }: ProfileMenuProps) {
  return (
    <div className={cn("flex w-full flex-col gap-4", className)}>
      {items.map((item) => (
        <ProfileMenuItem key={item.id} item={item} />
      ))}
    </div>
  );
}
