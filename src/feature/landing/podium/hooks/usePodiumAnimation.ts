"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {
  PODIUM_GLOW_FROM,
  PODIUM_GLOW_TO,
  PODIUM_MOTION as M,
  PODIUM_REVEAL_ORDER,
} from "../constants/podium.tokens";

const all = <T extends Element>(root: HTMLElement, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector));

const dataNumber = (el: HTMLElement, key: string, fallback = 0) => {
  const value = Number(el.dataset[key]);
  return Number.isFinite(value) ? value : fallback;
};

/**
 * Urutan animasi masuk:
 *  1. Dekor latar  : ring, swirl, strip film (meluncur), note musik (pop)
 *  2. Podium       : bar naik dari bawah + angka menghitung 0 -> total
 *                    (juara 3 -> 2 -> 1)
 *  3. Nama         : nama organisasi muncul per peringkat
 *  4. Judul        : "Most Favorite" + kategori, lalu brand & logo
 *  5. Idle         : note melayang, nama juara 1 & kategori berdenyut
 *
 * `replayKey` berubah -> animasi diulang dari awal.
 * prefers-reduced-motion: langsung tampil final tanpa animasi.
 */
export function usePodiumAnimation(
  rootRef: RefObject<HTMLElement | null>,
  replayKey: string,
) {
  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const rings = all<HTMLElement>(root, "[data-podium-ring]");
      const swirls = all<HTMLElement>(root, "[data-podium-swirl]");
      const films = all<HTMLElement>(root, "[data-podium-film]");
      const notes = all<HTMLElement>(root, "[data-podium-note]");
      const titleLine = all<HTMLElement>(root, "[data-podium-title-line]");
      const category = all<HTMLElement>(root, "[data-podium-category]");
      const header = all<HTMLElement>(
        root,
        "[data-podium-brand], [data-podium-pill]",
      );

      const columns = PODIUM_REVEAL_ORDER.flatMap((rank) => {
        const column = root.querySelector<HTMLElement>(`[data-rank="${rank}"]`);
        const bar = column?.querySelector<HTMLElement>("[data-podium-bar]");
        const count = column?.querySelector<HTMLElement>("[data-podium-count]");
        const name = column?.querySelector<HTMLElement>("[data-podium-name]");
        if (!bar || !count || !name) return [];
        return [{ bar, count, name, votes: dataNumber(count, "countTo") }];
      });

      const everything = [
        ...rings,
        ...swirls,
        ...films,
        ...notes,
        ...titleLine,
        ...category,
        ...header,
        ...columns.flatMap((c) => [c.bar, c.name]),
      ];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ defaults: { force3D: true } });

        columns.forEach((c) => {
          c.count.textContent = "0";
        });

        // 1. Dekor latar
        tl.fromTo(
          rings,
          { autoAlpha: 0, scale: 0.6 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: M.decor.duration,
            ease: M.decor.ease,
            stagger: M.decor.stagger,
          },
          0,
        );
        tl.fromTo(
          swirls,
          { autoAlpha: 0, scale: 0.92 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: M.decor.duration * 1.3,
            ease: "power2.out",
            stagger: M.decor.stagger,
          },
          0,
        );
        tl.fromTo(
          films,
          {
            autoAlpha: 0,
            xPercent: (_: number, el: HTMLElement) =>
              dataNumber(el, "enter", 1) * 60,
          },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: M.decor.duration,
            ease: M.decor.ease,
            stagger: M.decor.stagger,
          },
          0.1,
        );
        tl.fromTo(
          notes,
          {
            autoAlpha: 0,
            scale: 0.3,
            rotation: (_: number, el: HTMLElement) =>
              dataNumber(el, "noteRotate") - 35,
          },
          {
            autoAlpha: 1,
            scale: 1,
            rotation: (_: number, el: HTMLElement) =>
              dataNumber(el, "noteRotate"),
            duration: M.note.duration,
            ease: M.note.ease,
            stagger: M.note.stagger,
          },
          0.45,
        );

        // 2. Bar naik + angka menghitung
        tl.addLabel("bars", 1);
        columns.forEach((c, i) => {
          const offset = i * M.bar.stagger;
          const counter = { value: 0 };

          tl.fromTo(
            c.bar,
            { yPercent: 100, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              duration: M.bar.duration,
              ease: M.bar.ease,
            },
            `bars+=${offset}`,
          );
          tl.to(
            counter,
            {
              value: c.votes,
              duration: M.count.duration,
              ease: M.count.ease,
              onUpdate: () => {
                c.count.textContent = String(Math.round(counter.value));
              },
              onComplete: () => {
                c.count.textContent = String(c.votes);
              },
            },
            `bars+=${offset + 0.15}`,
          );
        });

        // 3. Nama organisasi
        tl.addLabel("names", ">-0.5");
        columns.forEach((c, i) => {
          tl.fromTo(
            c.name,
            { autoAlpha: 0, y: 26, filter: "blur(10px)" },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: M.name.duration,
              ease: M.name.ease,
              clearProps: "filter",
            },
            `names+=${i * M.name.stagger}`,
          );
        });

        // 4. Judul + header
        tl.addLabel("title", ">-0.3");
        tl.fromTo(
          titleLine,
          { autoAlpha: 0, y: -24 },
          {
            autoAlpha: 1,
            y: 0,
            duration: M.title.duration,
            ease: M.title.ease,
          },
          "title",
        );
        tl.fromTo(
          category,
          { autoAlpha: 0, y: -18, scale: 0.9, filter: "blur(12px)" },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: M.title.duration * 1.1,
            ease: M.title.ease,
            clearProps: "filter",
          },
          "title+=0.15",
        );
        tl.fromTo(
          header,
          { autoAlpha: 0, y: -20 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: M.title.ease,
            stagger: 0.15,
          },
          "title+=0.5",
        );

        // 5. Idle: note melayang, glow berdenyut
        const idle: gsap.core.Tween[] = notes.map((note, i) =>
          gsap.to(note, {
            y: -M.float.distance,
            duration: M.float.duration + i * 0.4,
            ease: M.float.ease,
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
        );

        const winnerName = columns[columns.length - 1]?.name;
        [...category, ...(winnerName ? [winnerName] : [])].forEach((el, i) => {
          idle.push(
            gsap.fromTo(
              el,
              { filter: PODIUM_GLOW_FROM },
              {
                filter: PODIUM_GLOW_TO,
                duration: M.glow.duration,
                ease: M.glow.ease,
                yoyo: true,
                repeat: -1,
                delay: i * 0.5,
                paused: true,
                immediateRender: false,
              },
            ),
          );
        });

        tl.call(() => idle.forEach((tween) => tween.play()));
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(everything, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [replayKey],
      revertOnUpdate: true,
    },
  );
}
