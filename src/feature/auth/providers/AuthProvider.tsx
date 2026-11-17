"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { setRouter } from "@/src/lib/router";

interface AuthProviderProps {
  children: React.ReactNode;
}

/**
 * Event sudah selesai dan backend dinonaktifkan, jadi tidak ada lagi
 * inisialisasi sesi (refresh token / auth me). Provider ini hanya
 * mendaftarkan router dan langsung merender children.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();

  useEffect(() => {
    setRouter(router);
  }, [router]);

  return <>{children}</>;
}
