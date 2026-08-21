"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";

import { useAuthStore } from "@/src/feature/auth/store/authStore";
import { getInitials } from "@/src/feature/auth/utils/getInitial";

export interface NavbarActionsProps {
  loginHref?: string;
}

export function NavbarActions({ loginHref = "/login" }: NavbarActionsProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    return (
      <div className="hidden md:block">
        <Button
          asChild
          className="h-12 rounded-[12px] bg-yellow-500 px-8 heading-bold text-xl text-blue-800 hover:bg-yellow-600"
        >
          <Link href={loginHref}>Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="hidden md:block">
      <Link
        href="/profile"
        aria-label={`Profile ${user.name}`}
        title={user.name}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 heading-bold text-xl text-blue-900 transition-transform hover:scale-105"
      >
        {getInitials(user.name)}
      </Link>
    </div>
  );
}
