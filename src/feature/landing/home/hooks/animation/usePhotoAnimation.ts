"use client";

import { RefObject, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SLOT, BUKAN KARTU
// Kemiringan, skala, jarak, dan z-index melekat pada SLOT — bukan pada
// kartunya. Jadi kartu mana pun yang sedang berada di tengah otomatis
// lurus dan besar, yang di sisi otomatis miring dan kecil.
//
// xPercent dihitung terhadap lebar kartu itu sendiri. Nilai -50 adalah
// kompensasi pemusatan (kartu di-absolute pada left-1/2), lalu digeser
// sejauh SLOT_GAP_PERCENT ke kiri/kanan.
// ============================================================
const SLOT_GAP_PERCENT = 118;
const CENTER_SCALE = 1.32;

const SLOTS = {
  left: { xPercent: -50 - SLOT_GAP_PERCENT, rotate: -12, scale: 1, zIndex: 10 },
  center: { xPercent: -50, rotate: 0, scale: CENTER_SCALE, zIndex: 30 },
  right: { xPercent: -50 + SLOT_GAP_PERCENT, rotate: 12, scale: 1, zIndex: 10 },
} as const;

type SlotName = keyof typeof SLOTS;

// Durasi tukar posisi. Sengaja lambat + ease in-out supaya perpindahannya
// terasa mulus, bukan menyentak.
const SWAP_DURATION = 1.1;

// Hover memperbesar kartu relatif terhadap skala slot yang sedang ditempati,
// bukan ke angka absolut — kalau absolut, kartu tengah justru mengecil
// saat kursor lewat.
const HOVER_SCALE_FACTOR = 1.05;
const HOVER_Z_INDEX = 40;

export interface PhotoAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  frameTopRef: RefObject<HTMLDivElement | null>;
  frameBottomRef: RefObject<HTMLDivElement | null>;
  cardLeftRef: RefObject<HTMLDivElement | null>;
  cardCenterRef: RefObject<HTMLDivElement | null>;
  cardRightRef: RefObject<HTMLDivElement | null>;
}

// Kartu yang diklik pindah ke tengah; dua sisanya mengisi slot kiri dan
// kanan menurut urutan indeks aslinya. centerIndex 2 -> kartu 0 di kiri,
// kartu 1 di kanan.
function slotFor(cardIndex: number, centerIndex: number): SlotName {
  if (cardIndex === centerIndex) return "center";
  const others = [0, 1, 2].filter((i) => i !== centerIndex);
  return others[0] === cardIndex ? "left" : "right";
}

export function usePhotoAnimation(refs: PhotoAnimationRefs) {
  // Slot tengah disimpan di ref, bukan state: tidak ada satu pun bagian
  // render yang bergantung padanya, jadi tidak perlu memicu re-render —
  // dan useGSAP tidak perlu dijalankan ulang tiap kali kartu ditukar.
  const centerIndexRef = useRef(1);
  const isSwappingRef = useRef(false);

  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const frameTop = refs.frameTopRef.current;
      const frameBottom = refs.frameBottomRef.current;
      const cardLeft = refs.cardLeftRef.current;
      const cardCenter = refs.cardCenterRef.current;
      const cardRight = refs.cardRightRef.current;

      if (
        !section ||
        !frameTop ||
        !frameBottom ||
        !cardLeft ||
        !cardCenter ||
        !cardRight
      )
        return;

      const cards = [cardLeft, cardCenter, cardRight];

      const timeline = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          once: true,
        },
      });

      // ----- Frame atas & bawah (tidak berubah) -----
      gsap.set([frameTop, frameBottom], {
        clipPath: "inset(0 50% 0 50%)",
        opacity: 0,
      });

      timeline.to(
        [frameTop, frameBottom],
        {
          clipPath: "inset(0 0% 0 0%)",
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0,
      );

      // ----- Kartu masuk langsung ke slot masing-masing -----
      // transformOrigin center center, bukan bottom center: kartu tengah
      // membesar lewat scale, dan dengan titik tumpu bawah dia akan tumbuh
      // ke atas saja sehingga tidak lagi sejajar dengan kartu sisi.
      cards.forEach((card, i) => {
        const slot = SLOTS[slotFor(i, centerIndexRef.current)];
        gsap.set(card, {
          opacity: 0,
          y: 80,
          yPercent: -50,
          xPercent: slot.xPercent,
          rotate: 0,
          scale: slot.scale,
          zIndex: slot.zIndex,
          transformOrigin: "center center",
        });

        timeline.to(
          card,
          {
            opacity: 1,
            y: 0,
            rotate: slot.rotate,
            duration: 0.8,
            ease: "back.out(1.2)",
          },
          0.2 + i * 0.2,
        );
      });

      // ===== TUKAR SLOT =====
      const moveToCenter = (clickedIndex: number) => {
        if (isSwappingRef.current) return;
        if (clickedIndex === centerIndexRef.current) return;

        isSwappingRef.current = true;
        centerIndexRef.current = clickedIndex;

        const tl = gsap.timeline({
          defaults: { duration: SWAP_DURATION, ease: "power2.inOut" },
          onComplete: () => {
            isSwappingRef.current = false;
          },
        });

        cards.forEach((card, i) => {
          const slot = SLOTS[slotFor(i, clickedIndex)];

          tl.to(
            card,
            {
              xPercent: slot.xPercent,
              rotate: slot.rotate,
              scale: slot.scale,
            },
            0,
          );

          // z-index ditukar tepat di tengah durasi, saat kartu berpapasan,
          // supaya pergantian tumpukan tidak terlihat "loncat".
          tl.add(() => {
            gsap.set(card, { zIndex: slot.zIndex });
          }, SWAP_DURATION * 0.5);
        });
      };

      // ----- Hover -----
      const handleMouseEnter = (e: Event) => {
        const card = e.currentTarget as HTMLDivElement;
        const index = cards.indexOf(card);
        const slot = SLOTS[slotFor(index, centerIndexRef.current)];

        gsap.to(card, {
          scale: slot.scale * HOVER_SCALE_FACTOR,
          zIndex: HOVER_Z_INDEX,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e: Event) => {
        const card = e.currentTarget as HTMLDivElement;
        const index = cards.indexOf(card);
        const slot = SLOTS[slotFor(index, centerIndexRef.current)];

        gsap.to(card, {
          scale: slot.scale,
          zIndex: slot.zIndex,
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      const handleClick = (e: Event) => {
        moveToCenter(cards.indexOf(e.currentTarget as HTMLDivElement));
      };

      const handleKeyDown = (e: Event) => {
        const event = e as KeyboardEvent;
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        moveToCenter(cards.indexOf(e.currentTarget as HTMLDivElement));
      };

      cards.forEach((card) => {
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("click", handleClick);
        card.addEventListener("keydown", handleKeyDown);
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
          card.removeEventListener("click", handleClick);
          card.removeEventListener("keydown", handleKeyDown);
        });
      };
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
