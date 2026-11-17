"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PODIUM_LOGOS } from "../constants/podium.content";
import { PODIUM_CSS_VARS } from "../constants/podium.tokens";
import { usePodiumAnimation } from "../hooks/usePodiumAnimation";
import type { PodiumEntry, PodiumLogo } from "../types/podium.types";
import { PodiumBackdrop } from "./PodiumBackdrop";
import { PodiumBoard } from "./PodiumBoard";
import { PodiumHeader } from "./PodiumHeader";
import { PodiumTitle } from "./PodiumTitle";

interface PodiumContainerProps {
  /** teks kategori pada judul, mis. "BEM" */
  categoryLabel: string;
  /** 3 besar; urutan bebas (dibaca dari field rank) */
  entries: PodiumEntry[];
  logos?: PodiumLogo[];
  className?: string;
  /**
   * Mode tanam di landing page: latar transparan (memakai background landing),
   * tanpa starfield sendiri, badge peringkat tampil, dan animasi menunggu
   * section terlihat saat di-scroll.
   */
  embedded?: boolean;
  /** konten di atas header (mis. tab kategori); hanya tampil di mode embedded */
  topSlot?: ReactNode;
}

/**
 * Layar "Most Favorite" untuk satu kategori. Komponen ini tidak tahu
 * soal BEM/DPM/HIMA/UKM — cukup beri `categoryLabel` dan `entries`.
 */
export default function PodiumContainer({
  categoryLabel,
  entries,
  logos = PODIUM_LOGOS,
  className,
  embedded = false,
  topSlot,
}: PodiumContainerProps) {
  const rootRef = useRef<HTMLElement>(null);

  usePodiumAnimation(
    rootRef,
    `${categoryLabel}:${entries.map((entry) => entry.id).join(",")}`,
    { onScroll: embedded },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="podium-title"
      style={PODIUM_CSS_VARS as CSSProperties}
      className={cn(
        "relative isolate flex min-h-svh w-full flex-col items-center overflow-hidden text-[color:var(--podium-ivory)]",
        embedded
          ? // bar memudar halus ke bawah menuju leaderboard
            "bg-transparent [mask-image:linear-gradient(to_bottom,black_88%,transparent)]"
          : "bg-[color:var(--podium-bg)]",
        className,
      )}
    >
      <PodiumBackdrop embedded={embedded} />

      <div className="relative z-10 flex w-full max-w-[var(--podium-max-w)] flex-1 flex-col items-center px-[var(--podium-pad-x)] pt-[var(--podium-pad-top)]">
        {embedded ? topSlot : null}
        <PodiumHeader logos={logos} />
        <PodiumTitle categoryLabel={categoryLabel} />
        <PodiumBoard entries={entries} showBadge={embedded} />
      </div>
    </section>
  );
}
