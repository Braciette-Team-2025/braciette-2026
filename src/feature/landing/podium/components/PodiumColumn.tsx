import type { PodiumEntry } from "../types/podium.types";

interface PodiumColumnProps {
  entry: PodiumEntry;
  /** rasio tinggi bar terhadap --podium-stage-h */
  heightRatio: number;
}

/**
 * Satu kolom podium: nama organisasi di atas, bar dengan angka vote di dalam.
 * Angka akhir sudah ada di markup (SSR / reduced-motion); GSAP menghitung
 * naik dari 0 lewat atribut data-count-to.
 */
export function PodiumColumn({ entry, heightRatio }: PodiumColumnProps) {
  return (
    <li
      data-podium-column
      data-rank={entry.rank}
      className="flex min-w-0 flex-col items-center justify-end"
    >
      <span className="sr-only">Peringkat {entry.rank}</span>

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
        className="invisible relative flex w-[var(--podium-bar-w)] justify-center rounded-t-[clamp(0.6rem,1.4cqw,1.5rem)] border border-b-0 border-[rgb(var(--podium-glow)/0.4)] bg-[linear-gradient(to_bottom,rgb(var(--podium-glow)/0.34),rgb(var(--podium-glow)/0.1)_55%,rgb(var(--podium-glow)/0.03))] shadow-[0_-8px_44px_rgb(var(--podium-glow)/0.35),inset_0_1px_0_rgb(255_255_255/0.28)] backdrop-blur-sm will-change-transform"
      >
        <span
          data-podium-count
          data-count-to={entry.votes}
          className="mt-[0.45em] font-the-seasons text-[length:var(--podium-count-size)] tabular-nums leading-none text-[color:var(--podium-ivory)] [text-shadow:0_0_16px_rgb(var(--podium-glow)/0.7)]"
        >
          {entry.votes}
        </span>
      </div>
    </li>
  );
}
