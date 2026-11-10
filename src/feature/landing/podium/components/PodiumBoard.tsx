import {
  PODIUM_COLUMN_ORDER,
  PODIUM_RANK_HEIGHT,
} from "../constants/podium.tokens";
import type { PodiumEntry } from "../types/podium.types";
import { PodiumColumn } from "./PodiumColumn";

/**
 * Susunan podium kiri -> kanan: juara 2, 1, 3.
 * Wrapper menjadi container query (cqw) sehingga ukuran nama & angka
 * mengikuti lebar podium, bukan lebar layar.
 */
export function PodiumBoard({ entries }: { entries: PodiumEntry[] }) {
  const ordered = PODIUM_COLUMN_ORDER.flatMap((rank) => {
    const entry = entries.find((item) => item.rank === rank);
    return entry ? [entry] : [];
  });

  return (
    <div className="mt-auto w-full pt-[calc(var(--podium-title-sm)*0.6)] [container-type:inline-size]">
      <ol
        aria-labelledby="podium-title"
        className="mx-auto mb-[calc(var(--podium-bleed)*-1)] grid w-full max-w-[88rem] grid-cols-3 items-end gap-x-[var(--podium-gap)]"
      >
        {ordered.map((entry) => (
          <PodiumColumn
            key={entry.id}
            entry={entry}
            heightRatio={PODIUM_RANK_HEIGHT[entry.rank]}
          />
        ))}
      </ol>
    </div>
  );
}
