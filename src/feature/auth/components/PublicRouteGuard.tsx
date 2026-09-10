"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

interface PublicRouteGuardProps {
  children: React.ReactNode;
}

/**
 * Guard untuk halaman public (landing area).
 * - Guest (belum login) → boleh masuk.
 * - User                → boleh masuk.
 * - Admin               → redirect ke /admin/submission.
 * - Ormawa              → redirect ke /ormawa.
 */
export function PublicRouteGuard({ children }: PublicRouteGuardProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized || !isAuthenticated || !user) return;

    const role = user.role.toLowerCase();
    if (role === "admin") {
      router.replace("/admin/submission");
    } else if (role === "ormawa") {
      router.replace("/ormawa");
    }
  }, [isInitialized, isAuthenticated, user, router]);

  if (isInitialized && isAuthenticated && user) {
    const role = user.role.toLowerCase();
    if (role === "admin" || role === "ormawa") {
      return null;
    }
  }

  return <>{children}</>;
}
