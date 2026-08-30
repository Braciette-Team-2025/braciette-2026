"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface PhotoAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  frameTopRef: RefObject<HTMLDivElement | null>;
  frameBottomRef: RefObject<HTMLDivElement | null>;
  cardLeftRef: RefObject<HTMLDivElement | null>;
  cardCenterRef: RefObject<HTMLDivElement | null>;
  cardRightRef: RefObject<HTMLDivElement | null>;
}

export function usePhotoAnimation(refs: PhotoAnimationRefs) {
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

      const timeline = gsap.timeline({
        defaults: { force3D: true },
        scrollTrigger: {
          trigger: section,
          start: "top 40%",
          once: true,
        },
      });

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

      const cards = [cardLeft, cardCenter, cardRight];

      gsap.set(cards, {
        opacity: 0,
        y: 80,
        rotate: 0,
        transformOrigin: "bottom center",
      });

      timeline.to(
        cardLeft,
        { opacity: 1, y: 0, rotate: -12, duration: 0.8, ease: "back.out(1.2)" },
        0.2,
      );
      timeline.to(
        cardCenter,
        { opacity: 1, y: 0, rotate: 0, duration: 0.8, ease: "back.out(1.2)" },
        0.4,
      );
      timeline.to(
        cardRight,
        { opacity: 1, y: 0, rotate: 12, duration: 0.8, ease: "back.out(1.2)" },
        0.6,
      );

      const handleMouseEnter = (e: MouseEvent) => {
        gsap.to(e.currentTarget, {
          scale: 1.05,
          zIndex: 20,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = (e: MouseEvent) => {
        gsap.to(e.currentTarget, {
          scale: 1,
          zIndex: 10,
          duration: 0.3,
          ease: "power2.inOut",
        });
      };

      cards.forEach((card) => {
        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
      });

      return () => {
        cards.forEach((card) => {
          card.removeEventListener("mouseenter", handleMouseEnter);
          card.removeEventListener("mouseleave", handleMouseLeave);
        });
      };
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
