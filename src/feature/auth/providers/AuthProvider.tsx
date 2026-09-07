"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

import { useAuthStore } from "../store/authStore";
import { setRouter } from "@/src/lib/router";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const initialize = useAuthStore((state) => state.initialize);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    setRouter(router);
  }, [router]);

  useEffect(() => {
    if (pathname === "/oauth/callback") return;

    initialize();
  }, [initialize, pathname]);

  if (!isInitialized && pathname !== "/oauth/callback") {
    return null;
  }

  return <>{children}</>;
}
