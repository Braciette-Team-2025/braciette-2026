"use client";

import { useRef, type CSSProperties } from "react";
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
}: PodiumContainerProps) {
  const rootRef = useRef<HTMLElement>(null);

  usePodiumAnimation(
    rootRef,
    `${categoryLabel}:${entries.map((entry) => entry.id).join(",")}`,
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby="podium-title"
      style={PODIUM_CSS_VARS as CSSProperties}
      className={cn(
        "relative isolate flex min-h-svh w-full flex-col items-center overflow-hidden bg-[color:var(--podium-bg)] text-[color:var(--podium-ivory)]",
        className,
      )}
    >
      <PodiumBackdrop />

      <div className="relative z-10 flex w-full max-w-[var(--podium-max-w)] flex-1 flex-col items-center px-[var(--podium-pad-x)] pt-[var(--podium-pad-top)]">
        <PodiumHeader logos={logos} />
        <PodiumTitle categoryLabel={categoryLabel} />
        <PodiumBoard entries={entries} />
      </div>
    </section>
  );
}
