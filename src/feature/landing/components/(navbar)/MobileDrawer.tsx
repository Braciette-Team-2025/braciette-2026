"use client";

import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { NavigationItem } from "../../types/navigation";

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
  loginHref = "/login",
}: MobileDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="border-l px-6 border-yellow-500/30 bg-blue-800 text-yellow-500"
      >
        <SheetHeader>
          <SheetTitle className="text-left text-yellow-500">Menu</SheetTitle>
        </SheetHeader>

        <nav
          aria-label="Navigasi mobile"
          className="px-6 mt-6 flex flex-col gap-5"
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

        <Button
          asChild
          onClick={() => onOpenChange(false)}
          className="px-6 mt-8 w-full rounded-full bg-yellow-500 body-medium text-blue-900 hover:bg-yellow-600"
        >
          <Link href={loginHref}>Login</Link>
        </Button>
      </SheetContent>
    </Sheet>
  );
}
