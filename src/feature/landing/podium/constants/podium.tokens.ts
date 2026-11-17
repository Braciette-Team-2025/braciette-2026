import type { PodiumRank } from "../types/podium.types";

/**
 * DESIGN TOKENS — Podium
 * ------------------------------------------------------------------
 * Semua angka visual (warna, ukuran fluid, jarak) hidup di sini dan
 * dipasang sekali di root sebagai CSS variable. Komponen hanya membaca
 * `var(--podium-*)`, sehingga mengubah tampilan cukup dari satu file.
 *
 * Ukuran fluid memakai clamp():
 *  - `vw` / `svh`  -> mengikuti viewport (lebar layar, tinggi layar HP)
 *  - `cqw`         -> mengikuti lebar area podium (container query),
 *                     jadi nama & angka selalu muat di kolomnya
 * Hasilnya satu set aturan untuk Android, tablet, dan laptop tanpa
 * puluhan breakpoint.
 */
export const PODIUM_CSS_VARS = {
  // Color
  "--podium-bg": "#05060b",
  "--podium-ivory": "var(--yellow-50)",
  "--podium-gold": "var(--yellow-300)",
  "--podium-glow": "218 161 17", // channel RGB: rgb(var(--podium-glow) / alpha)

  // Layout
  "--podium-max-w": "100rem",
  "--podium-pad-x": "clamp(0.75rem, 4vw, 4rem)",
  "--podium-pad-top": "clamp(1rem, 3.5svh, 3rem)",
  "--podium-stage-h": "clamp(9rem, 44svh, 34rem)",
  "--podium-bleed": "6rem",

  // Typography (fluid)
  "--podium-brand-size": "clamp(0.95rem, min(2.6vw, 3.4svh), 1.9rem)",
  "--podium-logo-size": "clamp(1.75rem, min(5vw, 6.5svh), 3.5rem)",
  "--podium-title-sm": "clamp(2rem, min(6.4vw, 9svh), 4.75rem)",
  "--podium-title-lg": "clamp(3.25rem, min(11vw, 17svh), 9rem)",
  "--podium-name-size": "clamp(0.85rem, 3.9cqw, 2.9rem)",
  "--podium-count-size": "clamp(1.15rem, 5.2cqw, 3.6rem)",

  // Podium spacing (relatif lebar podium)
  "--podium-gap": "clamp(0.25rem, 2.2cqw, 2.5rem)",
  "--podium-name-gap": "clamp(0.5rem, 2cqw, 1.75rem)",
  "--podium-bar-w": "clamp(4.25rem, 44%, 11.5rem)",
} as const;

/**
 * Tinggi bar berdasarkan PERINGKAT (bukan selisih vote), sesuai desain:
 * juara 1 paling tinggi, juara 2 menengah, juara 3 paling pendek.
 */
export const PODIUM_RANK_HEIGHT: Record<PodiumRank, number> = {
  1: 1,
  2: 0.68,
  3: 0.45,
};

/** Urutan kolom kiri -> kanan: 2, 1, 3 */
export const PODIUM_COLUMN_ORDER: PodiumRank[] = [2, 1, 3];

/** Urutan reveal animasi: juara 3 -> 1 (klimaks di akhir) */
export const PODIUM_REVEAL_ORDER: PodiumRank[] = [3, 2, 1];

/** Motion tokens — dipakai oleh usePodiumAnimation */
export const PODIUM_MOTION = {
  decor: { duration: 1.5, ease: "power3.out", stagger: 0.2 },
  note: { duration: 1.1, ease: "back.out(1.8)", stagger: 0.15 },
  bar: { duration: 1.5, ease: "power4.out", stagger: 0.25 },
  count: { duration: 1.9, ease: "power2.out" },
  name: { duration: 0.9, ease: "power2.out", stagger: 0.28 },
  title: { duration: 1, ease: "power3.out" },
  glow: { duration: 1.8, ease: "sine.inOut" },
  float: { distance: 10, duration: 2.6, ease: "sine.inOut" },
} as const;

export const PODIUM_GLOW_FROM = "drop-shadow(0 0 14px rgba(218,161,17,0.55))";
export const PODIUM_GLOW_TO = "drop-shadow(0 0 30px rgba(218,161,17,0.95))";
