"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { PageLoadingScreen } from "@/src/components/ui/loading/PageLoadingScreen";

// ─── Context ───────────────────────────────────────────────────────────────

interface NavigationLoadingContextValue {
  /** Mulai loading secara manual (misal: setelah klik link programatik) */
  startLoading: () => void;
  /** Hentikan loading secara manual */
  stopLoading: () => void;
  isLoading: boolean;
}

const NavigationLoadingContext =
  createContext<NavigationLoadingContextValue | null>(null);

// ─── Hook ──────────────────────────────────────────────────────────────────

/**
 * Hook untuk mengontrol page loading secara manual dari dalam komponen.
 *
 * @example
 * const { startLoading } = usePageLoading();
 *
 * const handleNavigate = () => {
 *   startLoading();
 *   router.push("/some-page");
 * };
 */
export function usePageLoading(): NavigationLoadingContextValue {
  const ctx = useContext(NavigationLoadingContext);
  if (!ctx) {
    throw new Error(
      "usePageLoading harus digunakan di dalam NavigationLoadingProvider",
    );
  }
  return ctx;
}

// ─── Provider ──────────────────────────────────────────────────────────────

interface NavigationLoadingProviderProps {
  children: ReactNode;
}

/**
 * Provider yang menampilkan `PageLoadingScreen` secara otomatis saat:
 * 1. Pathname berubah (navigasi ke halaman lain)
 * 2. `startLoading()` dipanggil secara manual
 *
 * Pasang sekali di root layout, di dalam ReactQueryProvider.
 */
export function NavigationLoadingProvider({
  children,
}: NavigationLoadingProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Ref untuk menyimpan pathname sebelumnya
  const prevPathRef = useRef(pathname);
  // Timeout ref agar tidak ada multiple timers berjalan
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsLoading(false);
  }, []);

  // Deteksi perubahan pathname → route change selesai → matikan loading
  useEffect(() => {
    const currentPath = pathname + searchParams.toString();
    const prevPath = prevPathRef.current;

    if (prevPath !== currentPath) {
      // Pathname sudah berubah → navigasi selesai, matikan loading
      prevPathRef.current = currentPath;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Sedikit delay agar konten sempat di-render dulu sebelum overlay hilang
      timeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 200);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [pathname, searchParams]);

  return (
    <NavigationLoadingContext.Provider
      value={{ startLoading, stopLoading, isLoading }}
    >
      <PageLoadingScreen isVisible={isLoading} />
      {children}
    </NavigationLoadingContext.Provider>
  );
}
