"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/authStore";

export default function LoginAuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const isInitialized = useAuthStore((state) => state.isInitialized);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

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
  }, [isAuthenticated, isInitialized, user, router]);

  if (isInitialized && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
