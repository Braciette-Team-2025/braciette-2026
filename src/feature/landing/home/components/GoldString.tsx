// src/components/GoldString.tsx
"use client";

import React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const SVG_NS = "http://www.w3.org/2000/svg";

const BAND_COUNT = 5;

// ----- Animasi MASUK: tiap band tumbuh dari tepi luar ke dalam -----
const GROW_DURATION = 2.6;
const GROW_STAGGER = 0.18;
const GROW_SCALE_FROM = 0.82;
const GROW_SHIFT_PERCENT = 26;

// ----- Idle MELAMBAI: tiap band punya fase & durasi beda supaya terasa
// tertiup angin, bukan bergoyang serempak seperti satu papan kaku. -----
const SWAY_DISTANCE = 6;
const SWAY_SKEW = 1.2;
const SWAY_BASE_DURATION = 4.5;
const SWAY_DURATION_STEP = 0.6;
const SWAY_DELAY_STEP = 0.45;

export type GoldStringProps = {
  /** Sisi layar tempat asset ini dipasang — menentukan arah rambat & titik tumpu. */
  side: "left" | "right";
  /** viewBox milik file SVG aslinya, contoh: "0 0 285 403". */
  viewBox: string;
  /** Jeda sebelum animasi masuk dimulai, untuk menyelaraskan dengan hero. */
  delay?: number;
  className?: string;
  /**
   * Isi <svg> aslinya: seluruh elemen <path> hasil paste dari file .svg.
   * Jangan bungkus dengan <g> — komponen ini yang mengelompokkannya.
   */
  children: React.ReactNode;
};

const GoldString = ({
  side,
  viewBox,
  delay = 0.3,
  className,
  children,
}: GoldStringProps) => {
  const rootRef = React.useRef<SVGSVGElement | null>(null);
  const shapeRef = React.useRef<SVGGElement | null>(null);

  const rawId = React.useId();
  const ids = React.useMemo(() => ({}), [rawId]);
  const [vbX, vbY, vbW, vbH] = React.useMemo(
    () => viewBox.split(/\s+/).map(Number),
    [viewBox],
  );

  useGSAP(
    () => {
      const shape = shapeRef.current;
      if (!shape) return;

      const paths = Array.from(shape.querySelectorAll("path"));
      if (!paths.length) return;

      // ===== 1. Bungkus path jadi beberapa band <g> =====
      // Menganimasikan 30 path satu per satu berarti 30 target transform per
      // sisi tanpa keuntungan visual sepadan. Lima band jauh lebih ringan.
      const perBand = Math.ceil(paths.length / BAND_COUNT);
      const bands: SVGGElement[] = [];

      for (let i = 0; i < BAND_COUNT; i += 1) {
        const slice = paths.slice(i * perBand, (i + 1) * perBand);
        if (!slice.length) continue;

        const group = document.createElementNS(SVG_NS, "g");
        slice[0].parentNode?.insertBefore(group, slice[0]);
        slice.forEach((path) => group.appendChild(path));
        bands.push(group);
      }

      // Titik tumpu pertumbuhan: tepi luar layar, mengikuti arah aliran helai.
      const growOrigin = side === "left" ? "0% 50%" : "100% 50%";
      const growShift =
        side === "left" ? -GROW_SHIFT_PERCENT : GROW_SHIFT_PERCENT;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ----- MASUK -----
        gsap.set(bands, {
          opacity: 0,
          scaleX: GROW_SCALE_FROM,
          xPercent: growShift,
          transformOrigin: growOrigin,
        });

        const growTl = gsap.timeline({ delay });
        growTl.to(bands, {
          opacity: 1,
          scaleX: 1,
          xPercent: 0,
          duration: GROW_DURATION,
          ease: "power3.out",
          stagger: GROW_STAGGER,
        });

        // ----- IDLE MELAMBAI: dibuat setelah band selesai tumbuh -----
        const swayTweens: gsap.core.Tween[] = [];
        const swayDelay =
          delay + GROW_DURATION + (bands.length - 1) * GROW_STAGGER;

        bands.forEach((band, i) => {
          const direction = i % 2 === 0 ? 1 : -1;
          swayTweens.push(
            gsap.to(band, {
              y: SWAY_DISTANCE * direction,
              skewY: SWAY_SKEW * direction,
              duration: SWAY_BASE_DURATION + i * SWAY_DURATION_STEP,
              delay: swayDelay + i * SWAY_DELAY_STEP,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              transformOrigin: growOrigin,
            }),
          );
        });

        return () => {
          growTl.kill();
          swayTweens.forEach((tween) => tween.kill());
        };
      });

      // ===== Reduced motion: tampil utuh, diam, tanpa kilau. =====
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(bands, { opacity: 1, scaleX: 1, xPercent: 0 });
      });

      return () => {
        mm.revert();

        // Kembalikan DOM ke bentuk semula: lepas band, buang salinan mask.
        // Tanpa ini, React Strict Mode di development akan membungkus band
        // dua kali (g di dalam g) dan menempelkan dua salinan mask.
        bands.forEach((band) => {
          const parent = band.parentNode;
          if (!parent) return;
          while (band.firstChild) parent.insertBefore(band.firstChild, band);
          parent.removeChild(band);
        });
      };
    },
    { scope: rootRef, dependencies: [side, delay] },
  );

  return (
    <svg
      ref={rootRef}
      viewBox={viewBox}
      className={className}
      fill="none"
      xmlns={SVG_NS}
      aria-hidden="true"
      focusable="false"
    >
      {/* Helai emas asli. Path di dalamnya dikelompokkan jadi band saat mount. */}
      <g ref={shapeRef}>{children}</g>
    </svg>
  );
};

export default GoldString;
