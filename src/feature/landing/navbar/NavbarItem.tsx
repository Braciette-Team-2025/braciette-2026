import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NavigationItem } from "./types/navigation";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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
  return (
    <Link
      href={item.href}
      onClick={(e) => handleHashClick(e, item.href)}
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
