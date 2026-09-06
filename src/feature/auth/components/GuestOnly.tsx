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

  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      if (user?.role === "Admin") {
        router.replace("/admin/submission");
      } else if (user?.role === "Ormawa") {
        router.replace("/ormawa");
      } else {
        router.replace("/profile");
      }
    }
  }, [isInitialized, isAuthenticated, user, router]);

  if (isInitialized && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
