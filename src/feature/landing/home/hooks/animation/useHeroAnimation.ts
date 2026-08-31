"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export interface HeroAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  starsRef: RefObject<HTMLDivElement | null>;
  titleRef: RefObject<HTMLHeadingElement | null>;
  subtitleRef: RefObject<HTMLParagraphElement | null>;
  ctaRef: RefObject<HTMLDivElement | null>;
}

export function useHeroAnimation(refs: HeroAnimationRefs) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const stars = refs.starsRef.current;
      const title = refs.titleRef.current;
      const subtitle = refs.subtitleRef.current;
      const cta = refs.ctaRef.current;

      if (!section || !stars || !title || !subtitle || !cta) return;

      const timeline = gsap.timeline({
        defaults: { force3D: true },
      });
      timeline.to(section, { opacity: 1, duration: 1, ease: "power1.out" }, 0);

      gsap.set(section, { opacity: 0 });

      gsap.to(gsap.utils.toArray(stars.children), {
        scale: 2,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: { each: 0.1 },
      });

      gsap.set(title, {
        opacity: 0,
        filter: "blur(10px)",
        clipPath: "inset(-50% 100% -50% -50%)",
      });
      timeline.to(
        title,
        {
          opacity: 1,
          filter: "blur(0px)",
          clipPath: "inset(-50% -50% -50% -50%)",
          duration: 1.5,
          ease: "power2.out",
        },
        0.5,
      );

      gsap.set([subtitle, cta], { opacity: 0, y: 16 });
      timeline.to(
        subtitle,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        2.2,
      );
      timeline.to(
        cta,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        2.5,
      );
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
