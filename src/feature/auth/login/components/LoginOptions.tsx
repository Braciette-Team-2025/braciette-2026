"use client";

import Link from "next/link";
import { GoogleLogoIcon } from "@phosphor-icons/react";

export default function LoginOptions() {
  return (
    <div className="flex flex-col gap-6 items-center justify-center text-yellow-200">
      <button className="flex items-center justify-center gap-3 text-center py-3 px-12 border-2 border-yellow-500 rounded-[8px]">
        <GoogleLogoIcon size={20} weight="bold" />
        <span className="font-semibold cursor-pointer">Login lewat Google</span>
      </button>
      <div className="flex items-center w-full gap-4">
        <div className="flex-1 h-px bg-yellow-200 opacity-50 w-32.25"></div>
        <p className="font-semibold text-md">ATAU</p>
        <div className="flex-1 h-px bg-yellow-200 opacity-50 w-32.25"></div>
      </div>
      <Link href={"/login/ormawa"}>
        <p className="text-md underline font-semibold">
          Login menggunakan akun Ormawa
        </p>
      </Link>
    </div>
  );
}
