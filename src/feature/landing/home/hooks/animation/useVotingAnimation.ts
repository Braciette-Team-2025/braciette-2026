"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GLOW_GOLD_FROM = "drop-shadow(0 0 20px rgba(218,161,17,0.8))";
const GLOW_GOLD_TO = "drop-shadow(0 0 34px rgba(218,161,17,1))";

const GLOW_BLUE_FROM = "drop-shadow(0 0 20px rgba(132,98,255,0.6))";
const GLOW_BLUE_TO = "drop-shadow(0 0 34px rgba(132,98,255,0.9))";

const GLOW_DURATION = 1.8;
const GLOW_STAGGER = 0.5;

export interface VotingAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  totalCardRef: RefObject<HTMLDivElement | null>;
  categoriesRef: RefObject<HTMLDivElement | null>;
  tableCardRef: RefObject<HTMLDivElement | null>;
  tableBodyRef: RefObject<HTMLTableSectionElement | null>;
  footerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Animasi masuk section (timeline + ScrollTrigger, sama seperti section lain)
 * dan animasi baris tabel setiap kali halaman / kategori berganti.
 *
 * @param rowsKey   string yang berubah saat isi tabel berganti (kategori, halaman, jumlah baris)
 * @param rowsReady true kalau tabel sudah berisi data (bukan loading / error / kosong)
 */
export function useVotingAnimation(
  refs: VotingAnimationRefs,
  rowsKey: string,
  rowsReady: boolean,
) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const heading = refs.headingRef.current;
      const subtitle = refs.subtitleRef.current;
      const totalCard = refs.totalCardRef.current;
      const categories = refs.categoriesRef.current;
      const tableCard = refs.tableCardRef.current;
      const footer = refs.footerRef.current;

      if (
        !section ||
        !heading ||
        !subtitle ||
        !totalCard ||
        !categories ||
        !tableCard ||
        !footer
      )
        return;

      const headingLines = Array.from(
        heading.querySelectorAll<HTMLElement>("span.block"),
      );
      const [headingGold, headingBlue] = headingLines;

      const items = [
        heading,
        subtitle,
        totalCard,
        categories,
        tableCard,
        footer,
      ];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const timeline = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
            once: true,
          },
        });

        gsap.set(items, { opacity: 0, y: -30 });

        timeline.to(
          heading,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0,
        );
        timeline.to(
          subtitle,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.2,
        );
        timeline.to(
          totalCard,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.35,
        );
        timeline.to(
          categories,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.5,
        );
        timeline.to(
          tableCard,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0.65,
        );
        timeline.to(
          footer,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.9,
        );

        // Efek glow berdenyut pada judul setelah animasi masuk selesai
        const idleTweens: gsap.core.Tween[] = [];

        const pulse = (
          target: Element,
          from: string,
          to: string,
          delay: number,
        ) =>
          gsap.fromTo(
            target,
            { filter: from },
            {
              filter: to,
              duration: GLOW_DURATION,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              delay,
              paused: true,
            },
          );

        if (headingGold) {
          idleTweens.push(pulse(headingGold, GLOW_GOLD_FROM, GLOW_GOLD_TO, 0));
        }
        if (headingBlue) {
          idleTweens.push(
            pulse(headingBlue, GLOW_BLUE_FROM, GLOW_BLUE_TO, GLOW_STAGGER),
          );
        }

        timeline.eventCallback("onComplete", () => {
          idleTweens.forEach((tween) => tween.play());
        });

        return () => {
          timeline.scrollTrigger?.kill();
          timeline.kill();
          idleTweens.forEach((tween) => tween.kill());
        };
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(items, { opacity: 1, y: 0 });
      });

      return () => mm.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );

  useGSAP(
    () => {
      const body = refs.tableBodyRef.current;
      if (!body || !rowsReady) return;

      const rows = body.querySelectorAll("tr");
      if (rows.length === 0) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          rows,
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            stagger: 0.05,
            force3D: true,
            clearProps: "opacity,transform",
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [rowsKey, rowsReady],
      revertOnUpdate: true,
    },
  );
}
