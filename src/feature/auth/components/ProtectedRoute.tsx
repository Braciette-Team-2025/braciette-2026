"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/authStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export function ProtectedRoute({
  children,
  allowedRoles,
}: ProtectedRouteProps) {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated || !user) {
      router.replace("/login/ormawa");
      return;
    }

    if (
      allowedRoles &&
      allowedRoles.length > 0 &&
      !allowedRoles.some(
        (role) => role.toLowerCase() === user.role.toLowerCase(),
      )
    ) {
      if (user.role.toLowerCase() === "admin") {
        router.replace("/admin/submission");
      } else {
        router.replace("/profile");
      }
    }
  }, [isInitialized, isAuthenticated, user, allowedRoles, router]);

  if (!isInitialized || !isAuthenticated || !user) {
    return null;
  }

  if (
    allowedRoles &&
    allowedRoles.length > 0 &&
    !allowedRoles.some((role) => role.toLowerCase() === user.role.toLowerCase())
  ) {
    return null;
  }

  return <>{children}</>;
}
