"use client";

import { LoadingSpinner } from "./LoadingSpinner";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface PageLoadingScreenProps {
  /** Kontrol visibilitas overlay */
  isVisible: boolean;
}

/**
 * Full-screen overlay loading yang muncul saat berpindah halaman.
 * Gunakan bersama NavigationLoadingProvider agar auto-trigger saat route change.
 */
export function PageLoadingScreen({ isVisible }: PageLoadingScreenProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Memuat halaman..."
      className={cn(
        // Base: full screen, high z-index
        "fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-6",
        // Background: glassmorphism dark
        "bg-blue-900/90 backdrop-blur-sm",
        // Transition
        "transition-opacity duration-300 ease-in-out",
        isVisible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none",
      )}
    >
      {/* Logo */}
      <div className="relative animate-pulse">
        <Image
          src="/images/logo/just_logo.svg"
          alt="Braciate Logo"
          width={64}
          height={64}
          priority
          className="drop-shadow-[0_0_12px_rgba(201,162,39,0.6)]"
        />
      </div>

      {/* Spinner */}
      <LoadingSpinner size="lg" color="yellow" />

      {/* Label */}
      <p className="text-yellow-400/90 text-sm font-medium font-jakarta tracking-widest uppercase animate-pulse">
        Memuat...
      </p>

      {/* Progress bar animasi */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
        <div
          className={cn(
            "h-full bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600",
            "animate-[page-progress_1.5s_ease-in-out_infinite]",
          )}
          style={{ width: "40%" }}
        />
      </div>
    </div>
  );
}
