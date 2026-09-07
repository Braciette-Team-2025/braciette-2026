"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NOTE_FLOAT_DISTANCE = 12;
const NOTE_ROTATE_RANGE = 5;
const NOTE_FLOAT_DURATION = 4.2;
const NOTE_ROTATE_DURATION = 5.8;
const NOTE_STAGGER_DELAY = 0.7;

export interface GuideAnimationRefs {
  /** Div root FloatingNotesWrapper — notes adalah sibling dari <section>. */
  containerRef: RefObject<HTMLDivElement | null>;
  sectionRef: RefObject<HTMLElement | null>;
}

export function useGuideAnimation(refs: GuideAnimationRefs) {
  useGSAP(
    () => {
      const container = refs.containerRef.current;
      const section = refs.sectionRef.current;
      if (!container || !section) return;

      const notes = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-guide-note]"),
      );
      const headings = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-guide-heading]"),
      );
      const items = gsap.utils.toArray<HTMLElement>(
        container.querySelectorAll("[data-guide-item]"),
      );
      const cta = container.querySelector<HTMLElement>("[data-guide-cta]");

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: {
            trigger: section,
            start: "top 40%",
            once: true,
          },
        });

        // ----- State awal -----
        // Rotasi awal diambil dari atribut, bukan 0: kalau di-set 0, note
        // yang seharusnya miring 30 derajat akan tampak lurus dulu lalu
        // meloncat ke posisi miring saat idle mulai.
        notes.forEach((note) => {
          const rest = Number(note.dataset.noteRotate ?? 0);
          gsap.set(note, { opacity: 0, scale: 0.8, rotate: rest });
        });

        if (headings.length) gsap.set(headings, { opacity: 0, y: -24 });
        if (items.length) gsap.set(items, { opacity: 0, y: 32 });
        if (cta) gsap.set(cta, { opacity: 0, y: 20 });

        // ----- Timeline masuk -----
        if (notes.length) {
          timeline.to(
            notes,
            {
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power2.out",
              stagger: 0.15,
            },
            0,
          );
        }

        if (headings.length) {
          timeline.to(
            headings,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.15,
            },
            0.2,
          );
        }

        if (items.length) {
          timeline.to(
            items,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "back.out(1.2)",
              stagger: 0.12,
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

        // ----- Idle: mengambang + berayun -----
        // Dibuat paused lalu dinyalakan lewat onComplete. Kalau tween
        // ber-repeat: -1 disisipkan ke dalam timeline, timeline itu tidak
        // akan pernah selesai dan onComplete tidak pernah terpanggil.
        const idleTweens: gsap.core.Tween[] = [];

        notes.forEach((note, i) => {
          const rest = Number(note.dataset.noteRotate ?? 0);
          const direction = i % 2 === 0 ? 1 : -1;

          idleTweens.push(
            gsap.to(note, {
              y: NOTE_FLOAT_DISTANCE * direction,
              duration: NOTE_FLOAT_DURATION + i * 0.5,
              delay: i * NOTE_STAGGER_DELAY,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
            gsap.to(note, {
              rotate: rest + NOTE_ROTATE_RANGE * direction,
              duration: NOTE_ROTATE_DURATION + i * 0.4,
              delay: i * NOTE_STAGGER_DELAY,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          );
        });

        timeline.eventCallback("onComplete", () => {
          idleTweens.forEach((tween) => tween.play());
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          idleTweens.forEach((tween) => tween.kill());
        };
      });

      // ===== Reduced motion: semua tampil di posisi final, tanpa idle. =====
      mm.add("(prefers-reduced-motion: reduce)", () => {
        notes.forEach((note) => {
          gsap.set(note, {
            opacity: 1,
            scale: 1,
            rotate: Number(note.dataset.noteRotate ?? 0),
          });
        });
        if (headings.length) gsap.set(headings, { opacity: 1, y: 0 });
        if (items.length) gsap.set(items, { opacity: 1, y: 0 });
        if (cta) gsap.set(cta, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    {
      scope: refs.containerRef,
      dependencies: [],
    },
  );
}
