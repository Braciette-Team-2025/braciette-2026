import Image from "next/image";
import { cn } from "@/lib/utils";

const NOTES = {
  1: { src: "/images/block_notes/block_1.svg", width: 140, height: 244 },
  2: { src: "/images/block_notes/block_2.svg", width: 180, height: 177 },
  3: { src: "/images/block_notes/block_3.svg", width: 243, height: 193 },
} as const;

// SVG note di project berwarna ivory; filter ini menggesernya ke emas
const GOLD_TONE =
  "[filter:sepia(1)_saturate(5)_hue-rotate(-8deg)_drop-shadow(0_0_10px_rgba(218,161,17,0.6))]";

interface DecorNoteProps {
  variant: keyof typeof NOTES;
  /** rotasi akhir (derajat); dibaca oleh usePodiumAnimation */
  rotate?: number;
  tone?: "gold" | "ivory";
  /** posisi + lebar responsif; hanya CSS, tidak disentuh GSAP */
  className?: string;
}

/**
 * Dua div sengaja dipisah (sama seperti FloatingNotesWrapper):
 * div LUAR = posisi & ukuran responsif (CSS), div DALAM = dianimasikan GSAP.
 * Dengan begitu GSAP tidak menimpa class posisi/skala dari Tailwind.
 */
export function DecorNote({
  variant,
  rotate = 0,
  tone = "gold",
  className,
}: DecorNoteProps) {
  const note = NOTES[variant];

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute", className)}
    >
      <div
        data-podium-note
        data-note-rotate={rotate}
        className="invisible will-change-transform"
      >
        <Image
          src={note.src}
          alt=""
          width={note.width}
          height={note.height}
          className={cn("h-auto w-full", tone === "gold" && GOLD_TONE)}
        />
      </div>
    </div>
  );
}
