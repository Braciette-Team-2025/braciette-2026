import type { ReactNode } from "react";
import { MusicDecoration } from "./MusicDecoration";

interface MusicBackgroundProps {
  children: ReactNode;
  className?: string;
}

export function MusicBackground({ children, className }: MusicBackgroundProps) {
  return (
    <section
      className={`relative flex w-full flex-col items-center gap-10 overflow-hidden px-4 py-16 md:py-24 ${className ?? ""}`}
    >
      <MusicDecoration
        src="/images/background/music-background1.svg"
        alt="Beamed eighth notes decoration"
        width={160}
        height={126}
        className="left-0 top-10 hidden -rotate-6 md:block lg:left-16"
      />

      <MusicDecoration
        src="/images/background/music-background2.svg"
        alt="Paired eighth notes decoration"
        width={90}
        height={88}
        className="right-6 top-1/2 hidden -translate-y-1/2 rotate-6 lg:block"
      />

      <MusicDecoration
        src="/images/background/music-background3.svg"
        alt="Single note decoration"
        width={72}
        height={126}
        className="bottom-16 left-10 hidden -rotate-3 md:block lg:left-24"
      />

      {children}
    </section>
  );
}
