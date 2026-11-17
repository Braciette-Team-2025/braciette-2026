"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import type { NavigationItem } from "./types/navigation";

export interface MobileDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: NavigationItem[];
  activeId?: string;
  loginHref?: string;
}

export function MobileDrawer({
  open,
  onOpenChange,
  items,
  activeId,
}: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-l border-yellow-500/30 bg-blue-800 px-6 text-yellow-500"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-yellow-500">Menu</SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Navigasi mobile"
          className="mt-6 flex flex-col gap-5 px-6"
        >
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onOpenChange(false)}
              aria-current={item.id === activeId ? "page" : undefined}
              className={
                item.id === activeId
                  ? "text-lg body-medium text-yellow-500"
                  : "text-lg body-medium text-yellow-500/80"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
