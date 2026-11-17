import { useId } from "react";

interface FilmStripProps {
  className?: string;
  /** jumlah frame gelap di dalam strip */
  frames?: number;
}

const WIDTH = 1400;
const HEIGHT = 280;
const HOLE_PITCH = 44;

/**
 * Strip film emas (perangko) sebagai SVG inline: ringan, tajam di semua
 * ukuran layar, dan warnanya bisa diubah lewat satu tempat.
 */
export function FilmStrip({ className, frames = 6 }: FilmStripProps) {
  const uid = useId().replace(/:/g, "");
  const bandId = `${uid}-band`;
  const frameId = `${uid}-frame`;

  const holeCount = Math.floor((WIDTH - 40) / HOLE_PITCH);
  const frameWidth = (WIDTH - 80) / frames;

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={bandId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f8df94" />
          <stop offset="0.5" stopColor="#c9962a" />
          <stop offset="1" stopColor="#8f6514" />
        </linearGradient>
        <linearGradient id={frameId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2c200c" />
          <stop offset="1" stopColor="#120e07" />
        </linearGradient>
      </defs>

      <rect width={WIDTH} height={HEIGHT} rx="18" fill={`url(#${bandId})`} />

      {Array.from({ length: holeCount }, (_, i) => (
        <g key={i}>
          <rect
            x={26 + i * HOLE_PITCH}
            y={16}
            width={24}
            height={16}
            rx={4}
            fill="#1a1206"
          />
          <rect
            x={26 + i * HOLE_PITCH}
            y={HEIGHT - 32}
            width={24}
            height={16}
            rx={4}
            fill="#1a1206"
          />
        </g>
      ))}

      {Array.from({ length: frames }, (_, i) => (
        <rect
          key={i}
          x={40 + i * frameWidth + 8}
          y={56}
          width={frameWidth - 16}
          height={HEIGHT - 112}
          rx={10}
          fill={`url(#${frameId})`}
          stroke="#f3cf6e"
          strokeOpacity={0.55}
          strokeWidth={3}
        />
      ))}
    </svg>
  );
}
