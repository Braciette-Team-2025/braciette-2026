"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

interface ReactQueryProviderProps {
  children: React.ReactNode;
}

/**
 * Wrapper QueryClientProvider untuk Next.js App Router.
 *
 * QueryClient di-instantiate dengan useState agar setiap render
 * di server tidak berbagi instance yang sama (best practice SSR).
 */
export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Tidak retry otomatis saat error — biarkan user trigger manual
            retry: 1,
            // Data dianggap stale setelah 30 detik
            staleTime: 30 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
