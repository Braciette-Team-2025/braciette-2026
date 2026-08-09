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

      <div className="w-full pt-25 pb-50 md:pt-0 md:pb-0 md:flex-1 flex md:flex-col justify-center items-center md:min-h-[calc(100vh-106px)] ">
        <FloatingNotesWrapper>{children}</FloatingNotesWrapper>
      </div>

      <Footer />
    </div>
  );
}
