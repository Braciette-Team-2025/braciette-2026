import React, { RefObject } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ============================================================
// KENAPA TIAP NOTE PUNYA DUA DIV
// Div LUAR memegang posisi dan skala responsif (md:scale-60, xl:scale-100)
// — murni CSS, tidak pernah disentuh GSAP.
// Div DALAM yang dianimasikan.
//
// Kalau digabung jadi satu, GSAP dan Tailwind akan menulis ke properti
// `transform` yang sama. Begitu GSAP menyetel scale atau rotate, seluruh
// transform dari class hilang — termasuk skala responsifnya, sehingga note
// tiba-tiba tampil seukuran penuh di tablet.
//
// Rotasi juga pindah dari class ke data-note-rotate supaya hook tahu titik
// istirahatnya dan bisa berayun di sekitar angka itu, bukan dari nol.
// ============================================================

export default function FloatingNotesWrapper({
  children,
  containerRef,
}: {
  children: React.ReactNode;
  containerRef?: RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={containerRef} className="relative">
      <div
        className={cn(
          // Mobile (Base)
          "absolute hidden",
          // Tablet
          "md:block md:scale-60 opacity-80 md:-top-20 md:left-0",
          // Desktop
          "xl:scale-100 xl:-top-20 xl:left-20",
        )}
      >
        <div
          data-guide-note
          data-note-rotate="0"
          className="will-change-transform"
        >
          <Image
            src="/images/block_notes/block_3.svg"
            alt="Music Note 3"
            width={250}
            height={250}
          />
        </div>
      </div>

      <div
        className={cn(
          // Mobile (Base)
          "absolute hidden",
          // Tablet
          "md:block md:scale-60 opacity-80 md:-top-0 md:right-10",
          // Desktop
          "xl:scale-100 xl:-top-0 xl:right-30",
        )}
      >
        <div
          data-guide-note
          data-note-rotate="30"
          className="will-change-transform"
        >
          <Image
            src="/images/block_notes/block_1.svg"
            alt="Music Note 1"
            width={118}
            height={187}
          />
        </div>
      </div>

      {children}
    </div>
  );
}
