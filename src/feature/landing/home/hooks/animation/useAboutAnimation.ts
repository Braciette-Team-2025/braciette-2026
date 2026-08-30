"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface AboutAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  logoRef: RefObject<HTMLDivElement | null>;
  headingRef: RefObject<HTMLHeadingElement | null>;
  descRef: RefObject<HTMLParagraphElement | null>;
  rayLeftRef: RefObject<HTMLDivElement | null>;
  rayRightRef: RefObject<HTMLDivElement | null>;
  discLeftRef: RefObject<HTMLDivElement | null>;
  discRightRef: RefObject<HTMLDivElement | null>;
}

export function useAboutAnimation(refs: AboutAnimationRefs) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const logo = refs.logoRef.current;
      const heading = refs.headingRef.current;
      const desc = refs.descRef.current;
      const rayLeft = refs.rayLeftRef.current;
      const rayRight = refs.rayRightRef.current;
      const discLeft = refs.discLeftRef.current;
      const discRight = refs.discRightRef.current;

      if (
        !section ||
        !logo ||
        !heading ||
        !desc ||
        !rayLeft ||
        !rayRight ||
        !discLeft ||
        !discRight
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

      gsap.set([logo, heading, desc], { opacity: 0, y: -30 });
      gsap.set(rayLeft, { opacity: 0, x: -120 });
      gsap.set(rayRight, { opacity: 0, x: 120 });
      gsap.set([discLeft, discRight], { opacity: 0, x: -80 });
      gsap.set(discRight, { x: 80 });

      timeline.to(
        logo,
        { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" },
        0,
      );
      timeline.to(
        heading,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.2,
      );
      timeline.to(
        desc,
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
        0.5,
      );

      timeline.to(
        [rayLeft, rayRight],
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power2.out",
        },
        0.4,
      );

      timeline.to(
        [discLeft, discRight],
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "back.out(1.2)",
        },
        1.3,
      );
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
