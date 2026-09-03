"use client";

import { useEffect, useRef, useState } from "react";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarMenu } from "./NavbarMenu";
import { NavbarActions } from "./NavbarAction";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileDrawer } from "./MobileDrawer";
import { NAVIGATION_ITEMS } from "./constants/navigation";
import type { NavigationItem } from "./types/navigation";

export interface NavbarProps {
  items?: NavigationItem[];
  activeId?: string;
  loginHref?: string;
  logoHref?: string;
  logoLabel?: string;
}

const SCROLL_THRESHOLD = 80;

export function Navbar({
  items = NAVIGATION_ITEMS,
  activeId,
  loginHref = "/login",
  logoHref = "/",
  logoLabel = "Braciat",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setIsHidden(false);
      } else if (isScrollingDown) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        aria-hidden="true"
        className="invisible pointer-events-none select-none px-4 pt-4 sm:px-6"
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-yellow-500/30 bg-blue-900/90 px-5 py-3 shadow-[0_0_25px_-5px_var(--yellow-500)]/35 backdrop-blur sm:px-8">
          <NavbarLogo href={logoHref} label={logoLabel} />

          <NavbarMenu items={items} activeId={activeId} />

          <div className="flex items-center gap-2">
            <NavbarActions loginHref={loginHref} />
            <MobileMenuButton
              onClick={() => {
                setIsHidden(false);
                setIsMobileMenuOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      <header
        className={`fixed top-0 left-0 right-0 z-50 px-4 pt-4 transition-transform duration-300 ease-in-out sm:px-6 ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-yellow-500/30 bg-blue-900/90 px-5 py-3 shadow-[0_0_25px_-5px_var(--yellow-500)]/35 backdrop-blur sm:px-8">
          <NavbarLogo href={logoHref} label={logoLabel} />

          <NavbarMenu items={items} activeId={activeId} />

          <div className="flex items-center gap-2">
            <NavbarActions loginHref={loginHref} />
            <MobileMenuButton
              onClick={() => {
                setIsHidden(false);
                setIsMobileMenuOpen(true);
              }}
            />
          </div>
        </div>

        <MobileDrawer
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
          items={items}
          activeId={activeId}
          loginHref={loginHref}
        />
      </header>
    </>
  );
}
