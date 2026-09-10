"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./types/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { usePageLoading } from "@/src/feature/shared/providers/NavigationLoadingProvider";

gsap.registerPlugin(ScrollToPlugin);

const NAV_OFFSET = 112; // setara scroll-mt-28

const handleHashClick = (
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) => {
  const [path, hash] = href.split("#");
  if (!hash || (path && path !== "/" && path !== window.location.pathname))
    return;
  const target = document.getElementById(hash);
  if (!target) return;

  e.preventDefault();
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
};

export interface NavbarItemProps {
  item: NavigationItem;
  isActive?: boolean;
  className?: string;
}

export function NavbarItem({ item, isActive, className }: NavbarItemProps) {
  const { startLoading } = usePageLoading();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const [path] = item.href.split("#");
    const isSamePage = !path || path === window.location.pathname;

    if (!isSamePage) {
      startLoading();
    }

    handleHashClick(e, item.href);
  };

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-xl body-medium text-yellow-400 transition-colors hover:text-yellow-500",
        isActive && "text-yellow-500",
        className,
      )}
    >
      {item.label}
    </Link>
  );
}
