"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubmissionHeader() {
  const router = useRouter();

  return (
    <header className="w-full space-y-4 md:space-y-8 lg:space-y-12">
      <button
        onClick={() => router.back()}
        className="hover:opacity-80 transition-opacity focus:outline-none"
        aria-label="Kembali"
      >
        <ArrowLeft
          height={34}
          width={34}
          strokeWidth={2}
          className="text-yellow-300 cursor-pointer lg:scale-100 scale-80"
        />
      </button>
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-jakarta font-bold text-center text-yellow-300">
        Daftar Organisasi <span className="block sm:inline">Mahasiswa</span>
      </h1>
    </header>
  );
}
