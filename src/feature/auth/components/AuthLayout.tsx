import type { ReactNode } from "react";

import Background from "./Background";
import { Navbar } from "../../landing/navbar";
import Footer from "../../landing/footer/Footer";

interface PublicLayoutProps {
  children: ReactNode;
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="font-jakarta relative flex min-h-screen flex-col overflow-hidden text-white">
      <Background />

      <Navbar />

      <main className="relative z-10 flex-1">{children}</main>

      <Footer />
    </div>
  );
}
