"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "../store/authStore";

interface GuestOnlyProps {
  children: React.ReactNode;
}

export function GuestOnly({ children }: GuestOnlyProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/profile");
    }
  }, [isInitialized, isAuthenticated, router]);

  if (isInitialized && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
