"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface VotingAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  categoriesRef: RefObject<HTMLDivElement | null>;
  tableCardRef: RefObject<HTMLDivElement | null>;
  tableBodyRef: RefObject<HTMLTableSectionElement | null>;
  footerRef: RefObject<HTMLDivElement | null>;
}

/**
 * Animasi section hasil voting (di luar podium, yang punya hook sendiri:
 * usePodiumAnimation):
 *  1. Tab kategori turun + fade in saat section mulai terlihat.
 *  2. Kartu leaderboard & footer turun + fade in saat kartu mendekati layar.
 *  3. Baris leaderboard muncul bertahap setiap halaman / kategori berganti.
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
      const categories = refs.categoriesRef.current;
      const tableCard = refs.tableCardRef.current;
      const footer = refs.footerRef.current;

      if (!section || !categories || !tableCard || !footer) return;

      const items = [categories, tableCard, footer];
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.set(items, { opacity: 0, y: -30 });

        const tabs = gsap.to(categories, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power2.out",
          force3D: true,
          scrollTrigger: { trigger: section, start: "top 70%", once: true },
        });

        const table = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: { trigger: tableCard, start: "top 88%", once: true },
        });
        table.to(
          tableCard,
          { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
          0,
        );
        table.to(
          footer,
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
          0.25,
        );

        return () => {
          tabs.scrollTrigger?.kill();
          tabs.kill();
          table.scrollTrigger?.kill();
          table.kill();
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
