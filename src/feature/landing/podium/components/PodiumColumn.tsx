import { cn } from "@/lib/utils";
import type { PodiumEntry, PodiumRank } from "../types/podium.types";

interface PodiumColumnProps {
  entry: PodiumEntry;
  /** rasio tinggi bar terhadap --podium-stage-h */
  heightRatio: number;
  /** tampilkan badge peringkat di atas nama (dipakai di landing) */
  showBadge?: boolean;
}

/** Badge memakai palet landing: emas, silver (blue-100), perunggu (yellow-700). */
const BADGE_STYLE: Record<PodiumRank, string> = {
  1: "bg-yellow-300 text-blue-950 shadow-[0_0_26px_rgba(218,161,17,0.85)] size-[clamp(2.25rem,4.2cqw,3.5rem)] text-[length:clamp(1.1rem,2.1cqw,1.75rem)]",
  2: "bg-blue-100 text-blue-900 shadow-[0_0_20px_rgba(178,180,198,0.55)] size-[clamp(1.9rem,3.3cqw,2.9rem)] text-[length:clamp(0.95rem,1.7cqw,1.45rem)]",
  3: "bg-yellow-700 text-yellow-50 shadow-[0_0_20px_rgba(143,115,28,0.7)] size-[clamp(1.9rem,3.3cqw,2.9rem)] text-[length:clamp(0.95rem,1.7cqw,1.45rem)]",
};

/**
 * Satu kolom podium: (badge) + nama organisasi di atas, bar dengan angka vote
 * di dalam. Angka akhir sudah ada di markup (SSR / reduced-motion); GSAP
 * menghitung naik dari 0 lewat atribut data-count-to.
 */
export function PodiumColumn({
  entry,
  heightRatio,
  showBadge = false,
}: PodiumColumnProps) {
  return (
    <li
      data-podium-column
      data-rank={entry.rank}
      className="flex min-w-0 flex-col items-center justify-end"
    >
      <span className="sr-only">Peringkat {entry.rank}</span>

      {showBadge ? (
        <span
          data-podium-badge
          aria-hidden="true"
          className={cn(
            "invisible mb-[clamp(0.4rem,1.2cqw,1rem)] inline-flex items-center justify-center rounded-full font-jakarta font-extrabold leading-none",
            BADGE_STYLE[entry.rank],
          )}
        >
          {entry.rank}
        </span>
      ) : null}

      <h2
        data-podium-name
        className="invisible mb-[var(--podium-name-gap)] max-w-full px-[0.1em] text-center font-the-seasons text-[length:var(--podium-name-size)] font-bold italic leading-[1.08] text-balance break-words text-[color:var(--podium-ivory)] [text-shadow:0_0_22px_rgb(var(--podium-glow)/0.85),0_0_44px_rgb(var(--podium-glow)/0.45)]"
      >
        {entry.name}
      </h2>

      <div
        data-podium-bar
        style={{
          height: `calc(var(--podium-stage-h) * ${heightRatio} + var(--podium-bleed))`,
        }}
        className="invisible relative flex w-[var(--podium-bar-w)] justify-center overflow-hidden rounded-t-[clamp(0.6rem,1.4cqw,1.5rem)] border border-b-0 border-[rgb(var(--podium-glow)/0.4)] bg-[linear-gradient(to_bottom,rgb(var(--podium-glow)/0.34),rgb(var(--podium-glow)/0.1)_55%,rgb(var(--podium-glow)/0.03))] shadow-[0_-8px_44px_rgb(var(--podium-glow)/0.35),inset_0_1px_0_rgb(255_255_255/0.28)] backdrop-blur-sm will-change-transform"
      >
        {/* Kilau cahaya yang menyapu bar secara berkala */}
        <span
          data-podium-shine
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[45%] bg-[linear-gradient(105deg,transparent_0%,rgb(255_255_255/0.2)_50%,transparent_100%)] opacity-0"
        />

        <span
          data-podium-count
          data-count-to={entry.votes}
          className="relative mt-[0.45em] font-playfair text-[length:var(--podium-count-size)] tabular-nums leading-none text-[color:var(--podium-ivory)] [text-shadow:0_0_16px_rgb(var(--podium-glow)/0.7)]"
        >
          {entry.votes}
        </span>
      </div>
    </li>
  );
}
