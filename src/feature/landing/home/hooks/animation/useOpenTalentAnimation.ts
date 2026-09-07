"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// KONTRAK DATA-ATTRIBUTE
// Elemen dicari lewat atribut, bukan ref, karena item dirender lewat map
// dan jumlahnya bisa berubah. Menambah entri di SUBMISSION_GUIDE_DATA
// tidak perlu menyentuh hook ini.
//
//   [data-ot-heading]   -> tiap baris heading
//   [data-ot-subtitle]  -> paragraf di bawah heading
//   [data-ot-item]      -> pembungkus tiap SubmissionTextbox
//   [data-ot-cta]       -> pembungkus tombol
//
// Kalau atributnya hilang, elemen itu diam-diam tidak dianimasikan
// (tidak error). Guard di bawah melewati kelompok yang kosong.
// ============================================================

// ----- Animasi masuk -----
const HEADING_STAGGER = 0.15;
const ITEM_STAGGER = 0.12;

// ----- Hover: umpan balik saat kursor atau fokus keyboard menyentuh item.
// Pakai quickTo, bukan gsap.to yang dipanggil tiap event: quickTo menyimpan
// satu tween yang nilainya diperbarui, jauh lebih ringan saat kursor
// bergerak cepat melintasi tiga item berturut-turut. -----
const HOVER_LIFT = -10;
const HOVER_SCALE = 1.04;
const HOVER_DURATION = 0.35;

// ----- Idle: denyut glow pada baris heading emas, mengikuti pola yang
// sama dengan section About supaya terasa satu bahasa. -----
const GLOW_FROM = "drop-shadow(0 0 20px rgba(218,161,17,0.8))";
const GLOW_TO = "drop-shadow(0 0 34px rgba(218,161,17,1))";
const GLOW_DURATION = 2.8;

export interface OpenTalentAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
}

export function useOpenTalentAnimation(refs: OpenTalentAnimationRefs) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      if (!section) return;

      const headings = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-ot-heading]"),
      );
      const subtitle = section.querySelector<HTMLElement>("[data-ot-subtitle]");
      const items = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll("[data-ot-item]"),
      );
      const cta = section.querySelector<HTMLElement>("[data-ot-cta]");

      // Baris heading terakhir adalah yang berwarna emas — itu yang diberi
      // denyut glow.
      const goldHeading = headings[headings.length - 1];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // ===== FASE 1: MASUK =====
        // Section ini md:h-screen, jadi seluruh isinya muat dalam satu
        // layar. Satu timeline lebih tepat daripada batch per item: saat
        // trigger menyala, semua elemen memang sudah terlihat.
        const timeline = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: {
            trigger: section,
            start: "top 40%",
            once: true,
          },
        });

        if (headings.length) gsap.set(headings, { opacity: 0, y: -24 });
        if (subtitle) gsap.set(subtitle, { opacity: 0, y: -16 });
        if (items.length) gsap.set(items, { opacity: 0, y: 32 });
        if (cta) gsap.set(cta, { opacity: 0, y: 20 });

        if (headings.length) {
          timeline.to(
            headings,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: HEADING_STAGGER,
            },
            0,
          );
        }

        // Subtitle sedikit setelah baris kedua heading selesai, supaya
        // terbaca sebagai penutup judul — bukan elemen yang berdiri sendiri.
        if (subtitle) {
          timeline.to(
            subtitle,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            0.35,
          );
        }

        // Item naik dari bawah, bukan dari samping: tiga kolom yang masuk
        // dari kiri semua akan terlihat bergeser, bukan muncul. Arah
        // bacanya kiri-ke-kanan diberikan oleh stagger, bukan oleh posisi.
        if (items.length) {
          timeline.to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "back.out(1.2)",
              stagger: ITEM_STAGGER,
            },
            0.6,
          );
        }

        if (cta) {
          timeline.to(
            cta,
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            1.1,
          );
        }

        // ===== FASE 2: INTERAKSI HOVER & FOKUS =====
        const cleanups: Array<() => void> = [];

        items.forEach((item) => {
          const liftY = gsap.quickTo(item, "y", {
            duration: HOVER_DURATION,
            ease: "power3.out",
          });
          const scaleTo = gsap.quickTo(item, "scale", {
            duration: HOVER_DURATION,
            ease: "power3.out",
          });

          const activate = () => {
            liftY(HOVER_LIFT);
            scaleTo(HOVER_SCALE);
          };
          const deactivate = () => {
            liftY(0);
            scaleTo(1);
          };

          // focusin/focusout ikut dipasang supaya pengguna keyboard
          // mendapat umpan balik yang sama dengan pengguna mouse.
          item.addEventListener("mouseenter", activate);
          item.addEventListener("mouseleave", deactivate);
          item.addEventListener("focusin", activate);
          item.addEventListener("focusout", deactivate);

          cleanups.push(() => {
            item.removeEventListener("mouseenter", activate);
            item.removeEventListener("mouseleave", deactivate);
            item.removeEventListener("focusin", activate);
            item.removeEventListener("focusout", deactivate);
          });
        });

        // ===== FASE 3: IDLE =====
        // Dibuat paused lalu dinyalakan lewat onComplete. Tween ber-repeat
        // -1 yang disisipkan ke dalam timeline membuat timeline itu tidak
        // pernah selesai, sehingga onComplete tidak pernah terpanggil.
        const glowTween = goldHeading
          ? gsap.fromTo(
              goldHeading,
              { filter: GLOW_FROM },
              {
                filter: GLOW_TO,
                duration: GLOW_DURATION,
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
                paused: true,
              },
            )
          : null;

        timeline.eventCallback("onComplete", () => {
          glowTween?.play();
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          glowTween?.kill();
          cleanups.forEach((fn) => fn());
        };
      });

      // ===== Reduced motion: semua di posisi final, tanpa hover lift,
      // tanpa denyut. =====
      mm.add("(prefers-reduced-motion: reduce)", () => {
        if (headings.length) gsap.set(headings, { opacity: 1, y: 0 });
        if (subtitle) gsap.set(subtitle, { opacity: 1, y: 0 });
        if (items.length) gsap.set(items, { opacity: 1, y: 0 });
        if (cta) gsap.set(cta, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
