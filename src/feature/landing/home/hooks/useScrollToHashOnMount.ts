"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

const NAV_OFFSET = 112;
const MAX_ATTEMPTS = 30;

function scrollToElement(target: HTMLElement) {
  const root = document.documentElement;
  const prevBehavior = root.style.scrollBehavior;
  root.style.scrollBehavior = "auto";

  gsap.killTweensOf(window);
  gsap.to(window, {
    duration: 0.9,
    ease: "power2.inOut",
    scrollTo: { y: target, offsetY: NAV_OFFSET },
    onComplete: () => {
      root.style.scrollBehavior = prevBehavior;
    },
  });
}

export function useScrollToHashOnMount() {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;

    let attempts = 0;
    const tryScroll = () => {
      const target = document.getElementById(hash);
      if (target) {
        scrollToElement(target);
        return;
      }
      if (attempts < MAX_ATTEMPTS) {
        attempts++;
        requestAnimationFrame(tryScroll);
      }
    };

    requestAnimationFrame(() => requestAnimationFrame(tryScroll));
  }, []);
}
