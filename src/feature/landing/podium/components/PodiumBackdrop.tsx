import Image from "next/image";
import { ComingSoonStarfield } from "@/src/feature/landing/coming-soon/components/scene/ComingSoonStarfield";
import { DecorNote } from "./DecorNote";
import { FilmStrip } from "./FilmStrip";

const FILM_GLOW =
  "h-auto w-full drop-shadow-[0_0_28px_rgb(var(--podium-glow)/0.35)]";

/**
 * Lapisan latar: gradien, starfield, swirl emas, ring bokeh, dua strip film
 * dan note musik. Semua elemen animasi ditandai data-podium-* dan dianimasikan
 * oleh usePodiumAnimation. Murni dekoratif (aria-hidden).
 */
export function PodiumBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_32%,rgb(var(--podium-glow)/0.14),transparent_60%),radial-gradient(ellipse_at_88%_100%,rgb(var(--podium-glow)/0.2),transparent_55%)]" />

      <ComingSoonStarfield />

      {/* Swirl emas */}
      <div className="absolute -left-[10%] top-[24%] w-[120%]">
        <div data-podium-swirl className="invisible">
          <Image
            src="/images/gold_string/gold_string_1.svg"
            alt=""
            width={736}
            height={398}
            className="h-auto w-full opacity-70"
          />
        </div>
      </div>
      <div className="absolute -right-[10%] top-[44%] hidden w-[90%] sm:block">
        <div data-podium-swirl className="invisible">
          <Image
            src="/images/gold_string/gold_string_2.svg"
            alt=""
            width={736}
            height={398}
            className="h-auto w-full -scale-x-100 opacity-60"
          />
        </div>
      </div>

      {/* Ring bokeh kiri atas */}
      <div
        data-podium-ring
        className="invisible absolute -left-[5%] -top-[5%] aspect-square w-[22vw] max-w-72 rounded-full border border-[rgb(var(--podium-glow)/0.35)] bg-[radial-gradient(circle,transparent_55%,rgb(var(--podium-glow)/0.14))]"
      />
      <div
        data-podium-ring
        className="invisible absolute left-[10%] top-[14%] aspect-square w-[9vw] max-w-36 rounded-full border border-[rgb(var(--podium-glow)/0.3)] bg-[radial-gradient(circle,transparent_55%,rgb(var(--podium-glow)/0.12))]"
      />
      <div
        data-podium-ring
        className="invisible absolute left-[19%] top-[22%] aspect-square w-[4vw] max-w-16 rounded-full border border-[rgb(var(--podium-glow)/0.3)]"
      />

      {/* Strip film kanan atas (masuk dari kanan, searah panjang strip) */}
      <div className="absolute -top-[5%] left-[72%] w-[70vw] origin-left rotate-[30deg] sm:left-[76%] sm:w-[48vw] sm:max-w-[60rem]">
        <div
          data-podium-film
          data-enter="1"
          className="invisible will-change-transform"
        >
          <FilmStrip className={FILM_GLOW} />
        </div>
      </div>

      {/* Strip film kiri bawah (masuk dari kiri) */}
      <div className="absolute -left-[8%] top-[68%] w-[70vw] origin-left rotate-[38deg] sm:top-[66%] sm:w-[48vw] sm:max-w-[60rem]">
        <div
          data-podium-film
          data-enter="-1"
          className="invisible will-change-transform"
        >
          <FilmStrip className={FILM_GLOW} />
        </div>
      </div>

      {/* Note musik */}
      <DecorNote
        variant={1}
        rotate={-12}
        className="right-[9%] top-[9%] w-[clamp(2.25rem,6vw,8rem)]"
      />
      <DecorNote
        variant={3}
        rotate={-8}
        className="left-[9%] top-[72%] w-[clamp(2.5rem,7vw,9rem)]"
      />
      <DecorNote
        variant={2}
        rotate={14}
        className="right-[6%] top-[58%] hidden w-[clamp(2rem,4.5vw,6rem)] md:block"
      />
    </div>
  );
}
