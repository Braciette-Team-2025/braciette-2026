"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/authStore";
import { setRouter } from "@/src/lib/router";

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const initialize = useAuthStore((state) => state.initialize);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    setRouter(router);
  }, [router]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!isInitialized) {
    return null;
  }

  return <>{children}</>;
}
