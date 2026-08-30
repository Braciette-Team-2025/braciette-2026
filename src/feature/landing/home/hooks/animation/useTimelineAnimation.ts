"use client";

import { RefObject } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export interface TimelineAnimationRefs {
  sectionRef: RefObject<HTMLElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  trackRef: RefObject<HTMLDivElement | null>;
  itemRefs: RefObject<(HTMLDivElement | null)[]>;
}

export function useTimelineAnimation(refs: TimelineAnimationRefs) {
  useGSAP(
    () => {
      const section = refs.sectionRef.current;
      const header = refs.headerRef.current;
      const track = refs.trackRef.current;
      const items = refs.itemRefs.current;

      if (!section || !header || !track || !items?.length) return;

      const isMobile = window.innerWidth < 768;
      const headerTitle = header.querySelector("h1");
      const headerSub = header.querySelector("h2");

      gsap.set([headerTitle, headerSub], { opacity: 0, y: -30 });

      gsap.to([headerTitle, headerSub], {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: header,
          start: "top 80%",
          once: true,
        },
      });

      if (!isMobile) {
        const container = track.parentElement;
        if (!container) return;

        gsap.set(track, { x: () => container.clientWidth });

        const getEndX = () => container.clientWidth - track.scrollWidth;

        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${track.scrollWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 0.5,
            invalidateOnRefresh: true,
          },
        });

        const scrollTween = mainTl.to(track, {
          x: getEndX,
          ease: "none",
        });

        items.forEach((item) => {
          if (!item) return;

          const horizontal = item.querySelector(".timeline-shape-horizontal");
          const line = item.querySelector(".timeline-shape-line");
          const circle = item.querySelector(".timeline-shape-circle");
          const text = item.querySelector(".timeline-text");

          const itemTl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              containerAnimation: scrollTween,
              start: "left 80%",
              toggleActions: "play none none reverse",
            },
          });

          itemTl
            .from(horizontal, {
              scaleX: 0,
              transformOrigin: "left center",
              duration: 0.3,
              ease: "power2.out",
            })
            .from(
              line,
              { scaleY: 0, duration: 0.3, ease: "power2.out" },
              "-=0.1",
            )
            .from(
              circle,
              { scale: 0, opacity: 0, duration: 0.4, ease: "back.out(1.7)" },
              "-=0.1",
            )
            .from(
              text,
              { opacity: 0, y: 15, duration: 0.4, ease: "power2.out" },
              "-=0.2",
            );
        });
      }

      const refresh = () => ScrollTrigger.refresh();

      const ro = new ResizeObserver(() => {
        refresh();
      });

      setTimeout(() => {
        if (document.body) ro.observe(document.body);
      }, 100);

      Promise.all([
        document.fonts.ready,
        ...Array.from(document.images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((res) =>
                img.addEventListener("load", res, { once: true }),
              ),
        ),
      ]).then(refresh);

      window.addEventListener("load", refresh);
      return () => {
        window.removeEventListener("load", refresh);
        ro.disconnect();
      };
    },
    {
      scope: refs.sectionRef,
      dependencies: [],
    },
  );
}
