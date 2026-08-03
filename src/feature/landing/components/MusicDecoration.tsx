"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface MusicDecorationProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function MusicDecoration({
  src,
  alt = "Music note decoration",
  width = 120,
  height = 120,
  className,
}: MusicDecorationProps) {
  return (
    <div
      aria-hidden={!src}
      className={cn(
        "pointer-events-none absolute select-none opacity-80 drop-shadow-[0_0_14px_rgba(255,255,255,0.25)]",
        className,
      )}
      style={{ width, height }}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="h-full w-full object-contain"
        />
      ) : (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center rounded-lg border border-dashed border-white/20 text-center text-[10px] leading-tight text-white/40"
        >
          {alt}
        </div>
      )}
    </div>
  );
}
