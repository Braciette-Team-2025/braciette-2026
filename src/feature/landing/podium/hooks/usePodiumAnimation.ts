"use client";

import type { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  PODIUM_GLOW_FROM,
  PODIUM_GLOW_TO,
  PODIUM_MOTION as M,
  PODIUM_REVEAL_ORDER,
} from "../constants/podium.tokens";

gsap.registerPlugin(ScrollTrigger);

const all = <T extends Element>(root: HTMLElement, selector: string) =>
  Array.from(root.querySelectorAll<T>(selector));

const dataNumber = (el: HTMLElement, key: string, fallback = 0) => {
  const value = Number(el.dataset[key]);
  return Number.isFinite(value) ? value : fallback;
};

interface PodiumAnimationOptions {
  /**
   * true  -> animasi masuk menunggu podium terlihat saat di-scroll dan memakai
   *          parallax halus pada dekor (dipakai di landing page).
   * false -> langsung berjalan saat mount (halaman layar penuh /podium).
   */
  onScroll?: boolean;
}

/**
 * Urutan animasi masuk:
 *  1. Dekor latar  : ring, swirl, strip film (meluncur), note musik (pop)
 *  2. Podium       : bar naik dari bawah + angka menghitung 0 -> total
 *                    (juara 3 -> 2 -> 1)
 *  3. Nama         : nama organisasi muncul per peringkat, lalu badge pop
 *  4. Judul        : "Most Favorite" + kategori, lalu brand & logo
 *  5. Ambient      : dekor melayang pelan, kilau menyapu bar, nama & badge
 *                    juara 1 serta kategori berdenyut; (embedded) dekor
 *                    bergerak parallax mengikuti scroll
 *
 * `replayKey` berubah -> animasi diulang dari awal.
 * prefers-reduced-motion: langsung tampil final tanpa animasi.
 */
export function usePodiumAnimation(
  rootRef: RefObject<HTMLElement | null>,
  replayKey: string,
  options: PodiumAnimationOptions = {},
) {
  const { onScroll = false } = options;

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
        const badge = column?.querySelector<HTMLElement>("[data-podium-badge]");
        const shine = column?.querySelector<HTMLElement>("[data-podium-shine]");
        return [
          {
            bar,
            count,
            name,
            badge: badge ?? null,
            shine: shine ?? null,
            votes: dataNumber(count, "countTo"),
          },
        ];
      });

      const everything = [
        ...rings,
        ...swirls,
        ...films,
        ...notes,
        ...titleLine,
        ...category,
        ...header,
        ...columns.flatMap((c) => [
          c.bar,
          c.name,
          ...(c.badge ? [c.badge] : []),
        ]),
      ];

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: { force3D: true },
          scrollTrigger: onScroll
            ? { trigger: root, start: "top 60%", once: true }
            : undefined,
        });

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
            duration: M.decor.duration * 1.15,
            ease: "expo.out",
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

        // 3. Nama organisasi, lalu badge peringkat di atasnya
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
          if (c.badge) {
            tl.fromTo(
              c.badge,
              { autoAlpha: 0, scale: 0.3, y: 14 },
              {
                autoAlpha: 1,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: "back.out(2.2)",
              },
              `names+=${i * M.name.stagger + 0.35}`,
            );
          }
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

        // 5. Ambient (mulai setelah semua elemen masuk)
        const idle: gsap.core.Animation[] = [];

        // note melayang
        notes.forEach((note, i) =>
          idle.push(
            gsap.to(note, {
              y: -M.float.distance,
              duration: M.float.duration + i * 0.4,
              ease: M.float.ease,
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          ),
        );

        // strip film & swirl melayang sangat pelan
        films.forEach((film, i) =>
          idle.push(
            gsap.to(film, {
              y: 10,
              rotation: i % 2 === 0 ? 0.8 : -0.8,
              duration: 6 + i * 1.2,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          ),
        );
        swirls.forEach((swirl, i) =>
          idle.push(
            gsap.to(swirl, {
              scale: 1.035,
              x: i % 2 === 0 ? 14 : -14,
              duration: 8 + i * 1.5,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          ),
        );

        // ring bernafas
        rings.forEach((ring, i) =>
          idle.push(
            gsap.to(ring, {
              scale: 1.07,
              duration: 4 + i * 0.8,
              ease: "sine.inOut",
              yoyo: true,
              repeat: -1,
              paused: true,
            }),
          ),
        );

        // kilau menyapu bar, bergiliran
        columns.forEach((c, i) => {
          if (!c.shine) return;
          const sweep = gsap.timeline({
            repeat: -1,
            repeatDelay: 4.5,
            delay: i * 0.9,
            paused: true,
          });
          sweep
            .set(c.shine, { xPercent: -110, opacity: 1 })
            .to(c.shine, { xPercent: 240, duration: 1.9, ease: "power2.inOut" })
            .set(c.shine, { opacity: 0 });
          idle.push(sweep);
        });

        // nama & badge juara 1 serta kategori berdenyut
        const winner = columns[columns.length - 1];
        const pulseTargets = [
          ...category,
          ...(winner ? [winner.name] : []),
          ...(winner?.badge ? [winner.badge] : []),
        ];
        pulseTargets.forEach((el, i) => {
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

        tl.call(() => idle.forEach((animation) => animation.play()));

        // Parallax halus mengikuti scroll (hanya di landing)
        if (onScroll) {
          const parallax = (elements: HTMLElement[], amount: number) =>
            elements.forEach((el, i) => {
              const target = el.parentElement;
              if (!target) return;
              const dir = i % 2 === 0 ? 1 : -1;
              gsap.fromTo(
                target,
                { y: -amount * dir },
                {
                  y: amount * dir,
                  ease: "none",
                  scrollTrigger: {
                    trigger: root,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 0.8,
                  },
                },
              );
            });

          parallax(films, 44);
          parallax(swirls, 26);
          parallax(notes, 34);
        }
      });

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(everything, { autoAlpha: 1 });
      });

      return () => mm.revert();
    },
    {
      scope: rootRef,
      dependencies: [replayKey, onScroll],
      revertOnUpdate: true,
    },
  );
}
