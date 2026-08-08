"use client";

import Link from "next/link";
import { GoogleLogoIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

export default function LoginOptions() {
  return (
    <div className="flex flex-col gap-3 md:gap-6 items-center justify-center text-yellow-200 w-full">
      <button
        className={cn(
          // Mobile (Base)
          "flex items-center justify-center gap-3 text-center py-3 px-6 border-2 border-yellow-500 rounded-[8px] w-fit transition-colors hover:bg-yellow-500/10",
          // Tablet (md)
          "md:px-12",
          // Desktop (lg)
          "lg:px-12",
        )}
      >
        <GoogleLogoIcon size={20} weight="bold" />
        <span
          className={cn(
            // Mobile (Base)
            "font-semibold cursor-pointer text-sm",
            // Tablet (md)
            "md:text-md",
            // Desktop (lg)
            "lg:text-md",
          )}
        >
          Login lewat Google
        </span>
      </button>
      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-yellow-200 opacity-50"></div>
        <p
          className={cn(
            // Mobile (Base)
            "font-semibold text-xs",
            // Tablet (md)
            "md:text-md",
            // Desktop (lg)
            "lg:text-md",
          )}
        >
          ATAU
        </p>
        <div className="flex-1 h-px bg-yellow-200 opacity-50"></div>
      </div>
      <Link href={"/login/ormawa"}>
        <p
          className={cn(
            // Mobile (Base)
            "text-sm underline font-semibold hover:text-yellow-300 transition-colors",
            // Tablet (md)
            "md:text-md",
            // Desktop (lg)
            "lg:text-md",
          )}
        >
          Login menggunakan akun Ormawa
        </p>
      </Link>
    </div>
  );
}
