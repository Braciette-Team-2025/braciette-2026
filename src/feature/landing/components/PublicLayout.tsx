import type { ReactNode } from "react";

import Background from "./Background";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { MusicBackground } from "./MusicBackground";
import AuthLayout from "../../auth/components/layout/AuthLayout";
import FloatingNotesWrapper from "../../auth/components/FloatingNotesWrapper";
import { NAVIGATION_ITEMS } from "../navbar/constants/navigation";
import { getSettings, isFeatureEnabled } from "@/src/lib/settings";

interface PublicLayoutProps {
  children: ReactNode;
}

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const settings = await getSettings();
  const navItems = NAVIGATION_ITEMS.map((item) =>
    item.featureFlag && !isFeatureEnabled(settings, item.featureFlag)
      ? { ...item, disabled: true }
      : item,
  );

  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden text-white">
      <Background />

      <Navbar items={navItems} />
      <div className="flex justify-center items-center h-full">{children}</div>
      <Footer />
    </div>
  );
}
