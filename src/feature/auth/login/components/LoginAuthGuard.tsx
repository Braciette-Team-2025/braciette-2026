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

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/profile");
    }
  }, [isAuthenticated, isInitialized, router]);

  if (isInitialized && isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
