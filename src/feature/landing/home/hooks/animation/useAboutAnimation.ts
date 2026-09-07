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

const GLOW_DURATION = 2.8;
const GLOW_STAGGER = 0.35;

const DISC_SPIN_DURATION = 40;

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

      const headingLines = Array.from(
        heading.querySelectorAll<HTMLElement>("span.block"),
      );
      const [headingBlue, headingGold] = headingLines;

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

        gsap.set([logo, heading, desc], { opacity: 0, y: -30 });
        gsap.set(rayLeft, { opacity: 0, x: -120 });
        gsap.set(rayRight, { opacity: 0, x: 120 });
        gsap.set([discLeft, discRight], { opacity: 0, x: -80 });
        gsap.set(discRight, { x: 80 });

        timeline.to(
          logo,
          {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out",
            onComplete: () => {
              gsap.to(logo, {
                y: 8,
                duration: 2.1,
                ease: "power1.inOut",
                repeat: -1,
                yoyo: true,
              });
            },
          },
          0,
        );
        timeline.to(
          heading,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.2,
        );
        timeline.to(
          desc,
          { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
          0.5,
        );

        timeline.to(
          [rayLeft, rayRight],
          { opacity: 1, x: 0, duration: 1.4, ease: "power2.out" },
          0.4,
        );

        timeline.to(
          [discLeft, discRight],
          { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.2)" },
          1.3,
        );

        const idleTweens: gsap.core.Tween[] = [];

        idleTweens.push(
          gsap.to(discLeft, {
            rotate: -360,
            duration: DISC_SPIN_DURATION,
            ease: "none",
            repeat: -1,
            paused: true,
          }),
          gsap.to(discRight, {
            rotate: 360,
            duration: DISC_SPIN_DURATION,
            ease: "none",
            repeat: -1,
            paused: true,
          }),
        );

        const pulse = (
          target: Element | Element[],
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

        idleTweens.push(pulse(logo, GLOW_GOLD_FROM, GLOW_GOLD_TO, 0));

        if (headingBlue) {
          idleTweens.push(
            pulse(headingBlue, GLOW_BLUE_FROM, GLOW_BLUE_TO, GLOW_STAGGER),
          );
        }
        if (headingGold) {
          idleTweens.push(
            pulse(headingGold, GLOW_GOLD_FROM, GLOW_GOLD_TO, GLOW_STAGGER * 2),
          );
        }

        idleTweens.push(
          pulse(
            [rayLeft, rayRight],
            GLOW_GOLD_FROM,
            GLOW_GOLD_TO,
            GLOW_STAGGER * 3,
          ),
        );

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
        gsap.set(
          [logo, heading, desc, rayLeft, rayRight, discLeft, discRight],
          {
            opacity: 1,
            x: 0,
            y: 0,
          },
        );
      });

      return () => mm.revert();
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
