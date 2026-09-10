"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/src/feature/auth/store/authStore";

export default function LoginOptions() {
  const router = useRouter();
  const loginGoogle = useAuthStore((s) => s.loginGoogle);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGoogleLogin() {
    setIsLoading(true);
    setError(null);

    try {
      await loginGoogle();
      router.replace("/");
    } catch (err: unknown) {
      console.error("Google login failed:", err);

      const msg =
        err instanceof Error ? err.message : "Login Google gagal. Coba lagi.";

      if (msg.includes("popup-closed") || msg.includes("cancelled")) {
        setError(null);
      } else {
        setError("Login Google gagal. Pastikan menggunakan email UB.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-3 md:gap-4 items-center justify-center text-yellow-200 w-full">
      <button
        className={cn(
          "flex items-center justify-center gap-3 text-center py-3 px-6 border-2 border-yellow-500 rounded-[8px] w-fit transition-colors hover:bg-yellow-500/10 disabled:opacity-60 disabled:cursor-not-allowed",
          "md:px-12",
          "lg:px-12",
        )}
        onClick={handleGoogleLogin}
        disabled={isLoading}
        id="btn-google-login"
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
        ) : (
          <GoogleLogoIcon size={20} weight="bold" />
        )}
        <span
          className={cn(
            "font-semibold cursor-pointer text-sm",
            "md:text-md",
            "lg:text-md",
          )}
        >
          {isLoading ? "Menghubungkan..." : "Login lewat Google"}
        </span>
      </button>

      {error && (
        <p className="text-red-400 text-xs text-center max-w-xs">{error}</p>
      )}

      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-yellow-200 opacity-50"></div>
        <p className={cn("font-semibold text-xs", "md:text-md", "lg:text-md")}>
          ATAU
        </p>
        <div className="flex-1 h-px bg-yellow-200 opacity-50"></div>
      </div>
      <Link href={"/login/ormawa"}>
        <p
          className={cn(
            "text-sm underline font-semibold hover:text-yellow-300 transition-colors",
            "md:text-md",
            "lg:text-md",
          )}
        >
          Login menggunakan akun Ormawa
        </p>
      </Link>
    </div>
  );
}
