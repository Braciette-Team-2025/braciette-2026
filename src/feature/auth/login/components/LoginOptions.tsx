"use client";

import Link from "next/link";
import Image from "next/image";
import { GoogleLogoIcon } from "@phosphor-icons/react";

export default function LoginOptions() {
  return (
    <div className="p-18 bg-blue-800 w-fit shadow-[0_0_40px_rgba(255,214,133,0.16)] rounded-3xl">
      <div className="flex flex-col gap-10 items-center justify-center">
        <div className="flex flex-col gap-10 items-center justify-center">
          <Image
            src="/images/logo/braciate-logo.svg"
            alt="Braciate Logo"
            width={120}
            height={120}
          />
          <h1 className="font-sloop text-8xl text-yellow-300 drop-shadow-[0_0_40px_rgba(218,161,17,1)]">
            S <span className="font-the-seasons text-6xl">elamat</span> D
            <span className="font-the-seasons text-6xl">atang</span>
          </h1>
          <p className="text-center text-xl text-blue-100 font-semibold">
            Silakan masuk terlebih dahulu
            <br />
            menggunakan akun Google Anda.
          </p>
        </div>
        <div className="flex flex-col gap-6 items-center justify-center text-yellow-200">
          <button className="flex items-center justify-center gap-3 text-center py-3 px-12 border-2 border-yellow-500 rounded-[8px]">
            <GoogleLogoIcon size={20} weight="bold" />
            <span className="font-semibold cursor-pointer">
              Login lewat Google
            </span>
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
      </div>
    </div>
  );
}
