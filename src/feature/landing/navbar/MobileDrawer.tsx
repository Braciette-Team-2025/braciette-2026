"use client";

import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/src/feature/auth/store/authStore";
import { getInitials } from "@/src/feature/auth/utils/getInitial";

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
  loginHref = "/login",
}: MobileDrawerProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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

        <div className="mt-8 px-6">
          {!isAuthenticated || !user ? (
            <Button
              asChild
              onClick={() => onOpenChange(false)}
              className="w-full rounded-full bg-yellow-500 px-6 body-medium text-blue-900 hover:bg-yellow-600"
            >
              <Link href={loginHref}>Login</Link>
            </Button>
          ) : (
            <Link
              href="/profile"
              onClick={() => onOpenChange(false)}
              className="flex w-full items-center gap-3 rounded-full bg-yellow-500 px-4 py-3 text-blue-900"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-900 font-bold text-yellow-500">
                {getInitials(user.name)}
              </div>

              <div className="min-w-0">
                <p className="truncate font-semibold">{user.name}</p>

                <p className="truncate text-sm opacity-70">{user.email}</p>
              </div>
            </Link>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
