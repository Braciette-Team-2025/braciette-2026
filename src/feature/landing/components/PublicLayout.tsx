import type { ReactNode } from "react";

import Background from "./Background";
import { Navbar } from "../navbar/Navbar";
import Footer from "../footer/Footer";
import { MusicBackground } from "./MusicBackground";
import AuthLayout from "../../auth/components/layout/AuthLayout";
import FloatingNotesWrapper from "../../auth/components/FloatingNotesWrapper";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden text-white">
      <Background />

      <Navbar />

      <div className="w-full pt-25 pb-50 sm:pt-50 sm:pb-55">
        <div className="flex justify-center items-center h-full">
          <FloatingNotesWrapper>{children}</FloatingNotesWrapper>
        </div>
      </div>

      <Footer />
    </div>
  );
}
