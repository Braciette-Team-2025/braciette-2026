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
  // Hanya intercept kalau target ada di halaman yang sedang dibuka.
  if (!hash || (path && path !== "/" && path !== window.location.pathname))
    return;
  const target = document.getElementById(hash);
  if (!target) return;

  e.preventDefault();
  gsap.to(window, {
    duration: 0.9,
    ease: "power2.inOut",
    scrollTo: { y: target, offsetY: NAV_OFFSET },
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
    // Jangan trigger loading untuk hash anchor di halaman yang sama —
    // hash hanya menyebabkan scroll, bukan perubahan pathname,
    // sehingga NavigationLoadingProvider tidak akan pernah mematikan loading.
    const [path, hash] = item.href.split("#");
    const isSamePageAnchor =
      hash && (!path || path === "/" || path === window.location.pathname);

    if (!isSamePageAnchor) {
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
