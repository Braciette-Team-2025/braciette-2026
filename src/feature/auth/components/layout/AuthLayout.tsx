import type { ReactNode } from "react";

import Background from "../Background";
import { Navbar } from "../../../landing/navbar";
import Footer from "../../../landing/footer/Footer";
import FloatingNotesWrapper from "../FloatingNotesWrapper";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden text-white">
      <Background />

      <Navbar />

      <div className="w-full pt-50 pb-55">
        <div className="flex justify-center items-center h-full">
          <FloatingNotesWrapper>{children}</FloatingNotesWrapper>
        </div>
      </div>

      <Footer />
    </div>
  );
}
