import Image from "next/image";
import { cn } from "@/lib/utils";
import type { PodiumLogo } from "../types/podium.types";

interface LogoPillProps {
  logos: PodiumLogo[];
  className?: string;
}

export function LogoPill({ logos, className }: LogoPillProps) {
  if (logos.length === 0) return null;

  return (
    <div
      data-podium-pill
      className={cn(
        "invisible inline-flex items-center gap-[calc(var(--podium-logo-size)*0.5)] rounded-full border border-[rgb(var(--podium-glow)/0.45)] bg-[rgb(10_8_4/0.7)] px-[calc(var(--podium-logo-size)*0.55)] py-[calc(var(--podium-logo-size)*0.28)] shadow-[0_0_30px_rgb(var(--podium-glow)/0.25),inset_0_0_14px_rgb(var(--podium-glow)/0.15)] backdrop-blur-md",
        className,
      )}
    >
      {logos.map((logo) => (
        <Image
          key={logo.src}
          src={logo.src}
          alt={logo.alt}
          width={96}
          height={96}
          className="h-[var(--podium-logo-size)] w-auto object-contain"
        />
      ))}
    </div>
  );
}
